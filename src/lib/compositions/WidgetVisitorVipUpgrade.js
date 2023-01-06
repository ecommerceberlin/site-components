 
import React from 'react';
import get from 'lodash/get'
import { Typography, LinearProgress, Box } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import {grey, red} from '@material-ui/core/colors'
import { useRouter } from 'next/router';
import Wrapper from '../components/Wrapper'
import { useRecord } from '../helpers';
import { useTranslate } from '../i18n'
import WeekendIcon from '@material-ui/icons/Weekend';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import WidgetCompanyInteraction from './WidgetCompanyInteraction'
import WidgetRegForm from './WidgetRegForm';


const useStyles = makeStyles(theme => ({
   
    icon: {
        fontSize: 100,
        color: red[700]
    }
}))





const CodeIsExpired = () => {
    const [translate] = useTranslate()

    return <Typography variant="h4">{translate("vipcodes.code-is-expired")}</Typography>
}

const WidgetCompanyVip = () => {

    const {query} = useRouter()
    const {should_be_expired, code, id, company} = useRecord("vipcodes", query && "vipcode" in query? query.vipcode: "")
    const classes = useStyles()
    const [translate] = useTranslate()

    if(!("vipcode" in query)){
        return null
    }

    if(should_be_expired){
        return (<Wrapper first><CodeIsExpired /></Wrapper>)
    }

    if(!id){
        return (<Wrapper first><LinearProgress /></Wrapper>)
    }

    return (<Wrapper first>
        <WidgetCompanyInteraction 
            label="vipcodes.invitation"
            regFormLabel="vipcodes.lets-start"
            data={{code}}
            endpoint="/vipcode-visitor-check"
            cname={get(company, "profile.name", "")} 
            icons={
                <>
                <WeekendIcon className={classes.icon} />
                <LocalCafeIcon className={classes.icon} />
                </>
            }
            render={ ( {email, status} ) => {

                switch(status){
                    case "register":
                        return ( <Box m={2}>
                            <Typography variant="subtitle1" paragraph className={classes.heading}>{translate("vipcodes.status-register")}</Typography>)
                            <WidgetRegForm setting="visitor.register" raw={true} data={{
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
 

export default WidgetCompanyVip
