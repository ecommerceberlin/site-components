import {
    Wrapper,
    People,
    Centered,
    KeywordSelect,
    VoteStatus,
    TableList
} from '../components';

import CallForPapersDatasource from '../datasources/CallForPapers'
import VotesDatasource from '../datasources/Votes'


const CallForPapers = ({renderAs, show_votes, intro, limit, random, filter, link, keyword, keyword_source, sort, ...wrapperProps}) => {

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
          <KeywordSelect href="/vote/categories/[category]" as={name => `/vote/categories/${name}`} keywords={keywords} selected={keyword} />
        </Centered> 


    <VotesDatasource>{(votesData) => (
                
      

                <React.Fragment>

        <VoteStatus {...votesData}  /> 

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
                {render: "logotype"},
                {render: "avatar"},
                {render: (row) => <React.Fragment><div>{row.presenter}</div><div>{row.position}{' '}<strong>{row.cname2}</strong></div> </React.Fragment> },
                {render: (row) => row.presentation_title, main: true},
                {render: "link", link: (row) => ({as: `/vote/${row.id}`, href: "/vote/[id]"}), label: "common.vote_details", variant: "outlined"}
            ]}
            selected={(row, i) => i < 5}
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
    sort : "cname2",
    link : function(item){
        return {as : `/vote/${item.id}`, href : `/vote/[id]`}
    },
    intro : null,
    show_votes : false,
    renderAs : "avatars"
}


/*
 
<Link key="all" href="/presenters" label="common.menu.visitors.presenters" variant="flat" color="secondary" />,
<Link key="subjects" href="/schedule" label="common.menu.visitors.schedule" variant="flat" color="secondary" />

*/

export default CallForPapers