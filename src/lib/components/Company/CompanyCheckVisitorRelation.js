import React from 'react'
import {
    Grid, 
    Typography,
    Box,
    Button,
    TextField
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import { useTranslate } from '../../i18n'
import { useSettings } from '../../helpers';
import { isFunction } from 'lodash';


const useStyles = makeStyles(theme => ({
    
    heading: {
      maxWidth: 600
    },
    input: {
        width: "40ch"
    }

}))


function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }


const CompanyCheckVisitorRelation = ({label="", data={}, endpoint="/vipcode-visitor-check", render}) => {

    const [fields, setFields] = React.useState({})
    const [status, setStatus] = React.useState("")
    const [translate] = useTranslate()
    const classes = useStyles()
    const {api} = useSettings("system")

    const handleCheck  = () => {

        if(!fields.email){
            return;
        }

        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({...fields, ...data})
        }

        fetch(`${api}${endpoint}`, options).then(response => response.json()).then(json => {
            if("data" in json){
                setStatus(json.data)
            }
            if("error" in json){
                setStatus("error")
            }
        }) 
    }

    const handleReset = () => setStatus("")
    
    if( status ){
        return isFunction(render)? <Box>{render({...fields, status})}</Box>: status
    }

    return (
        <Box mt={5}>
        <Box mb={1}>
        <Typography variant="h4" paragraph className={classes.heading}>{translate(label)}</Typography>
        </Box>
        <Grid container direction="row" alignItems='center' justifyContent='flex-start'>
            <Grid item>
            <TextField value={fields.email || ""} onChange={e => setFields({...fields, email: e.target.value})} label="E-mail" variant="filled" className={classes.input} />
            </Grid>
            <Grid item>
            {fields.email && emailIsValid(fields.email)? <Button onClick={handleCheck} variant="text">{translate("common.next")}</Button>: null}
            </Grid>
        </Grid>
        </Box>
   )

  
}

export default CompanyCheckVisitorRelation

/**
 * 
 * <Box mt={2} textAlign="right"><Button onClick={handleReset} variant="text">{translate("common.try-again")}</Button></Box>
 */