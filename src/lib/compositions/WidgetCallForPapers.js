import {
    Wrapper,
    People,
    Centered,
    KeywordSelect,
    VoteStatus
} from '../components';

import CallForPapersDatasource from '../datasources/CallForPapers'
import VotesDatasource from '../datasources/Votes'


const CallForPapers = ({show_votes, intro, limit, random, filter, link, keyword, keyword_source, sort, ...wrapperProps}) => {

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


    <VotesDatasource>{(votesData) => (
                
        <React.Fragment>

        <Centered>
          <KeywordSelect href="/vote" as="/vote" keywords={keywords} selected={keyword} />
        </Centered> 

        <VoteStatus {...votesData}  /> 

        {keyword && <People 
            data={keyword ? filtered : all}
            link={link} 
            title={item => <React.Fragment>{`${item.presenter}, ${item.position}`} <strong>{item.cname2}</strong> </React.Fragment> }
            subtitle={item => item.presentation_title}
            text={item => show_votes ? `/${item.votes} votes/` : null}
            voted={votesData.keyed}
            moreLabel="common.vote_details"
        />}
            
        </React.Fragment>

        )}</VotesDatasource>


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
        return {as : `/vote/${item.id}`, href : `/vote?id=${item.id}`}
    },
    intro : null,
    show_votes : false
}


/*
 
<Link key="all" href="/presenters" label="common.menu.visitors.presenters" variant="flat" color="secondary" />,
<Link key="subjects" href="/schedule" label="common.menu.visitors.schedule" variant="flat" color="secondary" />

*/

export default CallForPapers