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
// import { KeyedVotesSelector } from '../datasources/redux/votes'
import { lsSet, lsGet, uuidv4 } from '../helpers'
import isEmpty from 'lodash/isEmpty'

const styles = theme => ({
    buttonContainer : {
        marginBottom: 50,
        marginTop: 20
    },
    leftIcon: {
        marginRight: theme.spacing(1),
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

        const {asPath} = router;

        const uid = extractUrlValue("uid", asPath);
        const session = extractUrlValue("session", asPath);
        const savedSession = lsGet("oauth_session");

      //  console.log(uid, session, savedSession)

        if(uid && uid.length > 3  && session === savedSession){
        //    console.log("fire up auto voting...");
            linkedUidReceived(uid);
            //check votes and offer voting when coming back from oauth!
            linkedVoteRequest(service, id);
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

    createSession = (e) => {

        const {
            oAuthUrl, 
            id, 
            url
        } = this.props;

        e.preventDefault();

        const uuid = uuidv4();

        //it blocking so no worry....
        lsSet("oauth_session", uuid);
           
        window.location.href = `${oAuthUrl}?service=linkedin&from=${ encodeURIComponent(`${url}/${id}`) }&session=${uuid}`

    }

    isDisabled(){

        const {
            id, 
            votes,
            disabled,
            max_votes,
            labelAlreadyVoted,
            labelVotesUsed,
            labelDisabled
        } = this.props;

        if(disabled){
            return labelDisabled
        }

        if(!isEmpty(votes) && id in votes){
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
            translate, 
            classes,
            service,
            labelGuest
        } = this.props;

        const savedSession = typeof window !== 'undefined' ? lsGet("oauth_session") : false;

       // console.log("render saved session", savedSession)

        const disabledStatus = this.isDisabled();

        //should the button be disabled?

        if(disabledStatus !== false){
            return (<Button 
                        variant="contained" 
                        disabled={true} 
                        size="large" 
                        color="primary"
                        startIcon={<Linkedin className={classes.leftIcon} />}>{
                            translate( disabledStatus ) 
            }</Button>)
        }

        if(linkedin && savedSession){

          //  console.log("CAN VOTE")

            return (
            <div className={classes.buttonContainer}>
                <Button 
                    startIcon={ <Linkedin className={classes.leftIcon} />} 
                    variant="contained" 
                    size="large" 
                    color="primary" 
                    onClick={() => linkedVoteRequest(service, id) }>
                   {translate(labelLoggedIn)}
                </Button>
            </div>)
        }

        
        return  (<Button 
            startIcon={ <Linkedin className={classes.leftIcon} />} 
            onClick={(e) => this.createSession(e) } 
            variant="contained" 
            size="large" 
            color="primary">{translate(labelGuest)}</Button>)
       
    }

}

VoteWithLinkedIn.defaultProps = {
    service : "linkedin",
    votes : {},
    max_votes : 10,
    transaction : {},
    
    labelLoggedIn : "common.vote_now",
    labelGuest : "common.vote_with_linkedin",
    labelDisabled : "common.vote_disabled",
    labelAlreadyVoted : "common.vote_voted",
    labelVotesUsed : "common.votes_used",

    disabled : false,
    url : `https://${process.env.NEXT_PUBLIC_PROJECT}/vote`,
    oAuthUrl : `https://api.eventjuicer.com/v1/public/hosts/${process.env.NEXT_PUBLIC_PROJECT}/ssr`
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