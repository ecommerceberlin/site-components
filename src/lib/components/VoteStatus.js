import React from 'react'
//import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { translate } from '../i18n'
import Typography from './MyTypography';

const styles = {
    
    voteContainer : {
        marginBottom: 10,
    },
    votedItem : {
        marginTop: 10
    }
}

const VoteStatus = ({all, enabled, classes, translate, max_votes}) => {

    const remaining = max_votes - all.length;

    return enabled ? ( <Typography template="benefitsText">
    {`${translate("common.remaining")}: ${remaining} ${translate("common.votes")}`}
    </Typography>) : null

}

// all.map(item => (
//         <div key={item.id} className={classes.votedItem}>{
//             `${item.presentation_title} ${item.presenter}`
//         }</div>
// ))


VoteStatus.defaultProps = {
    all : [],
    keyed : {},
    max_votes : 10,
    enabled : false
}

const enhance = compose(
    translate,
    withStyles(styles)
)

export default enhance(VoteStatus)