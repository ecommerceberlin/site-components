
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _get from 'lodash/get';

import Tags from '../Tags'
import {resizeCloudinaryImage, useSettings} from '../../helpers'
import { useTranslate } from '../../i18n'
// import Markdown from '../Markdown'

import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Markdown from "react-markdown"

import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {WidgetCompanyMeetupInteraction} from '../../compositions/WidgetCompanyMeetup';
import { dialogShow } from '../redux/actions';
import {BoothFormdataSelector} from './selectors'
import CircularProgress from '@material-ui/core/CircularProgress';
import useSWR from 'swr'



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


// const CompanyMeetupButton = ({id}) => {

//   const {disableMeetups} = useSettings("exhibitors")
//   const [translate] = useTranslate()
//   const dispatch = useDispatch();

//   const handleClick = () => dispatch(dialogShow({
//     title: translate("exhibitors.meetup.create"),
//     content: <WidgetCompanyMeetupInteraction forcedId={id} /> ,
//     width: "xl"
// }))

//   if(!id || disableMeetups){
//     return null
//   }

//   return (  <Button variant="contained" color="primary"  onClick={handleClick} startIcon={<RecordVoiceOverIcon />}>{translate("exhibitors.meetup.create")}</Button>
  
//   )
// }


const useGetCompanyFromPurchase = (boothId) => {

  const {api} = useSettings("system")

  const {purchase_id} = useSelector((state) => BoothFormdataSelector(state, boothId), shallowEqual)

  const { data, error, isLoading } = useSWR(`${api}/purchases/${purchase_id}/company`, (url) => fetch(url).then(r => r.json()))

  if(isLoading){
    return null
  }

  if(!api || !purchase_id || !data || error || !("data" in data)){
    return false
  }

  return data.data
}


const BoothDialogTakenSoldContent = ({setting="", boothId}) => {

    const classes = useStyles()
    const [translate] = useTranslate()

    const company = useGetCompanyFromPurchase(boothId)

    if(company===null){
      return <Box m={4}><CircularProgress /></Box>
    }
   
    if(company===false){
      return null;
    }

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

        {/* <CompanyMeetupButton id={company.id} /> */}

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