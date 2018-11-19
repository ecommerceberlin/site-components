import { translate } from '../i18n'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const styles = {
    root : {
        color : red[500],
        fontWeight : 900,
        position : 'relative',
        top : -3
    }
}

const Highlight = ({translate, classes}) => (
    <span className={classes.root}>{translate("exhibitors.offers.offer")}</span>
)

const enhance = compose(
    translate,
    withStyles(styles)
)


export default enhance(Highlight);