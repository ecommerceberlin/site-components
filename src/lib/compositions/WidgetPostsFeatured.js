import React from 'react';
import Grid from '@material-ui/core/Grid';
import SvgFilter from '../components/svg/DarkBlack'
import CachableDatasource from '../datasources/CachableDatasource'
import get from 'lodash/get'
import PostFeaturedCard from '../components/PostFeaturedCard'

const defaultGridSettings = {
  xs: 12,
  sm: 6,
  md: 6,
  lg: 3,
  xl: 3,
}

function WidgetPostsFeatured({page=1, limit=4, skip=0, top=0, bottom=20, gridSettings = defaultGridSettings, spacing=4, direction="row", maxPerRow=4, secondary=false}){
    
    const _gridSettings = Object.assign({}, gridSettings)

    Object.keys(_gridSettings).forEach(key => {
      if(12 / _gridSettings[key] > maxPerRow){
        _gridSettings[key] = 12 / maxPerRow;
      }
    })
    
    return (

      <div style={{marginTop: top, marginBottom: bottom}}>
      <SvgFilter />
      <Grid container spacing={spacing} direction={direction}>
     
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
        }}>{({featured}) => featured.map(post => {

            const id = get(post, "id")
            const headline = get(post, "meta.headline");
            const quote = get(post, "meta.quote", null);
            const cover = get(post, "cover", null);

            if(!id){
              return null;
            }
      
            return (<Grid item key={id} id={id} {..._gridSettings}>
              <PostFeaturedCard 
                id={id} 
                headline={headline} 
                quote={quote} 
                cover={cover} 
                secondary={secondary}
              />
            </Grid>)})
        }</CachableDatasource>
        </Grid>
      </div>
    );
  }


export default WidgetPostsFeatured
