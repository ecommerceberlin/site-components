


import {useCompany} from './context'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useDispatch } from 'react-redux';
import { dialogShow } from '../redux/actions';
import isEmpty from 'lodash/isEmpty'
import {Booth, Bookingmap} from '../Bookingmap'
import { useTranslate } from '../../i18n';
import GrayBigButton from '../GrayBigButton';
 

const CompanyLocation = () => {

    const {name, boothIds, boothNames, mapSetting} = useCompany()
    const [translate] = useTranslate()
    const dispatch = useDispatch();


    const translationProps = {
        cname2: name, 
        loc: boothNames.join(', '),
        smart_count: boothNames.length
    }

    const handleClick = () => dispatch(dialogShow({
        title: translate("exhibitors.booth_location_full", translationProps),
        content:  <Bookingmap setting={mapSetting} booth={Booth} marked={boothIds} />,
        width: "xl"
    }))

    if(isEmpty(boothIds)){
        return null
    }

    return (
        <GrayBigButton icon={<LocationOnIcon />} onClick={handleClick} actionLabel="exhibitors.map.exhibitor_location">{boothNames.join(", ")}</GrayBigButton>
      

    )
   
}


export default CompanyLocation


