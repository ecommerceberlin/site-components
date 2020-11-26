import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import _get from 'lodash/get';
import { makeStyles } from '@material-ui/core/styles';
//import { resourceFetchRequest } from '../components/redux'
import {useRouter} from 'next/router'
import Skeleton from '@material-ui/lab/Skeleton';

import {
    MyTypography as Typography,
    TwoColsLayout as Section,
    Wrapper,
    Sharer,
   // Speaker
   KeywordSelect,
   TextSection,
   ProfileLogotype,
  } from '../components';


import SingleRecord from '../datasources/SingleRecord'

import { 
    getContestantOgImage, 
    getCompanyProfileInfo
 } from '../helpers';

const useStyles = makeStyles(theme => ({
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

}))

const WidgetContestantPerson = ({show_votes, id, vote, status, mappings, wrapperProps}) => {

    const classes = useStyles();
    const router = useRouter()

    if (router.isFallback) {
        return <Skeleton variant="rect" width="100%" height={300} />
    }

    return (

        <SingleRecord endpoint="contestant_companies" id={id}>{
    
            (record) => {

                const profile = _get(record, "profile", null)

                if(!profile){
                    return <Skeleton variant="rect" width="100%" height={300} />
                }
                    
                const name = _get(profile, mappings.name, "");
                const keywords = [].concat( _get(profile, 'awards_category', "") );
    
                return (
    
                <React.Fragment>
    
                <Wrapper {...wrapperProps} title={name}>          
              
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
                    <ProfileLogotype data={profile}  />
                  
                    </div>
                }
                leftCentered={true}
                right={
                <div>
                
                    <React.Fragment>
    
                    {/* <Typography template="benefitsTitle">
                    {name}
                    </Typography> */}
    
                    {show_votes && <Typography template="presenter1">
                    Votes: {record.votes}
                    </Typography>}
    
                            
                {vote &&  <div className={classes.voteInfoBox}><Section
                leftSize={4}
                left={ vote }
                //leftCentered={true}
                right={<div className={classes.voteInfo}>{status}<Typography template="benefitsText" label="awards.voting.rules.description" /></div>} 
                /><Divider /><Sharer url={`/vote/${id}`} /></div>}
    
        
                <Box m={1}>

                <TextSection record={record.profile} name={mappings.description} mb={2} />

                <TextSection record={record.profile} name="difference" mb={2}  />

                <TextSection record={record.profile} name="innovations" mb={2}   />

                <TextSection record={record.profile} name="case_study" mb={2}   />
                
                <TextSection record={record.profile} name="testimonials" mb={2}   />

                <TextSection record={record.profile} name="company_website" mb={2}   />

                <TextSection record={record.profile} name="video" mb={2}   />


                </Box>

                </React.Fragment>

    
                <div style={{marginTop: 20, marginBottom: 20}}>
                 {/* <KeywordSelect  href="/contestants/[keyword]" as={(keyword)=>`/contestants/${keyword}`} keywords={keywords} /> */}               
                 {/* <KeywordSelect href="/vote/categories/[category]" as={name => `/vote/categories/${name}`} keywords={keywords}   /> */}
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
    

} 


 
WidgetContestantPerson.defaultProps = {
    vote : null,
    status : null,
    wrapperProps: {
        label : "awards.contestants.list.title",
    },
    show_votes : false,
    mappings : {
        name: "project_name",
        description: "project_description",
        category: "awards_category",
        image: "logotype"
    }
}

export default WidgetContestantPerson

