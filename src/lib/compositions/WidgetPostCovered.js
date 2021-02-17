import React from 'react';
import Wrapper from '../components/Wrapper'
import {TwoColsLayout} from '../components/MyLayouts'
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

const WidgetPost = ({id, wrapperProps, headline, cover, quote, publisher, content, isOld, other}) => {

  const classes = useStyles();

  return (
    <React.Fragment>
    
      <SvgFilter />

      {cover && <Box className={classes.container}>
    
          <CardMedia image={cover} title="" className={classes.cover} />

          <Box className={classes.texts}>
          <Typography variant="h1" className={classes.headline} align="left">{headline}</Typography>
          {!isOld && <Typography variant="h3" className={classes.quote} align="left">{quote}</Typography>}
          </Box>

       </Box>}
       
           <Wrapper {...wrapperProps} >
            <TwoColsLayout
                leftSize={8}
                left={
                    <>
                    <Wrapper first={false}>
                    {content}
                    </Wrapper>
                    
                    {other}
                    </>
                }
                right={
                <>
                  {publisher}
                  <DiscussionEmbed
                    shortname='fp20'
                    config={
                      {
                      //url: this.props.article.url,
                      identifier: `post${id}`,
                      title: headline,
                      language: 'pl_PL'
                      }
                    }
                  />
                </>}
            />
        </Wrapper>
    </React.Fragment>)
}


export default WidgetPost
