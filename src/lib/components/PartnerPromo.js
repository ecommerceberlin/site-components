import React from 'react'
import Grid from '@material-ui/core/Grid' 
import Paper from '@material-ui/core/Paper' 

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { useDatasource, resizeCloudinaryImage } from '../helpers'
import { useTranslate } from '../i18n'
// import Button from './MyButton';
import Typography from '@material-ui/core/Typography';
import isEmpty from 'lodash/isEmpty'
import PartnerPrizes from './PartnerPrizes'
import PartnerCreatives from './PartnerCreatives'


 const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  avatarContainer: {
    width: 400,
    height: 200,
  },
  avatarImg: {
    objectFit: "contain",
    maxHeight: "85%",
    maxWidth: "85%",
  },
  active: {
    color: "black",
    cursor: "pointer"
  },
  disabled: {
    color: "#ccc",
    cursor: "pointer"
  },
  stats: {
    maxWidth: 300,
    padding: 10,
    backgroundColor: "#eaeaea",
    marginBottom: 20
  }
});


const PartnerPromo = ({id, icons, sidebar=null}) => {
   
   const classes = useStyles()
   const data = useDatasource({resource: "ranking"});
   const [translate] = useTranslate()

    if(isEmpty(data) || !Array.isArray(data)){
        return null
    }

    const company = data.find(item => item.company_id == id)

    if(!company){
        return null
    }

    return (<Box mb={8}>

    <Grid spacing={8} container alignItems="center">
      <Grid item>
        <Avatar variant="square" src={ resizeCloudinaryImage(company.logotype, 300, 300) } classes={{
        root: classes.avatarContainer,
        img: classes.avatarImg
        }}/>
      </Grid>
      <Grid item>
        <Paper className={classes.stats}>
          <Grid container spacing={1}>
          <Grid item>
          <Typography gutterBottom align="center" variant="body1">{translate("common.points")}</Typography>
          <Typography gutterBottom align="center" variant="h4"> {company.stats.sessions} </Typography>
          </Grid>
          <Grid item>
          <Typography gutterBottom align="center" variant="body1">{translate("common.position")}</Typography>
          <Typography gutterBottom align="center" variant="h4"> {company.stats.sessions ? company.stats.position: "-"} </Typography>
          </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>

    

    <Box mt={5}>
    <Grid container spacing={6}>
    <Grid item xs={12} sm={12} md={7} lg={7} xl={8}>
    <Typography gutterBottom variant="h4">{translate("exhibitor.promo.list")}</Typography>
    <PartnerCreatives data={company.creatives} />
    <Box mt={5}>{sidebar}</Box>   
    </Grid>
    <Grid item xs={12} sm={12} md={5} lg={5} xl={4}>
    <Typography gutterBottom variant="h4">{translate("exhibitor.prizes.list")}</Typography>
    <PartnerPrizes active={company.stats.prizes} icons={icons} full={true} points={company.stats.sessions} position={company.stats.position} />
 
    </Grid>
    </Grid>
    </Box>

    
     
   
    </Box>)

 }


export default PartnerPromo