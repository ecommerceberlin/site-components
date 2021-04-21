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
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    
    root: {
     
    },
    avatarContainer: {
      marginLeft: 50,
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

    if(!data || !("id" in data)){
        return null
    }

    return (<Grid container alignItems="center" className={classes.root}>
    <Grid item><Typography display="block" variant="overline">{translate("common.thematic_track")}{` `}{translate(`categories.${data.presentation_category}.name`)}{` `}{translate("common.sponsoredby")}</Typography></Grid>
    <Grid item>
        <Avatar variant="square" src={ resizeCloudinaryImage(data.logotype_cdn, 200, 200) } classes={{
            root: classes.avatarContainer,
            img: classes.avatarImg
        }}/>
    </Grid>
    </Grid>)
    
}


export default ScheduleBlock