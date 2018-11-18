import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import {PromotedExhibitorOffers, StandardExhibitorOffers} from '../redux/selectors'
import {resourceFetchRequest } from '../components/redux'


class Offers extends React.Component {

  componentDidMount(){

      const {resourceFetchRequest, data} = this.props

      if(!data.length){
        resourceFetchRequest("exhibitors")
      }
  }
 

  render(){

    const {children, promoted, rest} = this.props

    if(children){

      return children(promoted, rest)

    }

    return null
  }

}

Offers.propTypes = {
  data: PropTypes.array.isRequired,
  keywords: PropTypes.array.isRequired,
  keyword : PropTypes.string
};

Offers.defaultProps = {
  data : [],
  keywords : [],
  keyword : ""
};

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        promoted : PromotedExhibitorOffers(state, props),
        rest : StandardExhibitorOffers(state, props)
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(Offers)
