import React from 'react'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
    MyTypography as Typography,
    Wrapper,
    Sharer,
   KeywordSelect,
  } from '../components';

import CallForPapers from '../datasources/CallForPapers'
import { PresentationContext } from '../components/Schedule/context';
import { PresenterData, LogotypeAndAvatar } from '../components/Presenter';
 
const styles = theme => ({

    voteButtonContainer : {
        display : 'flex',
        [theme.breakpoints.down('sm')]: {
           flexDirection : 'column'
        }
    },
    voteInfo : {
        marginLeft : 10,
        marginTop: 5
    }

})


const Votable = ({id, vote, status, asPath, classes, show_votes, ...rest}) => (

    <CallForPapers id={id}>{

        ({filtered, all, record}) => {
    
            return (

            <Wrapper first={true} {...rest}>




<div className={classes.voteButtonContainer}>
<div>
{vote}
</div>
<div className={classes.voteInfo}>

<React.Fragment>

{show_votes && <Typography template="presenter1">
Votes: {record.votes}
</Typography>}

{status}

{/* <Typography template="benefitsText" label="callforpapers.voting.rules.description" /> */}

</React.Fragment>


</div>
</div>






            <PresentationContext data={record}>


            <Grid container spacing={2}>
                <Grid item md={3} sm={12} xs={12}>
                <LogotypeAndAvatar />
                </Grid>
                <Grid item md={9} sm={12} xs={12}>
                <PresenterData />
                </Grid>
            </Grid>

            <Divider />
    
            <KeywordSelect  href={name => `/vote/categories/${name}`} keywords={[].concat( _get(record, 'presentation_category', "") )} />

            <Divider />
                
            <Sharer url={asPath} />

          

            </PresentationContext>
            </Wrapper>

         
        )
    }

    }</CallForPapers>

   
)




Votable.propTypes = {
    asPath : PropTypes.string.isRequired
}

Votable.defaultProps = {
    vote : null,
    status : null,
    label : "callforpapers.list.title",
    show_votes: false
}

export default withStyles(styles)(Votable)

