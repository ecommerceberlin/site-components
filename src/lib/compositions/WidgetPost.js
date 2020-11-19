
import React from 'react';
import SingleRecord from "../datasources/SingleRecord"
import Wrapper from '../components/Wrapper'
// import CompanyData from '../components/CompanyData'
import CompanyLogotype from '../components/CompanyLogotype'
// import KeywordSelect from '../components/KeywordSelect'
import {TwoColsLayout, Centered} from '../components/MyLayouts'
import get from 'lodash/get'
import Markdown from '../components/Markdown'



const WidgetPost = ({id, wrapperProps}) => {

  return (

<SingleRecord endpoint="posts" id={id}>{(post) => {
    
    const headline = get(post, "meta.headline", "")
    const body = get(post, "meta.body", "")

    return (
    <React.Fragment>
           <Wrapper {...wrapperProps} >
            <TwoColsLayout
                leftSize={8}
                left={
                    <Wrapper first={false} title={headline}>
                    <Markdown children={body} rendererData={post} />
                    </Wrapper>
                }
                right={
                <CompanyLogotype company={post.company} />
                }
            />
        </Wrapper>
    </React.Fragment>)}
  }
  </SingleRecord>)

}


WidgetPost.defaultProps = {
  id: 0,
  wrapperProps: {
    first: false,
    color: "transparent"
  }
}


export default WidgetPost
