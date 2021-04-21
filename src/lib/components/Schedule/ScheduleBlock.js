import React from 'react' 
import { resizeCloudinaryImage, useSettings } from '../../helpers';
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
import Chip from '@material-ui/core/Chip';

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


const defaultProps = {

}


const ScheduleBlock = ({setting="", data = {}, ...otherProps}) => {

    const classes = useStyles();
    const [translate] = useTranslate();
    const settings = useSettings(setting);
    const {categories} = Object.assign({}, defaultProps, settings, otherProps)

    if(!data || !("id" in data)){
        return null
    }

    const {presentation_category, logotype_cdn} = data;

    const styling = presentation_category in categories? categories[presentation_category]: {}


    return (<Grid container alignItems="center" className={classes.root}>
    <Grid item><Chip style={styling} label={`${translate("common.thematic_track")} ${translate(`categories.${presentation_category}.name`)} ${translate("common.sponsoredby")}`} /></Grid>
    <Grid item>
        <Avatar variant="square" src={ resizeCloudinaryImage(logotype_cdn, 200, 200) } classes={{
            root: classes.avatarContainer,
            img: classes.avatarImg
        }}/>
    </Grid>
    </Grid>)
    
}


export default ScheduleBlock