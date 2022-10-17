


import { dialogShow } from '../redux/actions';
import {useDispatch} from 'react-redux'
import MyButton from '../MyButton'
import { usePresentation } from './context';

const ScheduleItemApply = () => {


    const dispatch = useDispatch();
    const { limited } = usePresentation()

    if(!limited){
        return null
    }


    return (

        <MyButton label="workshops.apply.button" onClick={() => dispatch(dialogShow({
            title: "workshops.apply.button",
            content: "workshops.apply.details",
        }))} variant="outlined" color="primary" />

    )
}

export default ScheduleItemApply