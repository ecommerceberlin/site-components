import React from 'react'
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

const VoteStatus = ({all, enabled, classes, translate, max_votes}) => {
    const remaining = max_votes - all.length;
    return enabled ? `${translate("common.remaining")} ${translate("common.votes")}: ${remaining} `: null
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