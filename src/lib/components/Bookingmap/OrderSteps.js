import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { makeStyles } from '@material-ui/core/styles';

import { useTranslate } from '../../i18n';
import { useSettings } from '../../helpers'

const useStyles = makeStyles(theme => ({
    root : {
        backgroundColor : 'transparent'
    }
}))

const defaultProps = {
    steps : [],
    baseLabel : "event.sales.steps",
    active : 0
}

const OrderSteps = ({setting, ...props}) => {

    const classes = useStyles();
    const [translate] = useTranslate()
    const settings = useSettings(setting)
    const {steps, baseLabel, active} = Object.assign({}, defaultProps, settings, props)

    return (

        <Stepper classes={{root : classes.root }} activeStep={active} alternativeLabel>
        {steps.map(label => {
        return (
            <Step key={label}>
            <StepLabel>{ translate(`${baseLabel}.${label}`) }</StepLabel>
            </Step>
        );
        })}
        </Stepper>
    
    )
}


export default OrderSteps