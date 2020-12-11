import React from 'react';
import SingleRecord from "../datasources/SingleRecord"
import Wrapper from '../components/Wrapper'
// import CompanyData from '../components/CompanyData'
import CompanyLogotype from '../components/CompanyLogotype'
// import KeywordSelect from '../components/KeywordSelect'
import {TwoColsLayout, Centered} from '../components/MyLayouts'
import get from 'lodash/get'
import Markdown from '../components/Markdown'
import CardMedia from '@material-ui/core/CardMedia';
import { DiscussionEmbed } from 'disqus-react';
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import SvgFilter from '../components/svg/Black'
import Box from '@material-ui/core/Box';


const useStyles = makeStyles(theme => ({

  container: {
    position: 'relative'
  },

  cover: {
    width: '100vw',
    height: '100vh',
    filter: 'url(#svgFilter)'
  },

  headline: {
    color: "#ffffff",
    top: '20vh',
    left: '10vw',
    paddingRight: '5vw',
    position: 'absolute',

  }
}))

const WidgetPost = ({id, wrapperProps}) => {

  const classes = useStyles();

  return (

<SingleRecord endpoint="posts" id={id}>{(post) => {
    
    const headline = get(post, "meta.headline", "")
    const body = get(post, "meta.body", "")

    return (
    <React.Fragment>


       <SvgFilter />
      

      <Box className={classes.container}>
       <CardMedia image={post.cover} title="asd" className={classes.cover} />
          <Typography variant="h1" className={classes.headline} align="left">{headline}</Typography>
       </Box>


            {/* <img src={post.cover} alt="" /> */}
           <Wrapper {...wrapperProps} >
            <TwoColsLayout
                leftSize={8}
                left={
                    <Wrapper first={false}>
                    <Markdown children={body} rendererData={post} />
                    </Wrapper>
                }
                right={
                <>
                  <CompanyLogotype company={post.company} />
                  <DiscussionEmbed
                    shortname='fp20'
                    config={
                      {
                      //url: this.props.article.url,
                      identifier: `post${post.id}`,
                      title: headline,
                      language: 'pl_PL' //e.g. for Traditional Chinese (Taiwan)	
                      }
                    }
                  />
                </>}
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
