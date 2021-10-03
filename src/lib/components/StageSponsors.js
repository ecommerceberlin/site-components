import React from 'react';
import {useDispatch} from 'react-redux'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isObject from 'lodash/isObject'
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
import { useDatasource } from '../helpers'

const useStyles = makeStyles(theme => ({

    sponsorImageContainer: {
        width: 200,
        height: 80,
    },
    sponsorImage: {
        objectFit: "contain",
        maxHeight: "90%",
        maxWidth: "90%",
    }
}))

const defaultProps = {
    stages: {}
}

const StageSponsors = ({setting, stage, ...props}) => {

    const [translate] = useTranslate()
    const settings = useSettings(setting)
    const classes = useStyles()
    const {stages} = Object.assign({}, defaultProps, settings, props)

    const presenters = useDatasource({ resource: "presenters" })

    const {sponsors} = stage && stages && isObject(stages) && stage.toUpperCase() in stages? stages[ stage.toUpperCase() ]: []

    if(isEmpty(stage) || isEmpty(stages) || isEmpty(presenters) || isEmpty(sponsors) || !Array.isArray(sponsors)){
        return null
    }

    return (<Box mb={2}><Typography variant="overline" display="block" align="center" gutterBottom>{translate("streaming.stagesponsors")}</Typography><Grid container spacing={1} direction="column" alignItems="center" justify="center">{sponsors.map(id => {

        const sponsor = presenters.find(item => item.id == id)

        return (<Grid key={id} item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Avatar 
                variant="square"  
                src={ resizeCloudinaryImage(get(sponsor, "logotype_cdn"), 300, 300) } 
                classes={{
                    root: classes.sponsorImageContainer,
                    img: classes.sponsorImage
                }}
            />
        </Grid>)
    })}</Grid></Box>)
    
} 

export default StageSponsors
