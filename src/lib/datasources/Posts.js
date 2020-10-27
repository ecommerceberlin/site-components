import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import {MobileAwarePostsSelector} from './redux/posts'
import {resourceFetchRequest } from '../components/redux'

class Posts extends React.PureComponent {

  componentDidMount(){

      const {resourceFetchRequest, all} = this.props

      if(! all.length){
        resourceFetchRequest("posts")
      }
  }

  render(){
    const {children, ...rest} = this.props
    return children(rest)
  }

}

Posts.propTypes = {

};

Posts.defaultProps = {
    all : [],
};

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        all : MobileAwarePostsSelector(state, props)
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(Posts)
