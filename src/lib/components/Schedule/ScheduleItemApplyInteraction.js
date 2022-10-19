import { Typography, Box } from '@material-ui/core';
import { useTranslate } from '../../i18n';
import { makeStyles } from '@material-ui/core/styles'
import {grey, red} from '@material-ui/core/colors'
import SettingsIcon from '@material-ui/icons/Settings';
import WidgetCompanyInteraction from '../../compositions/WidgetCompanyInteraction';
import WidgetRegForm from '../../compositions/WidgetRegForm';



const useStyles = makeStyles(theme => ({
   
    icon: {
        fontSize: 100,
        color: red[700]
    }
}))


const SimpleMessageBox = ({label="", children=null}) => {
    const [translate] = useTranslate()
    const classes = useStyles()

    return (<Box m={2}>
    <Typography variant="h5" paragraph className={classes.heading}>{translate(label)}</Typography>
    {children}
    </Box>)
}

const ScheduleItemApplyInteraction = ({rel_participant_id, company_id}) => {

    const classes = useStyles()

    if(!rel_participant_id){
        return null
    }

    return (<WidgetCompanyInteraction 
        label="workshops.apply.details"
        regFormLabel="workshops.apply.lets-start"
        data={{company_id, rel_participant_id}}
        endpoint="/workshop-visitor-check"
        // cname={get(company, "profile.name", "")} 
        icons={<SettingsIcon className={classes.icon} />}
        render={ ( {email, status} ) => {
    
            switch(status){
                case "register":
                    return (<SimpleMessageBox label="workshops.apply.statuses.register">
                           <WidgetRegForm setting="visitor.register" raw={true} data={{
                            email, 
                            company_id,
                            rel_participant_id
                        }} />
                    </SimpleMessageBox>)
    
                case "already_assigned":
                    return (<SimpleMessageBox label="workshops.apply.statuses.exists" />)
    
                case "assigned":
                    return (<SimpleMessageBox label="workshops.apply.statuses.assigned" />)
    
                case "over_limit":
                    return (<SimpleMessageBox label="workshops.apply.statuses.over_limit" />)
        
                case "error":
                    return (<SimpleMessageBox label="workshops.apply.statuses.error" />)
    
                default:
                    return null
            }
    
    
        }}
        />)
}

export default ScheduleItemApplyInteraction;