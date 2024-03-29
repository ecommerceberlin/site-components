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
import { dialogShow } from './redux/actions';
import {useSettings, getSpeakerAvatar, resizeCloudinaryImage, capitalizeFirstLetter} from '../helpers'
import { useTranslate } from '../i18n';


const useStyles = makeStyles(theme => ({
    pt: {

    },
    pd: {

    },
    avs: {
        padding: 10,
        display: 'flex',
        justifyContent: 'center', //horizontal
        alignItems: 'center', //vertical

        [theme.breakpoints.down("md")]: {
            flexDirection: 'column',
            margin: 0
        }

    },
    av: {
        height: 80,
        width: 80,
        marginRight: 10,
    },

    avC: {
        height: 80,
        width: 200,
        [theme.breakpoints.up("md")]: {
           marginLeft: 10
        },
        [theme.breakpoints.down("lg")]: {
            width: 150
        }
    },
    
    avImg: {
        objectFit: "contain",
        maxWidth: "90%",
        padding: "2%"
    },

    profiles: {
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start', //horizontal
        alignItems: 'center', //vertical
    },
}))

const defaultProps = {

}

const ProfileIcon = ({data}) => {

    const classes = useStyles()
    const icons = {Facebook, Twitter, Linkedin}
    const [translate] = useTranslate()
    
    if(isEmpty(data)){
        return null
    }
    const profiles = []

    Object.keys(data).forEach(item => {
        const nameCap = capitalizeFirstLetter(item.replace("profile_", ""))
        if(item.startsWith("profile_") && !isEmpty(data[item]) && nameCap in icons ){
            profiles.push({name: nameCap, link: data[item], IconComponent: icons[nameCap]})
        }
    })

    return (<div className={classes.profiles}>{!isEmpty(profiles)? translate("presenters.contact.options"): null}{` `}{profiles.map(({name, link, IconComponent})=><Button key={link} href={link} target="_blank" variant="text" color="primary" startIcon={<IconComponent />}>{name}</Button>)}</div>)
}



const StageOverview = ({setting, stage, data, ...props}) => {

    const settings = useSettings(setting)

    const classes = useStyles()
    // const dispatch = useDispatch();

    const {ekhm} = Object.assign({}, defaultProps, settings, props)

    if(isEmpty(stage) || isEmpty(data)){
        return null
    }



    // const dialogData = {
    //     title: "", 
    //     content: <Typography className={classes.pd}>{get(data, "presentation_description", "")}</Typography> 
    // }

    return (<Box mb={3}>
    <Grid container spacing={2} alignItems="center">
        <Grid item className={classes.avs} xl={3} lg={3} md={4} sm={12} xs={12}>


            <Avatar 
            variant="square"  
            src={ resizeCloudinaryImage(get(data, "logotype_cdn"), 200, 200) } 
            classes={{
                root: classes.avC,
                img: classes.avImg
            }}
        />


            <Avatar 
                className={classes.av}
                src={getSpeakerAvatar(data, undefined, 120)} 
            />
          
         
        </Grid>
        <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
            <Typography variant="h5" gutterBottom={true} className={classes.pt}>{`${get(data, "presenter", "")}: ${get(data, "presentation_title", "")}`}
            
            {/* <Chip 
            key="details" 
            label="Info"
            icon={<HelpIcon />} onClick={() => dispatch(dialogShow(dialogData))}
          /> */}
          </Typography> 
          <Typography variant="body2" className={classes.pd}>{`${get(data, "presentation_description", "")}`}</Typography> 
            <Divider />
             <ProfileIcon data={data} /> 
        </Grid>
    </Grid>
    </Box>
   )
} 

export default StageOverview
