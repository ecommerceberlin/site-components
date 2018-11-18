import React from 'react';
import PropTypes from 'prop-types';
import { map, get } from 'lodash';
import {connect} from 'react-redux'

import {MobileAwareFilteredExhibitors, ExhibitorKeywordsSelector, FilteredByKeywordExhibitors} from '../redux/selectors'
import {resourceFetchRequest } from '../components/redux'

// import { getCompanyProfileInfo, filterCompanyInstances } from '../helpers';

class Exhibitors extends React.Component {

  componentDidMount(){

      const {resourceFetchRequest, data} = this.props

      if(!data.length){
        resourceFetchRequest("exhibitors")
      }
  }

  // shouldComponentUpdate(nextProps){
  //
  //   const {data, keyword} = this.props
  //
  //   if(keyword !== nextProps.keyword){
  //     return true
  //   }
  //
  //   //at first 4 are returned...because of MOBILE first :)
  //
  //   const ids = data.map(a => a.id)
  //
  //   console.log(ids)
  //
  //   return false
  // }

  render(){

    const {children, data, keywords, filtered} = this.props

    if(children){

      return children(data, keywords, filtered)

    }

    return null
  }

}

Exhibitors.propTypes = {
  data: PropTypes.array.isRequired,
  keywords: PropTypes.array.isRequired,
  keyword : PropTypes.string
};

Exhibitors.defaultProps = {
  data : [],
  keywords : [],
  keyword : ""
};

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        data : MobileAwareFilteredExhibitors(state, props),
        keywords : ExhibitorKeywordsSelector(state, props),
        filtered : FilteredByKeywordExhibitors(state, props)
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(Exhibitors)
