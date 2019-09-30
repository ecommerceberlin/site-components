import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import * as Selectors from './redux/votes'
import { votingStatus } from '../components/redux'
import { getVotes } from '../redux/selectors'


class Votes extends React.Component {

    componentDidMount(){

        const {all, votingStatus, service} = this.props;

        if(! all.length){
             //we cannot preload this data so we leave it as... 
             //we should throttle in redux saga...
            votingStatus(service);
        }
       
    }

  render(){

    const {children, ...rest} = this.props

    if(children){

      return children(rest)

    }

    return null
  }

}

Votes.propTypes = {
  all: PropTypes.array.isRequired,
  keyed : PropTypes.object.isRequired,
}

Votes.defaultProps = {
  service : "linkedin",
  all : [],
  keyed : {}
};


export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        all : getVotes(state, props),
        keyed : Selectors.KeyedVotesSelector(state, props),
      }
    }
    return mapStateToProps

}, {votingStatus})(Votes)


