import React from 'react'
import { MyHead } from '../next';
import Divider from '@material-ui/core/Divider';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import { resourceFetchRequest } from '../components/redux'
import Head from 'next/head'


import {
    MyTypography as Typography,
    TwoColsLayout as Section,
    Wrapper,
    Presentation,
    Presenter as PresenterName,
    Sharer,
    MyAvatar as Avatar,
   // Speaker
   KeywordSelect,
   ProfileLogotype
  } from '../components';


import CallForPapers from '../datasources/CallForPapers'

import { 
    getCallForPapersOgImage, 
    getSpeakerName,
    getSpeakerAvatar,
 } from '../helpers';

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

            <React.Fragment>

      

            <Wrapper first={true} {...rest}>
            <Section
            leftSize={5}
            left={
            <div
            style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 20
            }}
            >
            <Avatar src={getSpeakerAvatar(record)} minimal={false} grayscale={false} />

            <ProfileLogotype data={record} />

         

            </div>
            }
            leftCentered={true}
            right={
            <div>
            
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

                <Typography template="benefitsText" label="callforpapers.voting.rules.description" />
              
                </React.Fragment>

            </div>
            </div>

          

            <Divider />

            { <Presentation
            title={record.presentation_title}
            description={record.presentation_description}
            />
            }
            
            <KeywordSelect  href="/vote/categories/[category]" as={name => `/vote/categories/${name}`} keywords={[].concat( _get(record, 'presentation_category', "") )} />
            
            <Divider />
            
            <Sharer url={asPath} />

            <Divider />

          <PresenterName data={record} />
          

            </div>
            }
            />
            </Wrapper>

            </React.Fragment>
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

