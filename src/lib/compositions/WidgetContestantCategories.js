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


const WidgetContestantCategories = ({renderAs, show_votes, intro, limit, random, filter, link, keyword, keyword_source, sort, ...wrapperProps}) => {

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

        <VotesDatasource>{(votesData) => (<VoteStatus {...votesData}  />)}</VotesDatasource>

        </React.Fragment>

   )}
    
</CallForPapersDatasource>

</Wrapper>)


}


WidgetContestantCategories.defaultProps = {
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

 

export default WidgetContestantCategories