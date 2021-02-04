import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import {MobileAwarePostsSelector, MobileAwareFeaturedPostsSelector} from './redux/posts'
import {resourceFetchRequest } from '../components/redux'

class Posts extends React.PureComponent {

  componentDidMount(){

      const {resourceFetchRequest, author} = this.props

      resourceFetchRequest(["posts"])

      if(author){
        resourceFetchRequest([{
          resource: "posts",
          params: "author=targiehandlupl"
        }])
      }


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



Posts.defaultProps = {
  author: null
}

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        all : MobileAwarePostsSelector(state, props),
        featured: MobileAwareFeaturedPostsSelector(state, props),
        filtered: MobileAwarePostsSelector(state, props)
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(Posts)
