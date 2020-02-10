import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {resourceFetchRequest } from '../components/redux'
import * as Selectors from './redux/adminreport' 


/*
  {
    "id": 105957,
    "company_id": 2,
    "account": "KM",
    "profile": {
        "fname": "Karolina",
        "lname": "Bartnik-Kura",
        "phone": "512357745",
        "booth": "B2.1"
    },
    "company": {
        "keywords": [
            "platform",
            "sales_generation",
            "software"
        ],
        "lang": "pl",
        "name": "Shoper"
    },
    "reps": 0,
    "party": 0,
    "meetups": 0,
    "errors": [],
    "purchases": []
  }
*/


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
   limit: 0
};

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        all : Selectors.FilteredAdminReport(state, props)
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(Report)
