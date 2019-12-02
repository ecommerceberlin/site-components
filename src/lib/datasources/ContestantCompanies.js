import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import * as Selectors from './redux/contestantcompanies'
import { resourceFetchRequest } from '../components/redux'

class ContestanCompanies extends React.Component {

  componentDidMount(){

      const {resourceFetchRequest, all} = this.props

      //always fetch new data!
      //if(!all.length){
        resourceFetchRequest("contestant_companies", true)
      //}
  }

 

  render(){

    const {children, ...rest} = this.props

    if(children){

      return children(rest)

    }

    return null
  }

}

ContestanCompanies.propTypes = {
  all: PropTypes.array.isRequired,
  keywords: PropTypes.array.isRequired,
  keyword : PropTypes.string
};

ContestanCompanies.defaultProps = {
   all : [],
   filtered : [],
   record : {},
   filter : null,
   keywords : [],
   keyword : null,
   keyword_source : "awards_category"
};

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        record : Selectors.SingleContestantCompaniesSelector(state, props),
        filtered : Selectors.FilteredByKeywordContestantCompanies(state, props),
        keywords : Selectors.ContestantCompaniesKeywordsSelector(state, props),
        all : Selectors.FilteredContestantCompanies(state, props),
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(ContestanCompanies)




