
import { useDispatch } from 'react-redux';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import { useTranslate } from '../../i18n';
import GrayBigButton from '../GrayBigButton';
import {WidgetCompanyMeetupInteraction} from '../../compositions/WidgetCompanyMeetup';
import { dialogShow } from '../redux/actions';
import { useRouter } from 'next/router';
import {useCompany} from './context'
import { useSettings } from '../../helpers';

const CompanyMeet = () => {
    
    const {query, push} = useRouter()
    const [translate] = useTranslate()
    const dispatch = useDispatch();
    const {present, id} = useCompany()
    const {disableMeetups} = useSettings("exhibitors")

    const handleClick = () => dispatch(dialogShow({
        title: translate("exhibitors.meetup.create"),
        content: <WidgetCompanyMeetupInteraction /> ,
        width: "xl"
    }))

    if(disableMeetups){
        return null
    }

    if(!present){
        return null
    }

    // if("vipcode" in query){
    //     return null
    // }

    // if("meet" in query){
    //     return null
    // }


    return (
        <GrayBigButton label="" icon={<RecordVoiceOverIcon />} onClick={() => push(`https://ecomm.berlin/people/exhibitors#%7B%22page%22%3A1%2C%22company_id%22%3A${id}%7D`)} actionLabel="exhibitors.meetup.create" />
    )
   
    // return (
    //     <GrayBigButton label="" icon={<RecordVoiceOverIcon />} onClick={handleClick} actionLabel="exhibitors.meetup.create" />

    // )
   
}



export default CompanyMeet