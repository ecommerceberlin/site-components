import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CachableDatasource from '../datasources/CachableDatasource'
import {useTranslate} from '../i18n'
import Publisher from '../components/Publisher'
import get from 'lodash/get'

function WidgetPublishers({page, excludeBySlug}) {

    const [translate] = useTranslate();

    return (<>
    <Typography  variant="h4" component="h3" >{translate("publishers")}</Typography>
    <Grid container spacing={1}>
    <CachableDatasource queries={{
      all: {
        resource: "publishers",
        params: { page: page},
        filters: {
          filter: item => !excludeBySlug.includes(item.slug)
        }
      }
    }}>{({all}) => all.map(company => {
      const id = get(company, "id")
      const logotype = get(company, "profile.logotype_cdn")
      return (
      <Grid item key={id}> 
        <Publisher id={id} logotype={logotype} link={`authors/${id}`}/>
      </Grid>
      )
    })
  }</CachableDatasource></Grid></>);
}

WidgetPublishers.defaultProps = {
  page: 1,
  excludeBySlug: ["targiehandlupl"] 
}


export default WidgetPublishers