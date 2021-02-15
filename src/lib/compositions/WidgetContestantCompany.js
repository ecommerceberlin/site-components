import React from 'react'
import { MyHead as Head } from '../next';
import Divider from '@material-ui/core/Divider';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import { resourceFetchRequest } from '../components/redux'

import {
    MyTypography as Typography,
    TwoColsLayout as Section,
    Wrapper,
    Sharer,
    MyAvatar as Avatar,
   // Speaker
   KeywordSelect,
   TextSection,
   ProfileLogotype
  } from '../components';

//import CompanyLogotype from '../components/CompanyLogotype'

import SingleRecord from '../datasources/SingleRecord'

import { 
    getContestantOgImage, 
    getCompanyProfileInfo
 } from '../helpers';

const styles = theme => ({
    voteInfoBox : {
        borderWidth: 1,
        borderColor: 'rgba(97, 97, 97, 0.5)',
        borderStyle: 'solid',
        boxSizing: 'border-box',
        borderRadius: 4,
        paddingTop: 4,
        paddingBottom: 0,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 20,
        backgroundColor: '#eaeaea'
    },
    voteInfo : {
        // marginLeft : 10,
        // marginTop: 5
    }

})

const WidgetContestantCompany = ({show_votes, id, vote, status, asPath, classes, ...rest}) => (

    <SingleRecord endpoint="contestant_companies" id={id}>{

        (record) => {
            
            console.log(record)

            const product_name = _get(record, 'product_name', "");
            const difference = _get(record, 'difference', "");
            const innovations = _get(record, 'innovations', "");
            const project_description = _get(record, 'project_description', "");
            const company_website = _get(record, 'company_website', "");
            const keywords = [].concat( _get(record, 'awards_category', "") );

            return (

            <React.Fragment>

            <Wrapper first={false} {...rest}>          
          
            <Section
            leftSize={5}
            left={
                <div
                style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 0,
                marginBottom: 20
                }}
                >
                  <ProfileLogotype data={record} />
                </div>
            }
            leftCentered={true}
            right={
            <div>
            
                <React.Fragment>

                <Typography template="benefitsTitle">
                {product_name}
                </Typography>

                {show_votes && <Typography template="presenter1">
                Votes: {record.votes}
                </Typography>}


            <div className={classes.voteInfoBox}>
            <Section
            leftSize={4}
            left={
                vote
            }
           // leftCentered={true}
            right={
                <div className={classes.voteInfo}>
                     {status} 
                    <Typography template="benefitsText" label="awards.voting.rules.description" />
                </div>
            } />

        
            <Divider />

            <Sharer url={`/vote/${id}`} />

            </div>

                 <TextSection record={record} name="company_description" />

                <TextSection record={record} name="company_website" />

                <TextSection record={record} name="difference" />

                <TextSection record={record} name="innovations" />

                 <TextSection record={record} name="project_description" />
                 
                </React.Fragment>

        

            <div style={{marginTop: 20, marginBottom: 20}}>
             {/* <KeywordSelect  href="/contestants/[keyword]" as={(keyword)=>`/contestants/${keyword}`} keywords={keywords} /> */}
           
             <KeywordSelect href="/vote/categories/[category]" as={name => `/vote/categories/${name}`} keywords={keywords}   />

           
            </div>

            <Divider />
            
          

           

            </div>
            }
            />
            </Wrapper>

            </React.Fragment>
        )
    }

    }</SingleRecord>

   
)




WidgetContestantCompany.propTypes = {
    asPath : PropTypes.string.isRequired
}

WidgetContestantCompany.defaultProps = {
    vote : null,
    status : null,
    label : "awards.contestants.list.title",
    show_votes : false
}

export default withStyles(styles)(WidgetContestantCompany)

