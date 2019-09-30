import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {Linkedin} from 'mdi-material-ui'
import {withRouter} from 'next/router'
import { translate } from '../i18n'
import { 
    linkedUidReceived, 
    linkedUidReset, 
    linkedVoteRequest, 
//    linkedVoteRequestAfterOauth,
    dialogShow 
} from './redux/actions'

import { getLinkedInToken } from '../redux/selectors'
import { KeyedVotesSelector } from '../datasources/redux/votes'


const styles = theme => ({
    buttonContainer : {
        marginBottom: 50,
        marginTop: 20
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
})


const extractUrlValue = (key, url) =>
{
    var match = url.match('[?&]' + key + '=([^&]+)');
    return match ? match[1] : null;
}


class VoteWithLinkedIn extends Component {
    
    handleUrlToken(){

        const {
            router, 
            linkedUidReceived, 
            linkedVoteRequest, 
            service,
            id
        } = this.props;

        const uid = extractUrlValue("uid", router.asPath);
      
        if(uid && uid.length > 3){
            
            linkedUidReceived(uid);
            linkedVoteRequest(service, id);

            //check votes and offer voting when coming back from oauth!
        }

    }

    showDialog(titleLabel, content){
        
        const {dialogShow, translate} = this.props

        dialogShow({
            title: translate(titleLabel),
            content: <div style={{marginTop: 40}}>
             {content}
            </div>,
            buttons: []
        })
    }

    componentDidMount(){

        this.handleUrlToken();
    }

    componentDidUpdate(){

       const {transaction, votes} = this.props;   
       const {code, message} = transaction;

        switch (code) {
           
            case 400:
                this.showDialog('common.votes_used');
            break;

            case 404:
                this.showDialog('common.vote_error', 
                    this.handleOAuth()
                );
            break;

            case 406:
            //already voted!
            break;
            default:
            break;
        }

    }

    handleOAuth(){

        const {
           
            labelGuest,
            oAuthUrl, 
            id, 
            translate, 
            classes,
            url
        } = this.props;

        return   (<Button href={`${oAuthUrl}?service=linkedin&from=${ encodeURIComponent(`${url}/${id}`) }`} variant="contained" size="large" color="primary">
        <Linkedin className={classes.leftIcon} />{translate(labelGuest)}</Button>)
    }

    isDisabled(){

        const {
            id, 
            votes,
            max_votes,
            labelAlreadyVoted,
            labelVotesUsed
        } = this.props;

        if(votes && id in votes){
            return labelAlreadyVoted;
        }

        if(Object.keys(votes).length == max_votes){
            return labelVotesUsed
        }

        return false;
    }

    render(){

        const {
            labelLoggedIn,
            id, 
            linkedin, 
            linkedVoteRequest, 
            labelDisabled,
            translate, 
            classes,
            service
        } = this.props;

        //should the button be disabled?

        return (<div className={classes.buttonContainer}>{

            linkedin ? (
                <Button variant="contained" disabled={this.isDisabled() !== false } size="large" color="primary" onClick={() => linkedVoteRequest(service, id) }>
                <Linkedin className={classes.leftIcon} />
                {translate(this.isDisabled() ? this.isDisabled() : labelLoggedIn)}
                </Button>
            ) : 
            
            this.handleOAuth()
          
        }</div>)
       
    }

}

VoteWithLinkedIn.defaultProps = {
    service : "linkedin",
    votes : {},
    max_votes : 3,
    transaction : {},
    
    labelLoggedIn : "common.vote_now",
    labelGuest : "common.vote_with_linkedin",
    labelDisabled : "common.vote_disabled",
    labelAlreadyVoted : "common.vote_voted",
    labelVotesUsed : "common.votes_used",

    disabled : false,
    url : 'https://ecommerceberlin.com/vote',
    oAuthUrl : 'https://api.eventjuicer.com/v1/public/hosts/ecommerceberlin.com/ssr'
}

VoteWithLinkedIn.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
}

const enhance = compose(
   
    connect((state, props) => {

        const mapStateToProps = (state, props) => {
            return {
              linkedin : getLinkedInToken(state),
              votes : KeyedVotesSelector(state, props),
              transaction : state.transactions.voting
            }
          }
        return mapStateToProps
    }, {
        linkedUidReceived, 
        linkedVoteRequest,
     //   linkedVoteRequestAfterOauth, 
        linkedUidReset,
        dialogShow
    }),
    translate,
    withStyles(styles),
    withRouter

)

export default enhance(VoteWithLinkedIn);