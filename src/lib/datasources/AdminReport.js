import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {resourceFetchRequest } from '../components/redux'


class Report extends React.Component {

  componentDidMount(){

      const {resourceFetchRequest, all} = this.props

      if(!all.length){
        resourceFetchRequest("report")
      }
  }

  render(){

    const {children, all} = this.props

    if(children){
      return children(all)
    }

    return null
  }

}



Report.defaultProps = {
   all : [],
};

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        all : "report" in state.resources ? state.resources.report : [],
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(Report)
