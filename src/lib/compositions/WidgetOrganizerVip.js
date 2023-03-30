 
import React from 'react';
import { Typography, Box, Avatar, Grid } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import {grey, red} from '@material-ui/core/colors'
import Wrapper from '../components/Wrapper'
import { useRecord, useSettings } from '../helpers';
import { useTranslate } from '../i18n'
import WidgetCompanyInteraction from './WidgetCompanyInteraction'
import WidgetRegForm from './WidgetRegForm';
import WidgetCompany from './WidgetCompany';
import { 
    CompanyContextProvider, 
    CompanyLogotype 
} from '../components/Company';
import { isObject, get } from 'lodash';


const useStyles = makeStyles(theme => ({
   
    icon: {
        color: "#ffffff",
        backgroundColor: red[500],
        width: theme.spacing(12),
        height: theme.spacing(12),
        fontSize: theme.typography.pxToRem(40),
        fontWeight: 900
    }
}))


const Disabled = () => {
    const [translate] = useTranslate()
    return <Typography variant="h4">{translate("vipcodes.code-is-expired")}</Typography>
}

const DefaultAvatar = () => {
    const classes = useStyles()
    return (<Avatar className={classes.icon}>VIP</Avatar>)

}

const DefaultAvatarOrCompanyLogotype = ({slug_or_id}) => {
    const company = useRecord("companies", slug_or_id)

    if(company && "id" in company){
        return (
            <CompanyContextProvider data={company}>
                   <Grid container spacing={3} alignItems="center">
                    <Grid item>
                        <CompanyLogotype /></Grid>
                    <Grid item>
                        <DefaultAvatar />
                    </Grid>
                    </Grid>
            </CompanyContextProvider>
        )
    }

    return <DefaultAvatar />
}

const WidgetOrganizerVip = ({setting="", code=""}) => {
    const {allowed, wrapperProps, label} = useSettings(setting)
    // const {should_be_expired, code, id, company} = useRecord("vipcodes", query && "vipcode" in query? query.vipcode: "")
    const classes = useStyles()
    const [translate] = useTranslate()
    const {company, customLabel} =  get(allowed, `${code}`, {})


    if(!code || !allowed || !isObject(allowed) || !(code in allowed) || !isObject(allowed[code]) ){
        return (<Wrapper first><Disabled /></Wrapper>)
    }


    return (<Wrapper {...wrapperProps}>
        <WidgetCompanyInteraction 
            label={customLabel || label}
            regFormLabel="vipcodes.lets-start"
            data={{code}}
            endpoint="/visitor-check"
            icons={<DefaultAvatarOrCompanyLogotype slug_or_id={ company } />}
            render={ ( {email, status} ) => {

                switch(status){
                    case "register":
                        return ( <Box m={2}>
                            <Typography variant="subtitle1" paragraph className={classes.heading}>{translate("vipcodes.status-register")}</Typography>
                            <WidgetRegForm setting={setting} raw={true} data={{
                                email, 
                                code
                            }} /></Box>)

                    case "assigned":
                        return (<Box m={2}><Typography variant="h4" paragraph className={classes.heading}>{translate("vipcodes.status-assigned")}</Typography></Box>)

                    case "error":
                        return (<Box m={2}><Typography variant="subtitle1" paragraph className={classes.heading}>{translate("vipcodes.code-is-expired")}</Typography></Box>)

                }


            }}
        />

        </Wrapper>)
}
 

export default WidgetOrganizerVip
