import { Typography, Box } from '@material-ui/core';
import { dialogShow } from '../redux/actions';
import { useDispatch } from 'react-redux'
import MyButton from '../MyButton'
import { usePresentation } from './context';
import { useTranslate } from '../../i18n';
import { makeStyles } from '@material-ui/core/styles'
import {
    WidgetCompanyInteraction, 
    WidgetRegForm
} from '../../compositions'
import {grey, red} from '@material-ui/core/colors'
import SettingsIcon from '@material-ui/icons/Settings';


const useStyles = makeStyles(theme => ({
   
    icon: {
        fontSize: 100,
        color: red[700]
    }
}))


const ScheduleItemApplyInteraction = ({id, company_id}) => {

    const classes = useStyles()
    const [translate] = useTranslate()

    return (<WidgetCompanyInteraction 
        label="workshops.apply.hello"
        regFormLabel="workshops.apply.lets-start"
        data={{company_id }}
        endpoint="/workshop-visitor-check"
        // cname={get(company, "profile.name", "")} 
        icons={<SettingsIcon className={classes.icon} />}
        render={ ( {email, status} ) => {
    
            switch(status){
                case "register":
                    return (<Box m={2}>
                        <Typography variant="subtitle1" paragraph className={classes.heading}>{
                        translate("workshops.apply.statuses.register")
                        }</Typography>
                        <WidgetRegForm setting="visitor.register" raw={true} data={{
                            email, 
                            company_id: id
                        }} /></Box>)
    
                case "already_assigned":
                    return (<Box m={2}>
                        <Typography variant="h4" paragraph className={classes.heading}>{
                        translate("workshops.apply.statuses.exists")
                        }</Typography></Box>)
    
                            
                case "assigned":
                    return (<Box m={2}><Typography variant="h4" paragraph className={classes.heading}>{
                        translate("workshops.apply.statuses.assigned")
                    }</Typography></Box>)
    
                case "error":
                    return (<Box m={2}><Typography variant="subtitle1" paragraph className={classes.heading}>{
                        translate("workshops.apply.statuses.error")
                    }</Typography></Box>)
    
            }
    
    
        }}
        />)
}


const ScheduleItemApply = () => {

    const classes = useStyles()
    const dispatch = useDispatch();
    const { id, limited, company_id } = usePresentation()
    const [translate] = useTranslate()
    
    const handleClick = () => dispatch(dialogShow({
        title: translate("workshops.apply.button"),
        content:  translate("workshops.apply.details"),// <ScheduleItemApplyInteraction id={id} company_id={company_id} /> ,
        width: "xl"
    }))

    if(!limited){
        return null
    }

    if(!company_id){
        return null
    }

    return (

        <MyButton label="workshops.apply.button" onClick={handleClick} variant="outlined" color="primary" />

    )
}

export default ScheduleItemApply