import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Publishers from '../datasources/Publishers'
import {useTranslate} from '../i18n'
import Publisher from '../components/Publisher'


function WidgetPublishers() {

    const [translate] = useTranslate();

    return (<>
    <Typography  variant="h4" component="h3" >{translate("publishers")}</Typography>
    <Grid container spacing={1}>
    <Publishers>{({all}) => all.map(company => {
      return (
        <Grid item key={company.id}> 
        <Publisher data={company} />
      </Grid>
      )
    })
  }</Publishers></Grid></>);
}


export default WidgetPublishers