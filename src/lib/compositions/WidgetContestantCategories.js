import React from 'react'
import isEmpty from 'lodash/isEmpty'
import isObject from 'lodash/isObject'
import CategoriesAsIcons from '../components/Categories'

import {
    Wrapper,
    Centered,
    KeywordSelect,
} from '../components';

import CallForPapersDatasource from '../datasources/CallForPapers'


const WidgetContestantCategories = ({icons, show_votes, intro, limit, random, filter, link, keyword, keyword_source, sort, ...wrapperProps}) => {

const hasIcons = icons && !isEmpty(icons) && isObject(icons)

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
   >{({all, filtered, keywords}) => {

    return (
        <React.Fragment>
        {hasIcons ? <CategoriesAsIcons icons={icons} href={name => `/vote/categories/${name}`} keywords={keywords} selected={keyword} /> : ( <Centered><KeywordSelect  href={name => `/vote/categories/${name}`} keywords={keywords} selected={keyword} /></Centered> )}
   
        </React.Fragment>
    )


   }}
    
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
    show_votes : false
}

 

export default WidgetContestantCategories