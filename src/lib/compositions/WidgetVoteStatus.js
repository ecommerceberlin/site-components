//import PropTypes from 'prop-types';
import React from 'react'
import Datasource from '../datasources/Votes'
import { getLinkedInToken } from '../redux/selectors'
import { useSelector } from 'react-redux';
import Alert from '../components/Alert'
import { makeStyles } from '@material-ui/core/styles';
import {useTranslate} from '../i18n'

const useStyles = makeStyles(theme => ({

    voteContainer : {
        marginBottom: 10,
    },
    votedItem : {
        marginTop: 10
    }

}))

const WidgetVoteStatus = ({max_votes=10}) => {
    const classes = useStyles()
    const [translate] = useTranslate()
    const linkedin = useSelector(getLinkedInToken)
    if(!linkedin){
        return null
    }

    return (

        <Datasource>{({all, keyed}) => {
            
            const remaining = max_votes - (all || []).length;

            return ( <Alert type={remaining>0 ? "success": "info"} content={ 

                `${translate("common.remaining")} ${translate("common.votes")}: ${remaining} `

             } />
            )

        }
        }</Datasource>
    )

}


export default WidgetVoteStatus
