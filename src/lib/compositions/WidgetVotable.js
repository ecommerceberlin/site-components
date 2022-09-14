import React from 'react'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
    MyTypography as Typography,
    Wrapper,
    Sharer,
   KeywordSelect,
   TwoColsLayout,
   GetTicketLink
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


const WidgetVotable = ({id, vote, status, asPath, classes, show_votes, ...rest}) => (

    <CallForPapers id={id}>{

        ({filtered, all, record}) => {
    
            return (

                <Wrapper first={true} {...rest}>

                <PresentationContext data={record}>

                <TwoColsLayout
                  reverse={true}
                  leftSize={8}
                  left={        
                    <Box>
                      <LogotypeAndAvatar />
                     
                      <Box mt={3} mb={3}>
                        <Grid container spacing={2} alignItems="center">     
                          {/* <Grid item><KeywordSelect keywords={get(company, 'profile.keywords', [])} /></Grid> */}
                          <Grid item></Grid>
                        </Grid>
                      </Box>
                      <PresenterData />
                      <Divider />
                      <Sharer url={`/vote/${id}`} />       
            
                    </Box>
                  }
                  leftCentered={false}
                  right={
                    <Box>
                      <Box mt={7} maxWidth={300}>
                        



<div className={classes.voteButtonContainer}>
<div>
{vote}
</div>
<div className={classes.voteInfo}>
<React.Fragment>
{show_votes && <Typography template="presenter1">Votes: {record.votes}</Typography>}
{status}
{/* <Typography template="benefitsText" label="callforpapers.voting.rules.description" />  */}
</React.Fragment>
</div>
</div>



            
                      </Box>
                    </Box>
                  }
                />
                </PresentationContext>
                </Wrapper>





         
        )
    }

    }</CallForPapers>

   
)




WidgetVotable.propTypes = {
    asPath : PropTypes.string.isRequired
}

WidgetVotable.defaultProps = {
    vote : null,
    status : null,
    label : "callforpapers.list.title",
    show_votes: false
}

export default withStyles(styles)(WidgetVotable)

/**
 * 
 
<KeywordSelect  href={name => `/vote/categories/${name}`} keywords={[].concat( _get(record, 'presentation_category', "") )} />

 */