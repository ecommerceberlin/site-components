import React from 'react';
import Grid from '@material-ui/core/Grid';
import take from 'lodash/take'
import SvgFilter from '../components/svg/Black'
import CachableDatasource from '../datasources/CachableDatasource'
import get from 'lodash/get'
import PostFeaturedCard from '../components/PostFeaturedCard'

function WidgetPostsFeatured({page, limit, skip, gridSettings, top, bottom, spacing, direction, secondary}){
    
    return (

      <div style={{marginTop: top, marginBottom: bottom}}>
        <SvgFilter />
        <CachableDatasource queries={{
          featured: {
            resource: "posts",
            params: { 
              page: page,
              is_promoted: 1
            },
            filters: {
              limit: limit,
              skip: skip
            }
          }
        }}>{({featured}) => {
        
        return (<Grid container spacing={spacing} direction={direction}>{

          featured.map(post => {

            const id = get(post, "id")
            const headline = get(post, "meta.headline");
            const quote = get(post, "meta.quote", null);
            const cover = get(post, "cover", null);

            if(!id){
              return null;
            }
      
            return (<Grid item key={id} {...gridSettings}>
              <PostFeaturedCard 
                id={id} 
                headline={headline} 
                quote={quote} 
                cover={cover} 
                secondary={secondary}
              />
            </Grid>)})
        }</Grid>)}}</CachableDatasource>
      </div>
    );
  }

WidgetPostsFeatured.defaultProps = {
  skip: 0,
  limit: 4,
  gridSettings: {
    xs: 12,
    sm: 6,
    md: 6,
    lg: 3,
    xl: 3,
  },
  page: 1,
  top: 0,
  bottom: 20,
  spacing: 4,
  direction: "row",
  secondary: false
}
  
  export default WidgetPostsFeatured
