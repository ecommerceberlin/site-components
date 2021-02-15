
import React from 'react'

import Grid from '@material-ui/core/Grid';
import Wrapper from '../components/Wrapper'
import {Centered} from '../components/MyLayouts'
import KeywordSelect from '../components/KeywordSelect'
import AvatarlistCellProject from '../components/AvatarlistCellProject'
import DatasourceContestantCompanies from '../datasources/ContestantCompanies'
import WinnerCategory from '../components/WinnerCategory'

const WidgetContestantCompaniesWinners = ({resolveLink, resolveTitle, resolveAlt, resolveImage, intro, limit, random, filter, link, keyword, keyword_source, sort, center, spacing, title, alt, moreLabel, ...wrapperProps}) => {


 return (

    <Wrapper {...wrapperProps}>
    <DatasourceContestantCompanies  
       limit={limit}
       random={random}
       filter={filter} 
       keyword={keyword}
       keyword_source={keyword_source}
       sort={sort}
   >{({all, filtered, keywords}) => {

        const data = keyword ? filtered : all;
        
        return (
                
            <React.Fragment>
            
            {/* <Centered>
                <KeywordSelect href="/vote" as="/vote" keywords={keywords} selected={keyword} />
            </Centered>  */}
                         
            
            <div style={{marginTop: 40}}>
            <Grid 
            container 
            justify={center ? 'center' : 'flex-start'}
            spacing={spacing}
            >
            {data.map((item) => (
                <AvatarlistCellProject 
                    key={item.id} 
                    title={ resolveTitle(item) } 
                    alt={ resolveAlt(item) }
                    image={ resolveImage(item) }
                    href={ resolveLink(item)}
                    moreLabel={ moreLabel }
                />
            
            ))}
            </Grid></div>
            </React.Fragment>
            )
 }}

</DatasourceContestantCompanies>
</Wrapper>)

}




WidgetContestantCompaniesWinners.defaultProps = {
    label : "awards.winners.list.title",
    secondaryLabel : "awards.winners.list.description",
    links : [],
    limit : 200,
    first : false,
    random : false,
    filter : (item) => parseInt(item.winner) === 1,
   
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
    spacing : 24,
    moreLabel : "awards.winners.details"
}


/*
 
<Link key="all" href="/presenters" label="common.menu.visitors.presenters" variant="flat" color="secondary" />,
<Link key="subjects" href="/schedule" label="common.menu.visitors.schedule" variant="flat" color="secondary" />

*/

export default WidgetContestantCompaniesWinners