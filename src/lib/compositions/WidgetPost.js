import React from 'react';
import SingleRecord from "../datasources/SingleRecord"
import Wrapper from '../components/Wrapper'
// import CompanyData from '../components/CompanyData'
import CompanyLogotype from '../components/CompanyLogotype'
// import KeywordSelect from '../components/KeywordSelect'
import {TwoColsLayout, Centered} from '../components/MyLayouts'
import get from 'lodash/get'
import Markdown from '../components/Markdown'
import Alert from '../components/Alert'
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
    filter: 'url(#svgFilter)',
    backgroundPosition: "center right"
  },

  texts: {
    top: '20vh',
    left: '10vw',
    position: 'absolute',
  },

  headline: {
    color: "#ffffff",
  },

  quote: {
    color: "#ffffff",
    marginTop: '5vh',
    marginRight: '15vw'
  }

}))

const WidgetPost = ({id, wrapperProps}) => {

  const classes = useStyles();

  return (

<SingleRecord endpoint="posts" id={id}>{(post) => {
    
    const headline = get(post, "meta.headline", "")
    const quote = get(post, "meta.quote", "")
    const body = get(post, "meta.body", "")
    const published_at_year = get(post, "published_at", "").substring(0, 4)

    return (
    <React.Fragment>
       
       <SvgFilter />

      <Box className={classes.container}>

          <CardMedia image={post.cover} title="asd" className={classes.cover} />

          <Box className={classes.texts}>
          <Typography variant="h1" className={classes.headline} align="left">{headline}</Typography>
          <Typography variant="h3" className={classes.quote} align="left">{quote}</Typography>
          </Box>

       </Box>

            {/* <img src={post.cover} alt="" /> */}
           <Wrapper {...wrapperProps} >
            <TwoColsLayout
                leftSize={8}
                left={
                    <Wrapper first={false}>

                    {published_at_year < 2020 && <Alert type="error" label="alerts.content_is_old" />}

                    <Markdown children={body} rendererData={post} big={true} />
                    </Wrapper>
                }
                right={
                <>
                  <Box mt={5} mb={10}>
                     <CompanyLogotype company={post.company} />
                  </Box>
                  <DiscussionEmbed
                    shortname='fp20'
                    config={
                      {
                      //url: this.props.article.url,
                      identifier: `post${post.id}`,
                      title: headline,
                      language: 'pl_PL'
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
