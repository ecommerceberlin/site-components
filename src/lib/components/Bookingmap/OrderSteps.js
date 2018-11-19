import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { translate } from '../../i18n';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose'

const styles = {
    root : {
        backgroundColor : 'transparent'
    }
}

const OrderSteps = ({items, classes, translate, baseLabel, active}) => (

    <Stepper classes={{root : classes.root }} activeStep={active} alternativeLabel>
    {items.map(label => {
    return (
        <Step key={label}>
        <StepLabel>{ translate(`${baseLabel}.${label}`) }</StepLabel>
        </Step>
    );
    })}
    </Stepper>

)

OrderSteps.defaultProps = {
    items : [],
    baseLabel : "event.sales.steps",
    active : 0
}

const enhance = compose(
    translate,
    withStyles(styles)
)
export default enhance(OrderSteps)