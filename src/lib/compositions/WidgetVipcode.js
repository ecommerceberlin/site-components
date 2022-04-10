 
import React from 'react';


import get from 'lodash/get'

import { Typography, Paper, Grid, TextField, Button, Box, LinearProgress } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import {grey} from '@material-ui/core/colors'
import { useRouter } from 'next/router';

import Wrapper from '../components/Wrapper'
import {TwoColsLayout, Centered} from '../components/MyLayouts'
import { useRecord, useSettings, getCompanyProfileInfo } from '../helpers';
import { useTranslate } from '../i18n'
import { MyButton } from '../components';
import WidgetRegForm from './WidgetRegForm';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: grey[100]
    },
    heading: {
        marginLeft: 10,
        marginTop: 10
    }
}))


const CodeIsValid = ({code="", inviting=""}) => {

    const [translate] = useTranslate()
    const classes = useStyles()

    return (<Box>
        <Paper className={classes.root}>
        <TwoColsLayout 
        left={
            <Typography variant="h4" className={classes.heading}>{inviting}</Typography>        
        } right={

            <Box>
                <FillEmailForm code={code} />
            </Box>
        } />
     </Paper>
    </Box>)

}



const FillEmailForm = ({code}) => {

    const [email, setEmail] = React.useState("")
    const [status, setStatus] = React.useState("")
    const [translate] = useTranslate()

    const {api} = useSettings("system")

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, code})
    }

    const handleAssign  = () => fetch(`${api}/vipcode-visitor-assign`, options).then(response => {
            if (response.status !== 200) {

            }
            return response.json()
          }).then(json => {
           console.log(json)   
    })    
    
    const handleCheck  = () => fetch(`${api}/vipcode-visitor-check`, options).then(response => response.json()).then(json => {
        if("data" in json){
            setStatus(json.data)
        }
    })    
    
    if(status == "register"){
        return   <WidgetRegForm setting="visitor.register" raw={true} data={{
            email,
            code
        }} />

    }

    return (<Grid container direction="row" alignItems='center'>
        <Grid item><TextField value={email} onChange={e => setEmail(e.target.value)} label="E-mail" variant="outlined" /></Grid>
        <Grid item><MyButton onClick={handleCheck} label={translate("common.next")} variant="text" /></Grid>
    </Grid>)
   
}

const CodeIsExpired = () => {
    const [translate] = useTranslate()

    return <Typography variant="h6">{translate("vipcodes.expired")}</Typography>
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
