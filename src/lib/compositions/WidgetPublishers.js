import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CachableDatasource from '../datasources/CachableDatasource'
import {useTranslate} from '../i18n'
import Publisher from '../components/Publisher'


function WidgetPublishers({page}) {

    const [translate] = useTranslate();

    return (<>
    <Typography  variant="h4" component="h3" >{translate("publishers")}</Typography>
    <Grid container spacing={1}>
    <CachableDatasource queries={{
      all: {
        resource: "publishers",
        params: { page: page}
      }
    }}>{({all}) => all.map(company => {
      return (
        <Grid item key={company.id}> 
        <Publisher data={company} />
      </Grid>
      )
    })
  }</CachableDatasource></Grid></>);
}

WidgetPublishers.defaultProps = {
  page: 1
}


export default WidgetPublishers