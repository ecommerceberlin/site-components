import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import {resourceFetchRequest } from '../components/redux'
import * as Selectors from './redux/contestantcompanies'

class ContestantCompanies extends React.Component {

  componentDidMount(){

      const {resourceFetchRequest, data} = this.props

      if(!data.length){
        resourceFetchRequest("contestant_companies")
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

ContestantCompanies.propTypes = {
  data: PropTypes.array.isRequired,
  keywords: PropTypes.array.isRequired,
  keyword : PropTypes.string
};

ContestantCompanies.defaultProps = {
  data : [],
  keywords : [],
  keyword : ""
};

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
     //   data : FilteredCompanies(state, props)
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(ContestantCompanies)
