import React from 'react'
import Grid from '@material-ui/core/Grid' 
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
  }
});


const PartnerPromo = ({id, icons}) => {
   
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

    <Avatar variant="square" src={ resizeCloudinaryImage(company.logotype, 300, 300) } classes={{
        root: classes.avatarContainer,
        img: classes.avatarImg
    }}/>

    <Box ml={2}>
    <Box mt={2} mb={2} p={2}>
    <Grid container spacing={1}>
    <Grid item>
    <Typography gutterBottom align="center" variant="body">{translate("common.points")}</Typography>
    <Typography gutterBottom align="center" variant="h4"> {company.stats.sessions} </Typography>
    </Grid>
    <Grid item>
    <Typography gutterBottom align="center" variant="body">{translate("common.position")}</Typography>
    <Typography gutterBottom align="center" variant="h4"> {company.stats.sessions ? company.stats.position: "-"} </Typography>
    </Grid>
    </Grid>
    </Box>

    <Box mt={2} mb={2} p={2}>
    <Typography gutterBottom variant="h4">{translate("asd")}</Typography>
    <Box mt={2}>
    <PartnerPrizes active={company.stats.prizes} icons={icons} />
    </Box>
    </Box>

    <Box mt={2} mb={2} p={2}>
    <Typography gutterBottom variant="h4">{translate("asd")}</Typography>
    <PartnerCreatives data={company.creatives} />
    </Box>
    </Box>

    </Box>)

 }


export default PartnerPromo