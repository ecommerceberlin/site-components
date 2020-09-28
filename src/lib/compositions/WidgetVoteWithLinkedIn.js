import VoteWithLinkedIn from '../components/VoteWithLinkedIn'
import VotesDatasource from '../datasources/Votes'


const WidgetVoteWithLinkedIn = ({id}) => (

    <VotesDatasource>{

        ({all, keyed}) => <VoteWithLinkedIn id={id} votes={keyed} />

    }</VotesDatasource>

)

WidgetVoteWithLinkedIn.defaultProps = {
    id: 0
}

export default WidgetVoteWithLinkedIn;