import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import * as Selectors from './redux/contestantcompaniesall'
import { resourceFetchRequest } from '../components/redux'

class ContestantCompaniesArchive extends React.Component {

  componentDidMount(){

      const {resourceFetchRequest, all} = this.props

      //always fetch new data!
      //if(!all.length){
        resourceFetchRequest("contestant_companies_all", true)
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

ContestantCompaniesArchive.propTypes = {
  all: PropTypes.array.isRequired,
  keywords: PropTypes.array.isRequired,
  keyword : PropTypes.string
};

ContestantCompaniesArchive.defaultProps = {
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
        filtered : Selectors.FilteredByKeywordContestantCompaniesAll(state, props),
        keywords : Selectors.ContestantCompaniesAllKeywordsSelector(state, props),
        all : Selectors.FilteredContestantCompaniesAll(state, props),
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(ContestantCompaniesArchive)




