import React from 'react'
import Grid from '@material-ui/core/Grid' 
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { useDatasource, resizeCloudinaryImage, useDialog, capitalizeFirstLetter } from '../helpers'
import { useTranslate } from '../i18n'
import Button from './MyButton';
import Typography from '@material-ui/core/Typography';
import isEmpty from 'lodash/isEmpty'
import EmailIcon from '@material-ui/icons/Email';
import Sharer from './Sharer'





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
    height: 40,
    width: 175,
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

const PrizeDetails = ({name, min, max, level}) => {

    const [translate] = useTranslate()

/*
{
"id": 1,
"organizer_id": 1,
"group_id": 1,
"name": "badges",
"disabled": 0,
"min": 1,
"max": 1,
"level": 200,
"created_at": "2021-10-03 12:20:07",
"updated_at": "2021-10-03 12:20:07"
},
 */
    return (<ul>
    <li>{translate("prizes.min")}: {min}</li>
    <li>{translate("prizes.max")}: {max}</li>
    <li>{translate("prizes.level")}: {level}</li>
    </ul>)
}


const Prizes = ({active=[], icons={}}) => {
    const data = useDatasource({resource: "prizes", filters:{
        sort: "level"
    }});
    const dialog = useDialog()
    const classes = useStyles()

    if(isEmpty(data) || !Array.isArray(data)){
        return null
    }
    return data.map(prize => {

        const name = capitalizeFirstLetter( prize.name )

        if(name in icons){
            return React.createElement(icons[name], {
                fontSize: "large",
                onClick: () => dialog({label: `prizes.${prize.name}.name`, content: <PrizeDetails {...prize} />}),
                className: (active || []).includes(prize.name)? classes.active: classes.disabled
            })
        }

        return prize.name
    })
}

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


const PartnerPerformance = ({icons}) => {
   
    const classes = useStyles()
   const data = useDatasource({resource: "ranking"});
   const [translate] = useTranslate()
   const dialog = useDialog()

    if(isEmpty(data)){
        return null
    }

   return (<TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
    <TableHead>
    <TableRow>
    <TableCell align="right">{translate("common.position")}</TableCell>
    <TableCell align="center">{translate("common.exhibitor")}</TableCell>
    <TableCell align="right">{translate("common.points")}</TableCell>
    <TableCell align="center">{translate("prizes.name")}</TableCell>
    <TableCell>{translate("promo_materials.name")}</TableCell>
    </TableRow>
    </TableHead>
    <TableBody>{data.map((row) => (<TableRow key={row.id}>
    <TableCell align="right">{row.stats.position}</TableCell>
    <TableCell align="left" width="200">
        <Grid container spacing={1} direction="column" alignItems="center">
        <Grid item>
        <Avatar variant="square" src={ resizeCloudinaryImage(row.logotype, 175, 50) } classes={{
            root: classes.avatarContainer,
            img: classes.avatarImg
        }}/>
        </Grid>
        <Grid item>{row.name}</Grid>
        </Grid>
    </TableCell>
    <TableCell align="right"><Typography variant="h5">{row.stats.sessions}</Typography></TableCell>
    <TableCell align="center"><Prizes active={row.stats.prizes} icons={icons} /></TableCell>
    <TableCell><Button variant="outlined" onClick={()=>dialog({label: "test", content: <Promo data={row.creatives} />})} label="promo" /></TableCell>

    </TableRow>))}
    </TableBody>
    </Table>
    </TableContainer>)
 }


export default PartnerPerformance