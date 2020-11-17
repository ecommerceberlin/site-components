import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Posts from '../datasources/Posts'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {slug} from '../helpers'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 700,
    marginBottom: 10,
    [theme.breakpoints.up('sm')]: {
      maxWidth: 700,
    },
    padding: 10,
    backgroundColor: "#fff"
  },

  container: {
    display: 'flex',

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

function WidgetPosts() {

    const classes = useStyles();
    const router = useRouter();

    return (<Posts>{({all}) => all.map(post => {
      return (

        <Card key={post.id} className={classes.root} elevation={0}>
        <CardActionArea className={classes.container} onClick={() => router.push(`/${slug(post.meta.headline)},${post.id}`)}>
    
          <div className={classes.icons}>
            FIRMA<br/>
            IKONKI
          </div>
          <CardContent className={classes.texts}>
            <Typography gutterBottom variant="h5" component="h2">
              {post.meta.headline}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
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
  }</Posts>);
}


export default WidgetPosts