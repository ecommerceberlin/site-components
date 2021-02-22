import React from 'react'
import {
    Wrapper,
//    People,
    Centered,
    KeywordSelect,
    VoteStatus
} from '../components';

import AvatarlistCellProject from '../components/AvatarlistCellProject'
import DatasourceContestantCompanies from '../datasources/ContestantCompanies'
import VotesDatasource from '../datasources/Votes'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TableList from '../components/TableList'
import get from 'lodash/get'
import Publisher from '../components/Publisher'
import Typography from '@material-ui/core/Typography'

const WidgetContestantCompanies = ({
    show_votes, 
    show_vote_status, 
    intro, 
    limit, 
    random, 
    filter, 
    resolveLink, 
    resolveTitle, 
    resolveAlt, 
    resolveImage, 
    keyword, 
    keyword_source, 
    sort, 
    center, 
    spacing, 
    path_to_category, 
    renderAs, 
    resolveSelected,
    ...wrapperProps
}) => {

 return (<Wrapper {...wrapperProps}>
    
    {intro && <Box mb={6}>{intro}</Box>}
   
    <DatasourceContestantCompanies  
       limit={limit}
       random={random}
       filter={filter} 
       keyword={keyword}
       keyword_source={keyword_source}
       sort={sort}
   >{({all, filtered, keywords}) => (

    <VotesDatasource>{(votesData) => {
        
        const data = keyword ? filtered : all;
        
        return (
                
            <Box>
      
            <Box mt={8}>
                <Centered>
                    <KeywordSelect href={`${path_to_category}/[category]`} as={(category) => `${path_to_category}/${category}`} keywords={keywords} selected={keyword} />
                </Centered> 
            </Box>

            {show_vote_status && <VoteStatus {...votesData}  />}
    
           {keyword && renderAs==="avatars" && <Box mt={5}>
            <Grid 
            container 
            justify={center ? 'center' : 'flex-start'}
            spacing={spacing}
            >
            {data.map((item) => (
                <AvatarlistCellProject 
                    key={item.id} 
                    title={ resolveTitle(item)  } 
                    alt={ resolveAlt(item) }
                    href={ resolveLink(item) }
                    image={ resolveImage(item) }
                />))}
            </Grid></Box>}


            {keyword && renderAs==="table" && <TableList 
            rows={data}
            columns={[
                // {name: "position", render: (row, position) => position < 11 ? <div style={{backgroundColor: 'green'}}></div> : null},
                {name: "logotype", render: (row)=> <Publisher data={row} transparent={true} resolveLink={(data)=> `/vote/${data.id}`} />},
                {name: "cname2_and_project_name", render: (row) => <><Typography variant="h6">{get(row, "profile.project_name")}</Typography><div>by <Typography display="inline" variant="subtitle1">{get(row, 'profile.cname2')}</Typography></div></> },
                show_votes?  {name: "votes", render: (row) => `${row.votes || 0} votes`, style: "big", align: "center"}: null,
                {name: "details", render: "link", link: (row) => ({as: `/vote/${row.id}`, href: "/vote/[id]"}), label: "common.vote_details", variant: "outlined"}
            ]}
            selected={resolveSelected}
            // link={link} 
            // title={item =>  }
            // subtitle={item => item.presentation_title}
            text={item => show_votes ? `/${item.votes} votes/` : null}
            // voted={votesData.keyed}
           

            />}
                
            </Box>)

    }
    
    
    
    
    
    }</VotesDatasource>)}
    
</DatasourceContestantCompanies>

</Wrapper>)

}




WidgetContestantCompanies.defaultProps = {
    
    path_to_category: "/vote/categories",
    label : "awards.contestants.list.title",
    secondaryLabel : "awards.contestants.list.description",
    links : [],
    limit : 200,
    first : false,
    random : false,
    filter : null,
    keyword : null,
    keyword_source : "profile.awards_category",
    sort : "cname2",
    resolveLink : function(item){  return `/vote/${item.id}` },
    resolveTitle: function(item){ return "profile" in item && "project_name" in item.profile ? item.profile.project_name : "resolveTitle error" },
    resolveAlt: function(item){ return "profile" in item && "cname2" in item.profile ? item.profile.cname2 : "resolveAlt error"},
    resolveImage: function(item){ return "profile" in item && "logotype_cdn" in item.profile ? item.profile.logotype_cdn : "resolveImage error" },
    intro : null,
    show_votes : false,
    show_vote_status: false,
    center : false,
    spacing : 5,
    renderAs: "avatarlist",
    resolveSelected: (row, i) => i < 10
}


export default WidgetContestantCompanies