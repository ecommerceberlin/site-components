 
import React from 'react';
import get from 'lodash/get'
import { Typography, LinearProgress, Box } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import {grey, red} from '@material-ui/core/colors'
import { useRouter } from 'next/router';
import Wrapper from '../components/Wrapper'
import { useRecord } from '../helpers';
import { useTranslate } from '../i18n'
import WidgetCompanyInteraction from './WidgetCompanyInteraction'
import WidgetRegForm from './WidgetRegForm';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';

const useStyles = makeStyles(theme => ({
   
    icon: {
        fontSize: 100,
        color: red[700]
    }
}))


export const WidgetCompanyMeetupInteraction = () => {

    const {query} = useRouter()
    const classes = useStyles()
    const [translate] = useTranslate()
    const {id} = useRecord("companies", query && "slug" in query? query.slug: "")   


    return (<WidgetCompanyInteraction 
    label="exhibitors.meetup.invitation"
    regFormLabel="exhibitors.meetup.lets-start"
    data={{company_id: id }}
    endpoint="/companymeetup-visitor-check"
    // cname={get(company, "profile.name", "")} 
    icons={
       
        <RecordVoiceOverIcon className={classes.icon} />
      
    }
    render={ ( {email, status} ) => {

        switch(status){
            case "register":
                return (<Box m={2}>
                    <Typography variant="subtitle1" paragraph className={classes.heading}>{translate("exhibitors.meetup.statuses.register")}</Typography>)
                    <WidgetRegForm setting="visitor.register" raw={true} data={{
                        email, 
                        company_id: id
                    }} /></Box>)

            case "already_assigned":
                return (<Box m={2}><Typography variant="h4" paragraph className={classes.heading}>{
                    translate("exhibitors.meetup.statuses.exists")
                }</Typography></Box>)

                        
            case "assigned":
                return (<Box m={2}><Typography variant="h4" paragraph className={classes.heading}>{
                    translate("exhibitors.meetup.statuses.assigned")
                }</Typography></Box>)

            case "error":
                return (<Box m={2}><Typography variant="subtitle1" paragraph className={classes.heading}>{
                    translate("exhibitors.meetup.statuses.error")
                }</Typography></Box>)

        }


    }}
    />)
}

const WidgetCompanyMeetup = () => {

    const {query} = useRouter()

    if(!("meet" in query)){
        return null
    }

    return (<Wrapper first><WidgetCompanyMeetupInteraction /></Wrapper>)
}
 

export default WidgetCompanyMeetup
