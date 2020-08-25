

import Grid from '@material-ui/core/Grid';
import Wrapper from '../components/Wrapper'
import {Centered} from '../components/MyLayouts'
import KeywordSelect from '../components/KeywordSelect'
import AvatarlistCellProject from '../components/AvatarlistCellProject'
import ContestantCompaniesArchive from '../datasources/ContestantCompaniesArchive'
import WinnerCategory from '../components/WinnerCategory'

const WidgetContestantCompaniesArchiveWinners = ({show_votes, intro, limit, random, filter, link, keyword, keyword_source, sort, center, spacing, title, alt, moreLabel, ...wrapperProps}) => {


 return (

    <Wrapper {...wrapperProps}>
    <ContestantCompaniesArchive  
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
            {data.map((company) => (
                <AvatarlistCellProject 
                    key={company.id} 
                    source={company}
                    title={ title } 
                    alt={ alt }
                    link={ link }
                    show_votes={ show_votes }
                    moreLabel={ moreLabel }
                />
            
            ))}
            </Grid></div>
            </React.Fragment>
            )
 }}

</ContestantCompaniesArchive>
</Wrapper>)

}




WidgetContestantCompaniesArchiveWinners.defaultProps = {
    label : "awards.winners.archive.title",
    secondaryLabel : "awards.winners.archive.description",
    links : [],
    limit : 200,
    first : false,
    random : false,
    filter : (item) => parseInt(item.winner) === 1,
    title:  (item) => <WinnerCategory keyword={item.awards_category} name={item.product_name} place={item.winner} />, 
    alt :  (item) => "cname2" in item ? `${item.cname2}` : "undefined",
    keyword : null,
    keyword_source : "presentation_category",
    sort : "cname2",
    link : function(item){
        return {as : `/vote/${item.id}`, href : `/vote/[id]`}
    },
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

export default WidgetContestantCompaniesArchiveWinners