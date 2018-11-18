import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import { MobileAwareFilteredPresenters, getPresenters, getPresenterByIdSelector } from '../redux/selectors'
import {resourceFetchRequest } from '../components/redux'

// import { getCompanyProfileInfo, filterCompanyInstances } from '../helpers';

class Presenters extends React.Component {

  componentDidMount(){

      const {resourceFetchRequest, filtered} = this.props

      if(!filtered.length){
        resourceFetchRequest("presenters")
      }
  }

 

  render(){

    const {children, filtered, all, record} = this.props

    if(children){

      return children(filtered, all, record)

    }

    return null
  }

}

Presenters.propTypes = {
  filtered: PropTypes.array.isRequired,
  record : PropTypes.object.isRequired
};

Presenters.defaultProps = {
   filtered : [],
   all : [],
   record : {},
   filter : ""
};

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        
        filtered : MobileAwareFilteredPresenters(state, props),
        all : getPresenters(state, props),
        record : getPresenterByIdSelector(state, props)
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(Presenters)
