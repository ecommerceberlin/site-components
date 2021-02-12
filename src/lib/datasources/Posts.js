import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {resourceFetchRequest } from '../components/redux'
import {MatchListWithData} from '../redux/selectors'

class Posts extends React.PureComponent {

  componentDidMount(){

      const {resourceFetchRequest, queries} = this.props

      // resourceFetchRequest([{
      //   resource: "posts",
      //   params: params
      // }])
      
  }

  render(){

    const {children, results} = this.props

    return children(results)
  }

}

Posts.propTypes = {

};

Posts.defaultProps = {
    all : [],
};

Posts.defaultProps = {
  queries: {}
}

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        results: MatchListWithData(state, props)
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(Posts)
