import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Posts from '../datasources/Posts'
// import Link from 'next/link'
import {useRouter} from 'next/router'
import {slug} from '../helpers'
import {useTranslate} from '../i18n'
import get from 'lodash/get'

const useStyles = makeStyles(theme => ({
  root: {
    // maxWidth: 700,
    marginBottom: 10,
    [theme.breakpoints.up('sm')]: {
      // maxWidth: 700,
    },
    
    backgroundColor: "#fff"
  },

  container: {
    display: 'flex',
    padding: 10,
    [theme.breakpoints.up('sm')]: {
    
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'baseline'
    }
  },

  icons : {
    width: 300,
    [theme.breakpoints.up('sm')]: {
   
    },
    flex: "1 0 100px",
  },

  texts: {
    flex: "3 0 300px",
    [theme.breakpoints.up('sm')]: {
    
    }
  }
}));

function WidgetPosts({company, page, label}) {

    const classes = useStyles();
    const router = useRouter();
    const [translate] = useTranslate();

    return (
    <>
    <Typography  variant="h4" component="h3" >{translate(label)}</Typography>

    <Posts queries={{
      all: {
        resource: "posts",
        params: { page: page}
      },
      filtered: {
        resource: "posts",
        params: { company: company}
      }
    }}>{({all, filtered}) => (company? filtered: all).map(post => {

      const id = get(post, 'id')
      const quote = get(post, "meta.quote");
      const headline = get(post, "meta.headline");
      const published_at_year = get(post, "published_at", "").substring(0, 4);
      return (

        <Card key={post.id} className={classes.root} elevation={0}>
        <CardActionArea className={classes.container} onClick={() => router.push(`/${slug(headline)},${id}`)}>
          <div className={classes.icons}></div>
          <CardContent className={classes.texts}>
            <Typography gutterBottom variant="h5" component="h3">
              {headline}
            </Typography>
            {quote &&  published_at_year > 2018 && <Typography variant="body2" color="textSecondary" component="p">{quote}</Typography>}
          </CardContent>
        </CardActionArea>
     
        {/* <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
            <Link href="/publishers/[slug]" as="/publishers/targiehandlupl">
                <Button size="small" color="primary">
                {post.company.name}
                </Button>
            </Link>
        </CardActions> */}
      </Card>
    
      )
    })
  }</Posts></>);
}

WidgetPosts.defaultProps = {
  label: "posts.latest",
  company: null,
  page: 1
}

export default WidgetPosts