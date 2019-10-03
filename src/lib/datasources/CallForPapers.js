import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import * as Selectors from './redux/callforpapers'
import { resourceFetchRequest } from '../components/redux'

// import { getCompanyProfileInfo, filterCompanyInstances } from '../helpers';

class CallForPapers extends React.Component {

  componentDidMount(){

      const {resourceFetchRequest, all} = this.props

      //always fetch new data!
      //if(!all.length){
        resourceFetchRequest("callforpapers", true)
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

CallForPapers.propTypes = {
  all: PropTypes.array.isRequired,
  keywords: PropTypes.array.isRequired,
  keyword : PropTypes.string
};

CallForPapers.defaultProps = {
   all : [],
   filtered : [],
   record : {},
   filter : null,
   keywords : [],
   keyword : null,
   keyword_source : "presentation_category"
};

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        record : Selectors.SingleCallForPaperSelector(state, props),
        filtered : Selectors.FilteredByKeywordCallForPapers(state, props),
        keywords : Selectors.CallForPapersKeywordsSelector(state, props),
        all : Selectors.FilteredCallForPapers(state, props),
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(CallForPapers)




