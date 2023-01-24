 
import React from 'react';
import { Typography, Box, Avatar } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import {grey, red} from '@material-ui/core/colors'
import Wrapper from '../components/Wrapper'
import { useRecord, useSettings } from '../helpers';
import { useTranslate } from '../i18n'
import WidgetCompanyInteraction from './WidgetCompanyInteraction'
import WidgetRegForm from './WidgetRegForm';
import { isObject } from 'lodash';


const useStyles = makeStyles(theme => ({
   
    icon: {
        color: "#ffffff",
        backgroundColor: red[500],
        width: theme.spacing(10),
        height: theme.spacing(10),
        fontSize: theme.typography.pxToRem(35)
    }
}))


const Disabled = () => {
    const [translate] = useTranslate()
    return <Typography variant="h4">{translate("vipcodes.code-is-expired")}</Typography>
}

const WidgetOrganizerVip = ({setting="", code=""}) => {
    const {allowed, wrapperProps, label} = useSettings(setting)
    // const {should_be_expired, code, id, company} = useRecord("vipcodes", query && "vipcode" in query? query.vipcode: "")
    const classes = useStyles()
    const [translate] = useTranslate()

    if(!code || !allowed || !isObject(allowed) || !(code in allowed) || !isObject(allowed[code]) ){
        return (<Wrapper first><Disabled /></Wrapper>)
    }

    const {company_id, cname} = allowed[code]

    return (<Wrapper {...wrapperProps}>
        <WidgetCompanyInteraction 
            label={label}
            regFormLabel="vipcodes.lets-start"
            data={{code}}
            endpoint="/visitor-check"
            cname={cname} 
            icons={<Avatar className={classes.icon}>VIP</Avatar>}
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
