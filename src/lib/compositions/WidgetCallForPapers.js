import React from 'react'

import {
    Wrapper,
    People,
    Centered,
    KeywordSelect,
    TableList
} from '../components';

import CallForPapersDatasource from '../datasources/CallForPapers'
import VotesDatasource from '../datasources/Votes'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'


const CallForPapers = ({renderAs, show_votes, intro, limit, random, filter, link, selected, keyword, keyword_source, sort, ...wrapperProps}) => {

return (

    <Wrapper {...wrapperProps}>

    {intro}

    <CallForPapersDatasource  
       limit={limit}
       random={random}
       filter={filter} 
       keyword={keyword}
       keyword_source={keyword_source}
       sort={sort}
   >{({all, filtered, keywords}) => (

    <React.Fragment>

     <Centered>
          <KeywordSelect href={name => `/vote/categories/${name}`} keywords={keywords} selected={keyword} />
        </Centered> 


    <VotesDatasource>{(votesData) => (
                
      

        <React.Fragment>

      

        {keyword && renderAs==="avatars" && <People 
            data={filtered}
            link={link} 
            title={item => <React.Fragment>{`${item.presenter}, ${item.position}`} <strong>{item.cname2}</strong> </React.Fragment> }
            subtitle={item => item.presentation_title}
            text={item => show_votes ? `/${item.votes} votes/` : null}
            voted={votesData.keyed}
            moreLabel="common.vote_details"
        />}


         {keyword && renderAs==="table" && <TableList 
            rows={filtered}
            columns={[
                {name: "position", render: (row, position) => position < 6 ? <div style={{backgroundColor: 'green'}}></div> : null},
               
                {name: "descriptions", render: [
                    {name: "logotype", align: "center", breakpoints:{xs: 12, md: 3, lg: 2}, render: "logotype"},
                    {name: "presentation_title", style: "big", breakpoints:{xs: 12, md: 5, lg: 6}, render: (row) => <Typography variant="h5">{row.presentation_title}</Typography>},
                    {name: "secondary_info", container:{ justifyContent:"flex-start",  alignItems:"center"}, breakpoints:{xs: 12, md: 3, lg: 3}, render: [

                        {name: "avatar", render: "avatar", breakpoints:{
                            xs: 12, sm: 4, md: 3
                        }},
                        {name: "presenter_details", render: (row) => <React.Fragment><div>{row.presenter}</div><div>{row.position}{' '}<strong>{row.cname2}</strong></div> </React.Fragment>, breakpoints:{
                            xs: 12, sm: 8, md: 9
                        }},
                        
                    ] },
                    {name: "details", render: "link", link, label: "common.vote_details", color: "primary", variant: "outlined", breakpoints:{xs: 12, md: 1, lg: 1}}
                ]},
                   
                {name: "votes", render: (row) => show_votes? row.votes: "", style: "big", align: "center"},
            ]}
             selected={selected}
            // link={link} 
            // title={item =>  }
            // subtitle={item => item.presentation_title}
            // text={item => show_votes ? `/${item.votes} votes/` : null}
            // voted={votesData.keyed}
           

        />}
            
        </React.Fragment>

        )}</VotesDatasource>

        </React.Fragment>

   )}
    
</CallForPapersDatasource>

</Wrapper>)



}


CallForPapers.defaultProps = {
    label : "callforpapers.list.title",
    secondaryLabel : "callforpapers.list.description",
    links : [],
    limit : 200,
    first : false,
    random : false,
    filter : null,
    keyword : null,
    keyword_source : "presentation_category",
    sort : null,
    link : function(item){ return  `/vote/${item.id}` },
    intro : null,
    show_votes : false,
    renderAs : "avatars",
    selected: (row, i) => i < 5
}


/*
 
<Link key="all" href="/presenters" label="common.menu.visitors.presenters" variant="flat" color="secondary" />,
<Link key="subjects" href="/schedule" label="common.menu.visitors.schedule" variant="flat" color="secondary" />

*/

export default CallForPapers