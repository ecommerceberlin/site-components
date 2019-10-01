import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import { MobileAwareFilteredPresenters, getPresenters, getPresenterByIdSelector } from '../redux/selectors'
import {resourceFetchRequest } from '../components/redux'

// import { getCompanyProfileInfo, filterCompanyInstances } from '../helpers';

class PresentersAll extends React.Component {

  componentDidMount(){

      const {resourceFetchRequest, filtered} = this.props

      if(!filtered.length){
        resourceFetchRequest("presenters_all")
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

PresentersAll.propTypes = {
  filtered: PropTypes.array.isRequired,
  record : PropTypes.object.isRequired
};

PresentersAll.defaultProps = {
   filtered : [],
   all : [],
   record : {},
   filter : null
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

}, {resourceFetchRequest})(PresentersAll)