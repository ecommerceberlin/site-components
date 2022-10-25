
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _get from 'lodash/get';

import Tags from '../Tags'
import {resizeCloudinaryImage} from '../../helpers'
import { useTranslate } from '../../i18n'
// import Markdown from '../Markdown'

import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Markdown from "react-markdown"

import { useDispatch } from 'react-redux';
import {WidgetCompanyMeetupInteraction} from '../../compositions/WidgetCompanyMeetup';
import { dialogShow } from '../redux/actions';



const useStyles = makeStyles(theme => ({
  htmlContainer: {
    minHeight : 75,
    maxHeight : 200,
    overflow : 'scroll',
    fontWeight : 400,
  },

  logoAndCnameHolder : {
    marginTop : 20,
    display : 'flex',
    flexWrap : 'wrap',
  },

  logotype : {
    minWidth : 300,
    height : 100,
    backgroundRepeat : 'no-repeat',
    backgroundSize : 'contain',
    backgroundPosition : 'center'
  },

  cname : {
    display : 'flex',
    justifyContent : 'center',
    flexDirection : 'column',
    marginLeft : 20
  },

  companyKeywords : {}

}))


const BoothDialogTakenSoldContent = ({setting="", company={}}) => {

    const classes = useStyles()
    const [translate] = useTranslate()
    const dispatch = useDispatch();

    const handleClick = () => dispatch(dialogShow({
      title: translate("exhibitors.meetup.create"),
      content: <WidgetCompanyMeetupInteraction forcedId={company.id} /> ,
      width: "xl"
  }))

    return (
    <React.Fragment>   
    <Grid container justifyContent='center' alignItems='flex-start' direction='row'>
      <Grid item xs={12} sm={12} md={8}>
        <Typography variant="overline">{translate("event.sales.booths.owner")}</Typography>
        <div className={classes.logoAndCnameHolder}>
        <div className={classes.logotype} style={{
        backgroundImage : `url(${ resizeCloudinaryImage(_get(company, "profile.logotype_cdn"), 300, 150) })`
        }} />
        {/* <Typography  className={classes.cname} variant="h4" component="h2">{getCompanyName(company)}</Typography>  */}
        </div>

      </Grid>
      <Grid item xs={12} sm={12} md={4}>

        <Button variant="contained" color="primary"  onClick={handleClick} startIcon={<RecordVoiceOverIcon />}>{translate("exhibitors.meetup.create")}</Button>
       <Tags tags={_get(company, "profile.keywords")} centered={false} />
      </Grid>
    </Grid>
  
    <Typography component="div">

    {_get(company, 'organizer_id')>1?     <div
      className={classes.htmlContainer}
      dangerouslySetInnerHTML={{
    __html: _get(company, 'profile.about')
    }}/>:  <Markdown className={classes.htmlContainer}>{ _get(company, 'profile.about') }</Markdown>}
    




    </Typography>
    </React.Fragment>)

}


export default BoothDialogTakenSoldContent