import React from 'react';
import {useDispatch} from 'react-redux'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Facebook from '@material-ui/icons/Facebook'
import Twitter from '@material-ui/icons/Twitter'
import Linkedin from '@material-ui/icons/LinkedIn'
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import HelpIcon from '@material-ui/icons/Help';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import {useSettings, getSpeakerAvatar, resizeCloudinaryImage, capitalizeFirstLetter} from '../helpers'
import { useTranslate } from '../i18n';


const useStyles = makeStyles(theme => ({
  
}))

const defaultProps = {
    sponsors: []
}

const StageSponsors = ({setting, stage, ...props}) => {

    const settings = useSettings(setting)

    const classes = useStyles()
    // const dispatch = useDispatch();

    const {sponsors} = Object.assign({}, defaultProps, settings, props)

    if(isEmpty(stage) || isEmpty(sponsors)){
        return null
    }


    return (<Box mb={3}>
    <Grid container spacing={2}>
        <Grid item className={classes.avs} xl={3} lg={3} md={3} sm={12} xs={12}>
            <Avatar 
                className={classes.av}
                src={getSpeakerAvatar(data, undefined, 120)} 
            />
            <Avatar 
                variant="square"  
                src={ resizeCloudinaryImage(get(data, "logotype"), 200, 200) } 
                classes={{
                    root: classes.avC,
                    img: classes.avImg
                }}
            />
        </Grid>
        <Grid item xl={8} lg={8} md={9} sm={12} xs={12}>
            <Typography variant="h4" gutterBottom={true} className={classes.pt}>{`${get(data, "presenter", "")}: ${get(data, "presentation_title", "")}`}
            
            {/* <Chip 
            key="details" 
            label="Info"
            icon={<HelpIcon />} onClick={() => dispatch(dialogShow(dialogData))}
          /> */}
          </Typography> 
          <Typography className={classes.pd}>{`${get(data, "presentation_description", "").slice(0, 200)}...`}</Typography> 
            <Divider />
             <ProfileIcon data={data} /> 
        </Grid>
    </Grid>
    </Box>
   )
} 

export default StageSponsors
