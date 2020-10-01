//import PropTypes from 'prop-types';

import Datasource from '../datasources/Votes'
import SimpleVoteStatus from '../components/VoteStatus'
import { getLinkedInToken } from '../redux/selectors'
import { connect } from 'react-redux';


const VoteStatus = ({linkedin, ...rest}) => {

    return (

        <Datasource>{(data) => <SimpleVoteStatus enabled={linkedin} {...rest} {...data} />}</Datasource>
    
    )

}

VoteStatus.defaultProps = {
    linkedin : null,
    max_votes : 10
}


export default connect((state, props) => {

    const mapStateToProps = (state, props) => {
        return {
          linkedin : getLinkedInToken(state),
        //   votes : KeyedVotesSelector(state, props),
        //   transaction : state.transactions.voting
        }
      }
    return mapStateToProps
})(VoteStatus)


