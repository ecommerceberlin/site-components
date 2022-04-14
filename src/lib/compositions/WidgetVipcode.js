 
import React from 'react';
import get from 'lodash/get'
import { Typography, Paper, Grid, TextField, Box, LinearProgress } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import {grey, red} from '@material-ui/core/colors'
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import { useRouter } from 'next/router';
import Wrapper from '../components/Wrapper'
import {TwoColsLayout} from '../components/MyLayouts'
import { useRecord, useSettings } from '../helpers';
import { useTranslate } from '../i18n'
import { MyButton } from '../components';
import WidgetRegForm from './WidgetRegForm';




const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: grey[100],
    },
    heading: {
      maxWidth: 600
    },
    cname: {
        fontWeight: 900
    },
    icon: {
        fontSize: 100,
        color: red[700]
    }
}))


const CodeIsValid = ({code="", inviting=""}) => {

    const [translate] = useTranslate()
    const classes = useStyles()

    return (
        <Paper className={classes.root}>
        <TwoColsLayout 
        left={
            <Box ml={2} mt={1} mb={3}>
            <Grid container alignItems='center' justifyContent='center' direction="column" spacing={1}>
                <Grid item>
                <AllInclusiveIcon className={classes.icon} />
                </Grid>
                <Grid item>
                <Typography variant="h5" className={classes.heading}>
                    <span className={classes.cname}>{inviting}</span>{` `}{translate("vipcodes.invitation")}
                </Typography>        
                </Grid>
            </Grid>
            </Box>
        } 
        leftSize={6}
        right={
            <Box mt={3} mb={2}>
                <FillEmailForm code={code} />
            </Box>
        } />
     </Paper>)

}


const FillEmailForm = ({code}) => {

    const [email, setEmail] = React.useState("")
    const [status, setStatus] = React.useState("")
    const [translate] = useTranslate()
    const classes = useStyles()

    const {api} = useSettings("system")

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, code})
    }
    
    const handleCheck  = () => fetch(`${api}/vipcode-visitor-check`, options).then(response => response.json()).then(json => {
        if("data" in json){
            setStatus(json.data)
        }
        if("error" in json){
            setStatus("error")
        }
    })    
    
    switch(status){
        case "register":
            return  <Box>
                <Typography variant="subtitle1" paragraph className={classes.heading}>{translate("vipcodes.status-register")}</Typography>)
                <WidgetRegForm setting="visitor.register" raw={true} data={{
                email,
                code
            }} /></Box>
        break;
        case "assigned":
            return (<Typography variant="subtitle1" paragraph className={classes.heading}>{translate("vipcodes.status-assigned")}</Typography>)
        break;
        case "error":
            return (<Typography variant="subtitle1" paragraph className={classes.heading}>{translate("vipcodes.code-is-expired")}</Typography>)
        break;
        default: 
            return (<Box mt={5}>
                 <Typography variant="subtitle1" paragraph className={classes.heading}>{translate("vipcodes.lets-start")}</Typography>
                <Grid container direction="row" alignItems='center' justifyContent='center'>
                <Grid item>
                    <TextField value={email} onChange={e => setEmail(e.target.value)} label="E-mail" variant="outlined" />
                </Grid>
                <Grid item>
                    <MyButton onClick={handleCheck} label={translate("common.next")} variant="text" />
                </Grid>
                </Grid>
            </Box>)
    }


}

const CodeIsExpired = () => {
    const [translate] = useTranslate()

    return <Typography variant="h6">{translate("vipcodes.code-is-expired")}</Typography>
}

const WidgetVipcode = () => {

    const {query} = useRouter()
    const {should_be_expired, code, id, company} = useRecord("vipcodes", query && "vipcode" in query? query.vipcode: "")
    
    if(!("vipcode" in query)){
        return null
    }

    if(should_be_expired){
        return (<Wrapper first><CodeIsExpired /></Wrapper>)
    }

    if(!id){
        return (<Wrapper first><LinearProgress /></Wrapper>)
    }

    return (<Wrapper first><CodeIsValid code={code} inviting={get(company, "profile.name", "")} /></Wrapper>)
}
 

export default WidgetVipcode
