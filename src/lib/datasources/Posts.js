import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import {
  MobileAwarePostsSelector, 
  MobileAwareFeaturedPostsSelector, 
  MobileAwareFilteredPostsSelector
} from './redux/posts'
import {resourceFetchRequest } from '../components/redux'

class Posts extends React.PureComponent {

  componentDidMount(){

      const {resourceFetchRequest, company} = this.props


      if(company){
        resourceFetchRequest([{
          resource: "posts",
          params: `company=${company}`
        }])
      }else{
        resourceFetchRequest(["posts"])
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
  company: null
}

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        all : MobileAwarePostsSelector(state, props),
        featured: MobileAwareFeaturedPostsSelector(state, props),
        filtered: MobileAwareFilteredPostsSelector(state, props)
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(Posts)
