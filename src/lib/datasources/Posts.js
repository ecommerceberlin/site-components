import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import {MobileAwarePostsSelector, MobileAwareFeaturedPostsSelector} from './redux/posts'
import {resourceFetchRequest } from '../components/redux'

class Posts extends React.PureComponent {

  componentDidMount(){

      const {resourceFetchRequest, all} = this.props

      resourceFetchRequest(["posts"])

      /**
       * {
        resource: "posts",
        params: {
          company_id: 1216
        }
      }
       */
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
        all : MobileAwarePostsSelector(state, props),
        featured: MobileAwareFeaturedPostsSelector(state, props)
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(Posts)
