
//import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { translate } from '../i18n'


const styles = {
    
    voteContainer : {
        marginBottom: 10,
    },
    votedItem : {
        marginTop: 10
    }
}

const VoteStatus = ({all, keyed, classes, translate}) => {
    return null
}

// all.map(item => (
//         <div key={item.id} className={classes.votedItem}>{
//             `${item.presentation_title} ${item.presenter}`
//         }</div>
// ))


VoteStatus.defaultProps = {
    all : [],
    keyed : {}
}

const enhance = compose(
    translate,
    withStyles(styles)
)

export default enhance(VoteStatus)