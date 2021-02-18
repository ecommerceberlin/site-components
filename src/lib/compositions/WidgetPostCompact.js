import React from 'react';
import Wrapper from '../components/Wrapper'
import {TwoColsLayout, Centered} from '../components/MyLayouts'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { DiscussionEmbed } from 'disqus-react';


const useStyles = makeStyles(theme => ({

  headline_when_short: {

  },

  quote: {
    color: "#ffffff",
    marginTop: '5vh',
    marginRight: '15vw'
  }

}))

const WidgetPostCompact = ({wrapperProps, id, headline, content, publisher, other}) => {

  const classes = useStyles();

  return (<Wrapper {...wrapperProps} >
    <TwoColsLayout
        leftSize={8}
        left={
            <Wrapper first={false}>
            <Typography variant="h2" className={classes.headline_when_short} align="left">{headline}</Typography>
            {content}
            {other}

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

            </Wrapper>
    
        }
        right={publisher}
    />
  </Wrapper>)

}

export default WidgetPostCompact
