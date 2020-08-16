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

const WidgetContestantCompanies = ({show_votes, intro, limit, random, filter, link, keyword, keyword_source, sort, center, spacing, ...wrapperProps}) => {


 return (

    <Wrapper {...wrapperProps}>

    
    {intro && <div style={{marginBottom: 40}}>{intro}</div>}
   

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
                
            <React.Fragment>
    
          
            <Centered>
              <KeywordSelect href="/contestants/[keyword]" as={(keyword) => `/contestants/${keyword}`} keywords={keywords} selected={keyword} />
            </Centered> 
         

            {/* <VoteStatus {...votesData}  />  */}
    
           {keyword && 
            
            
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
                    title={ (item) => "product_name" in item ? item.product_name : "undefined" } 
                    alt={ (item) => "cname2" in item ? item.cname2 : "undefined" }
                    link={ link }
                    show_votes={ show_votes }
                />
            
            ))}
            </Grid></div>
            
          
            
            }
                
            </React.Fragment>
    
            )


    }}</VotesDatasource>


   )}
    
</DatasourceContestantCompanies>

</Wrapper>)

}




WidgetContestantCompanies.defaultProps = {
    label : "awards.contestants.list.title",
    secondaryLabel : "awards.contestants.list.description",
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
    show_votes : false,
    center : false,
    spacing : 24,
}


/*
 
<Link key="all" href="/presenters" label="common.menu.visitors.presenters" variant="flat" color="secondary" />,
<Link key="subjects" href="/schedule" label="common.menu.visitors.schedule" variant="flat" color="secondary" />

*/

export default WidgetContestantCompanies