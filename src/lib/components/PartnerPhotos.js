import React from 'react'
import Grid from '@material-ui/core/Grid' 
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { useDatasource, resizeCloudinaryImage } from '../helpers'
import { useTranslate } from '../i18n'
import Button from './MyButton';
import Paper from '@material-ui/core/Paper' 
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import useSWR from 'swr'
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Markdown from './Markdown'
const useStyles = makeStyles({

avatarContainer: {
width: 400,
height: 200,
},
avatarImg: {
objectFit: "contain",
maxHeight: "85%",
maxWidth: "85%",
},


});

const fetcher = url => fetch(url).then(r => r.json())

const PhotosDownloadButton = ({id}) => {

  const [translate] = useTranslate()
  const { data, error } = useSWR(`/api/companies/${id}`, fetcher)

  if(!data || error){
    return <CircularProgress />
  }

  // if(error || !("zip" in data) || !data.zip.includes("http")){
  //   return <div>{translate("common.error")}</div>
  // }

  return ( <Box m={2}>
    <Button label="exhibitors.photos.download" variant="contained" href={data.zip} size="large"  color="primary" />
  </Box>)
}


const PartnerPhotos = ({id}) => {

  const classes = useStyles()
  const data = useDatasource({resource: "companies2", filters: {
    filter: (item) => item.id == id
  }});

  const company = (data || []).shift()

  if(isEmpty(company)){
    return null
  }


  return (<Box mb={8}>
  <Grid spacing={8} container alignItems="center">
    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
    <Avatar variant="square" src={ resizeCloudinaryImage(get(company, "profile.logotype_cdn"), 300, 300) } classes={{
    root: classes.avatarContainer,
    img: classes.avatarImg
    }}/>
    </Grid>
    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
    </Grid>
  </Grid>

  <Grid spacing={8} container alignItems="center">
  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
  <Markdown label="exhibitors.photos.description" /></Grid>
  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
  <PhotosDownloadButton id={id} />
  </Grid>
  </Grid>

  </Box>)

}


export default PartnerPhotos