
import React from 'react'

import Grid from '@material-ui/core/Grid';
import Wrapper from '../components/Wrapper'
import AvatarlistCellProject from '../components/AvatarlistCellProject'
import WinnerCategory from '../components/WinnerCategory'
import Box from '@material-ui/core/Box';
import { useDatasource } from '../helpers';
import isFunction from 'lodash/isFunction'

const WidgetContestantCompaniesArchiveWinners = ({resolveLink, resolveTitle, resolveAlt, resolveImage, intro, limit, random, filter, link, keyword, keyword_source, sort, center, spacing, title, alt, moreLabel, wrapperProps}) => {

    const defaultFilter = (item) => parseInt(item.winner) === 1

    const data = useDatasource({
        resource: "contestant_companies_all",
        params: {},
        filters: {
            filter: (item) => isFunction(filter)? filter(item) && defaultFilter(item): defaultFilter(item),
        }
    });


    return (  <Wrapper {...wrapperProps}>
        <Box mt={8}>
        <Grid  container justifyContent={center ? 'center' : 'flex-start'} spacing={spacing}>
        {data.map((item) => (<AvatarlistCellProject 
                key={item.id} 
                title={  resolveTitle(item) } 
                alt={ resolveAlt(item) }
                href={ resolveLink(item) }
                image={ resolveImage(item) }
                moreLabel={ moreLabel }
            />))}
        </Grid></Box></Wrapper>)


//  return (

  
//     <ContestantCompaniesArchive  
//        limit={limit}
//        random={random}
//        filter={filter} 
//        keyword={keyword}
//        keyword_source={keyword_source}
//        sort={sort}
//    >{({all, filtered, keywords}) => {

//         const data = keyword ? filtered : all;
        
//        }}

// </ContestantCompaniesArchive>
// )

}


WidgetContestantCompaniesArchiveWinners.defaultProps = {

    wrapperProps: {
        label : "awards.winners.archive.title",
        secondaryLabel : "awards.winners.archive.description",
    },
    links : [],
    limit : 200,
    first : false,
    random : false,
    filter : null,
    resolveLink : function(item){  return `/vote/${item.id}` },
    resolveTitle: (item) => <WinnerCategory keyword={item.awards_category} name={item.product_name} place={item.winner} />,
    resolveAlt:  (item) => "cname2" in item ? `${item.cname2}` : "resolveAlt error",
    resolveImage: function(item){ return  "logotype_cdn" in item ? item.logotype_cdn : "resolveImage error" },

    keyword : null,
    keyword_source : "presentation_category",
    sort : "cname2",
 
    intro : null,
    show_votes : false,
    center : false,
    spacing : 8,
    moreLabel : "awards.winners.details"
}


export default WidgetContestantCompaniesArchiveWinners