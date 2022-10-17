


import { dialogShow } from '../redux/actions';
import {useDispatch} from 'react-redux'
import MyButton from '../MyButton'
import { usePresentation } from './context';
import { useTranslate } from '../../i18n';
const ScheduleItemApply = () => {


    const dispatch = useDispatch();
    const { limited } = usePresentation()
    const [translate] = useTranslate()

    if(!limited){
        return null
    }


    return (

        <MyButton label="workshops.apply.button" onClick={() => dispatch(dialogShow({
            title: translate("workshops.apply.button"),
            content: translate("workshops.apply.details"),
        }))} variant="outlined" color="primary" />

    )
}

export default ScheduleItemApply