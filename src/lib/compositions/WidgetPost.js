
import React from 'react';
import SingleRecord from "../datasources/SingleRecord"
import Wrapper from '../components/Wrapper'
import CompanyData from '../components/CompanyData'
import CompanyLogotype from '../components/CompanyLogotype'
// import KeywordSelect from '../components/KeywordSelect'
import {TwoColsLayout, Centered} from '../components/MyLayouts'
import get from 'lodash/get'
import Markdown from '../components/Markdown'

const WidgetPost = ({id}) => {

  return (

<SingleRecord endpoint="posts" id={id}>{(post) => {
    const body = get(post, "meta.body", "")
    return (
    <React.Fragment>
           <Wrapper first={true}>
            <TwoColsLayout
                leftSize={8}
                left={
                    <Wrapper first={false} title={post.headline}>
                    <Markdown>{body}</Markdown>
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
  id: 0
}


export default WidgetPost
