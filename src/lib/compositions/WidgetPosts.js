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

const useStyles = makeStyles({
  root: {
    maxWidth: 550,
  },
});

function WidgetPosts() {

    const classes = useStyles();

    return (<Posts>{({all}) => all.map(post => (

    <Card key={post.id} className={classes.root} elevation={0}>
    <CardActionArea>

      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="140"
        image={`https://ehandel.com.pl/${post.cover}`}
        title="Contemplative Reptile"
      />
      <CardContent>
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

  ))
  }</Posts>);
}


export default WidgetPosts