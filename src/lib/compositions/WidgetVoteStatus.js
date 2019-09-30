//import PropTypes from 'prop-types';

import Datasource from '../datasources/Votes'
import SimpleVoteStatus from '../components/VoteStatus'


const VoteStatus = () => (

    <Datasource>{(data) => <SimpleVoteStatus {...data} />}</Datasource>

)

export default VoteStatus
