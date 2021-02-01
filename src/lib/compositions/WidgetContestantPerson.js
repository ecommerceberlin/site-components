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
    Centered,
    Wrapper,
    Sharer,
   // Speaker
   KeywordSelect,
   TextSection,
   EmbedSection,
   ProfileLogotype,
  } from '../components';


import SingleRecord from '../datasources/SingleRecord'

import { 
    getContestantOgImage, 
    getCompanyProfileInfo
 } from '../helpers';

const useStyles = makeStyles(theme => ({
    voteInfoBox : {
    
        borderRadius: 4,
        paddingTop: 4,
        paddingBottom: 0,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#f0f2f5'
    },
    voteInfo : {
        // marginLeft : 10,
        marginBottom: 7
    }

}))

const WidgetContestantPerson = ({show_votes, id, vote, status, sections, keyword_source, name_source, defaultSectionBaseLabel, wrapperProps}) => {

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
                    
                const keywords = [].concat( _get(profile, keyword_source, "") );
    
                return (
    
                <React.Fragment>
    
                <Wrapper {...wrapperProps} title={_get(profile, "cname2", "")}>          
              
                <Section
                leftSize={5}
                left={
                    <div>
                    <Centered><ProfileLogotype data={profile}  /></Centered>                    
                    {profile.video && <EmbedSection label="awards.profile.video" data={profile.video} />}
                    </div>
                }
                leftCentered={false}
                right={
             
                <Box m={1}>
                <TextSection record={record.profile} name={name_source} mb={2} />

                {show_votes && <Typography template="presenter1">
                Votes: {record.votes}
                </Typography>}
    
                {vote &&  <div className={classes.voteInfoBox}><Section
                leftSize={4}
                left={ vote }
                //leftCentered={true}
                right={<div className={classes.voteInfo}>{status}<Typography template="benefitsText" label="awards.voting.rules.description" /></div>} 
                />
                <Divider />
                <Centered><Sharer url={`/vote/${id}`} /></Centered>
                </div>}
                    
                {sections.map(section =>  <TextSection key={section.name} {...section} record={profile} mb={2} baseLabel={defaultSectionBaseLabel}   />)}


                <Divider />

                <Box mt={4}>
                    <KeywordSelect  href="/vote/categories/[category]" as={(category)=>`/vote/categories/${category}`} keywords={keywords} />
                </Box>
                
                </Box>
                      
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
    defaultSectionBaseLabel: "awards.profile",
    sections: [
        {name: "project_description"},
        {name: "difference"},
        {name: "innovations"},
        {name: "case_study"},
        {name: "testimonials"},
        {name: "company_website", isLink: true},
        // {name: "video"}
    ],

    keyword_source: "awards_category",
    name_source: "project_name",
}

export default WidgetContestantPerson