import { dialogShow } from '../redux/actions';
import { useDispatch } from 'react-redux'
import MyButton from '../MyButton'
import { usePresentation } from './context';
import { useTranslate } from '../../i18n';
import ScheduleItemApplyInteraction from './ScheduleItemApplyInteraction';
import { useDatasource, useSettings } from '../../helpers';
import { Typography, Box } from '@material-ui/core';


const ScheduleItemApply = ({setting="workshops.apply"}) => {


    const dispatch = useDispatch();
    const { id, limited, company_id, presenter, title, time, venue } = usePresentation()
    const [translate] = useTranslate()
    const workshopers = useDatasource({resource: "workshopers"})
    const {limit} = useSettings(setting)

    const pipeline = Array.isArray(workshopers)? workshopers.filter(item => item.rel_participant_id == id  && item.direction === "LTD" && !item.responded_at ): [];
    const agreed = pipeline.filter(item => item.agreed);

    const labelProps = {
        pipeline: pipeline.length, 
        agreed: agreed.length,
        limit,
        presenter,
        title,
        time,
        venue,
        remaining: limit - agreed.length
    }

    // console.log(agreed, limit, workshopers)

    const handleClick = () => dispatch(dialogShow({
        title: translate("workshops.apply.hello", labelProps),
        content: <ScheduleItemApplyInteraction rel_participant_id={id} company_id={company_id} />, 
        width: "xl"
    }))

    if(!limited){
        return null
    }

    /**
     * company must be assigned because we need RSVP panel
     */
    if(!company_id){
        return null
    }

    if(agreed >= limit){
        return( <MyButton label="workshops.apply.closed" labelProps={labelProps} disabled={true} variant="contained" color="default" />)
    }

    return (
        <Box>
            <Box>
            <MyButton label="workshops.apply.button" labelProps={labelProps} onClick={handleClick} variant="contained" color="primary" />
            </Box>
            <Box>
                <Typography variant="overline" display="block">{translate("workshops.apply.remaining", labelProps)}</Typography>
                <Typography variant="overline"  display="block">{translate("workshops.apply.awaiting", labelProps)}</Typography>
            </Box>
        </Box>
    )
}

export default ScheduleItemApply