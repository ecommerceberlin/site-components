
import { useDispatch } from 'react-redux';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import { useTranslate } from '../../i18n';
import GrayBigButton from '../GrayBigButton';
import {WidgetCompanyMeetupInteraction} from '../../compositions/WidgetCompanyMeetup';
import { dialogShow } from '../redux/actions';
import { useRouter } from 'next/router';
import {useCompany} from './context'


const CompanyMeet = () => {
    
    const {query} = useRouter()
    const [translate] = useTranslate()
    const dispatch = useDispatch();
    const {present} = useCompany()


    const handleClick = () => dispatch(dialogShow({
        title: translate("exhibitors.meetup.create"),
        content: <WidgetCompanyMeetupInteraction /> ,
        width: "xl"
    }))

    if(!present){
        return null
    }

    if("vipcode" in query){
        return null
    }

    if("meet" in query){
        return null
    }

    return (
        <GrayBigButton label="" icon={<RecordVoiceOverIcon />} onClick={handleClick} actionLabel="exhibitors.meetup.create" />

    )
   
}



export default CompanyMeet