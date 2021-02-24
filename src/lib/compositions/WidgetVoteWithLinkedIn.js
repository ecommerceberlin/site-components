import React from 'react'
import VoteWithLinkedIn from '../components/VoteWithLinkedIn'
import VotesDatasource from '../datasources/Votes'


const WidgetVoteWithLinkedIn = ({id, ...rest}) => (

    <VotesDatasource>{

        ({all, keyed}) => <VoteWithLinkedIn id={id} votes={keyed} {...rest} />

    }</VotesDatasource>

)

WidgetVoteWithLinkedIn.defaultProps = {
    id: 0
}

export default WidgetVoteWithLinkedIn;