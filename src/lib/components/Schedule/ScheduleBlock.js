import React from 'react' 
import { resizeCloudinaryImage } from '../../helpers';
import {useTranslate} from '../../i18n'

import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    
  
    avatarContainer: {
      minHeight: 100,
      minWidth: 200,
    },
  
    avatarImg: {
      objectFit: "contain",
      maxHeight: "90%",
      maxWidth: "90%",
    },
  
  
  }));



const ScheduleBlock = ({data = {}}) => {

    const classes = useStyles();
    const [translate] = useTranslate();

    console.log(data)

    if(!data || !("id" in data)){
        return null
    }


    return (<Grid container>
    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>{translate("common.thematic_track")}{` `}{translate(`categories.${data.presentation_category}.name`)}{` `}{translate("common.sponsoredby")}</Grid>
    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
        <Avatar variant="square" src={ resizeCloudinaryImage(data.logotype_cdn, 200, 200) } classes={{
            root: classes.avatarContainer,
            img: classes.avatarImg
        }}/>
    </Grid>
    </Grid>)
    
}


export default ScheduleBlock