


import {useCompany} from './context'
import Button from '../MyButton'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useDispatch } from 'react-redux';
import { dialogShow } from '../redux/actions';
import isEmpty from 'lodash/isEmpty'
import {Booth, Bookingmap} from '../Bookingmap'
import { useTranslate } from '../../i18n';
const CompanyLocation = () => {

    const {name, boothIds, boothNames, mapSetting} = useCompany()
    const [translate] = useTranslate()
    const dispatch = useDispatch();

    const translationProps = {
        cname2: name, 
        loc: boothNames.join(','),
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

    return (<Button onClick={handleClick} startIcon={<LocationOnIcon />} label="exhibitors.booth_location" labelProps={translationProps} variant="contained" />)
   
}

export default CompanyLocation