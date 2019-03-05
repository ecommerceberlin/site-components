import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import { FilteredCompanies } from '../redux/selectors'
import {resourceFetchRequest } from '../components/redux'

// import { getCompanyProfileInfo, filterCompanyInstances } from '../helpers';

class Contestants extends React.Component {

  componentDidMount(){

      const {resourceFetchRequest, data} = this.props

      if(!data.length){
        resourceFetchRequest("contestants")
      }
  }


  render(){

    const {children, data} = this.props

    if(children){

      return children(data)

    }

    return null
  }

}

Contestants.propTypes = {
  data: PropTypes.array.isRequired,
  keywords: PropTypes.array.isRequired,
  keyword : PropTypes.string
};

Contestants.defaultProps = {
  data : [],
  keywords : [],
  keyword : ""
};

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        data : FilteredCompanies(state, props)
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(Contestants)
