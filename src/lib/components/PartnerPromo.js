import React from 'react'
import Grid from '@material-ui/core/Grid' 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { useDatasource, resizeCloudinaryImage, useDialog, capitalizeFirstLetter } from '../helpers'
import { useTranslate } from '../i18n'
import Button from './MyButton';
import Typography from '@material-ui/core/Typography';
import isEmpty from 'lodash/isEmpty'
import EmailIcon from '@material-ui/icons/Email';
import Sharer from './Sharer'
import PartnerPrizes from './PartnerPrizes'

/***
 * 
 * 
 * https://v4.mui.com/components/material-icons/
 * const Icons = {



  leaflets : Ticket,
  meetups : Calendar,
  scanner : BarcodeScan,
  rollups : VolumeHigh,
  blog : Newspaper,
  earlybird : SquareIncCash
}

 */


 const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  avatarContainer: {
    width: 300,
    height: 300,
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

/***
 * 
    {
    id: 116521,
    company_id: 1479,
    name: 'R-D-T Omniscopy',
    logotype: 'https://res.cloudinary.com/eventjuicer/image/upload/w_600,h_600,c_fit,f_auto/v1601548662/c_1479_logotype.png',
    stats: { sessions: 0, conversions: 0, position: 0, prizes: [] }


    "creatives": [
{
"id": 1,
"name": "invite",
"lang": "pl",
"act_as": "newsletter",
"content": "https://services.eventjuicer.com/api/company-newsletters/100",
"newsletter": {
"html": "https://services.eventjuicer.com/api/company-newsletters/100?participant_id=106050&dl=1",
"zip": "https://services.eventjuicer.com/api/company-newsletters/100?participant_id=106050&zip=1"
}
},
{
"id": 2,
"name": "invite",
"lang": "en",
"act_as": "newsletter",
"content": "https://services.eventjuicer.com/api/company-newsletters/101",
"newsletter": {
"html": "https://services.eventjuicer.com/api/company-newsletters/101?participant_id=106050&dl=1",
"zip": "https://services.eventjuicer.com/api/company-newsletters/101?participant_id=106050&zip=1"
}
},
{
"id": 50,
"name": "logotype",
"lang": "pl",
"act_as": "link",
"link": "?utm_source=yy14dcs4_1175&utm_medium=link&utm_campaign=promoninja&utm_content=logotype",
"link_full": "https://targiehandlu.pl/exhibitors/thuliumpl?utm_source=yy14dcs4_1175&utm_medium=link&utm_campaign=promoninja&utm_content=logotype",
"shareable": true,
"services": [
"linkedin",
"twitter",
"facebook"
],
"requires": [
"logotype"
],
"enabled": true,
"template": "https://res.cloudinary.com/eventjuicer/image/upload/c_fit,h_210,w_800/u_template_teh20_exhibitor_pl,y_10/v1523270620/c_1175_logotype.png",
"sharers": {
"facebook": "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftargiehandlu.pl%2Fexhibitors%2Fthuliumpl%3Futm_source%3Dyy14dcs4_1175%26utm_medium%3Dlink%26utm_campaign%3Dpromoninja%26utm_content%3Dlogotype",
"linkedin": "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Ftargiehandlu.pl%2Fexhibitors%2Fthuliumpl%3Futm_source%3Dyy14dcs4_1175%26utm_medium%3Dlink%26utm_campaign%3Dpromoninja%26utm_content%3Dlogotype",
"twitter": "https://twitter.com/intent/tweet?text=https%3A%2F%2Ftargiehandlu.pl%2Fexhibitors%2Fthuliumpl%3Futm_source%3Dyy14dcs4_1175%26utm_medium%3Dlink%26utm_campaign%3Dpromoninja%26utm_content%3Dlogotype"
}
},
{
"id": 51,
"name": "opengraph_image",
"lang": "undefined",
"act_as": "link",
"link": "?utm_source=yy14dcs4_1175&utm_medium=link&utm_campaign=promoninja&utm_content=opengraph_image",
"link_full": "https://targiehandlu.pl/exhibitors/thuliumpl?utm_source=yy14dcs4_1175&utm_medium=link&utm_campaign=promoninja&utm_content=opengraph_image",
"shareable": true,
"services": [
"facebook",
"linkedin",
"twitter"
],
"requires": [
"opengraph_image"
],
"enabled": false,
"template": "https://res.cloudinary.com/eventjuicer/image/upload/w_1200,h_630,c_fit,f_auto/v1554212769/c_1175_opengraph_image.png",
"sharers": {
"facebook": "https://www.facebook.com/sharer/sharer.php?u=%3Futm_source%3Dyy14dcs4_1175%26utm_medium%3Dlink%26utm_campaign%3Dpromoninja%26utm_content%3Dopengraph_image",
"linkedin": "https://www.linkedin.com/sharing/share-offsite/?url=%3Futm_source%3Dyy14dcs4_1175%26utm_medium%3Dlink%26utm_campaign%3Dpromoninja%26utm_content%3Dopengraph_image",
"twitter": "https://twitter.com/intent/tweet?text=%3Futm_source%3Dyy14dcs4_1175%26utm_medium%3Dlink%26utm_campaign%3Dpromoninja%26utm_content%3Dopengraph_image"
}
}

    },
*/






const Promo = ({data}) => {

    if(isEmpty(data) || !Array.isArray(data)){
        return null
    }

    return <div><Grid container spacing={2}>{data.map(item =><Grid item key={item.id}>{item.act_as === "newsletter" ? <PromoNewsletter {...item} /> : <PromoLink {...item} />}</Grid>)}</Grid>
    <PromoRawLink />
    </div>
}

const PromoLink = ({link_full, sharable, enabled, sharers}) => {
    if(!enabled){
        return null
    }
    return <div><Sharer /></div>
}

const PromoRawLink = () => {
    return "rawlink"
}

const PromoNewsletter = ({name, lang, content, newsletter}) => {
    return (<Grid container direction="column">
        <Grid item><Button label="newsletter zip" startIcon={<EmailIcon />} href={newsletter.zip} /></Grid>
        <Grid item><Button label="newsletter html" startIcon={<EmailIcon />} href={newsletter.html} /></Grid>
    </Grid>)
}


const PartnerPromo = ({id, icons}) => {
   
   const classes = useStyles()
   const data = useDatasource({resource: "ranking"});
   const [translate] = useTranslate()
   const dialog = useDialog()

    if(isEmpty(data) || !Array.isArray(data)){
        return null
    }

    const company = data.find(item => item.company_id == id)

    if(!company){
        return null
    }

    return (<div>

    <Avatar variant="square" src={ resizeCloudinaryImage(company.logotype, 300, 300) } classes={{
        root: classes.avatarContainer,
        img: classes.avatarImg
    }}/>

    <Typography variant="h3">{translate("asd")}</Typography>
    <PartnerPrizes active={company.stats.prizes} icons={icons} />

    <Typography variant="h3">{translate("asd")}</Typography>
    <Promo data={company.creatives} />

    </div>)

 }


export default PartnerPromo