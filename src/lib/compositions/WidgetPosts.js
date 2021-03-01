import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CachableDatasource from '../datasources/CachableDatasource'
// import Link from 'next/link'
import {useRouter} from 'next/router'
import {slug} from '../helpers'
import {useTranslate} from '../i18n'
import get from 'lodash/get'
import PostCard from '../components/PostCard'
import nth from 'lodash/nth'


function WidgetPosts({company, page, label, insert, insertPos}) {

    const [translate] = useTranslate();

    return (
    <>
    <Typography  variant="h4" component="h3" >{translate(label)}</Typography>

    <CachableDatasource queries={{
      all: {
        resource: "posts",
        params: { page: page}
      },
      filtered: {
        resource: "posts",
        params: { company: company}
      }
    }}>{({all, filtered}) => {

      const arr = (company? filtered: all);
      const insertPlace = get(nth(arr, insertPos), "id");

      return arr.map(post => {

        const id = get(post, 'id')
  
        if(!id){
          return null;
        }
  
        const headline = get(post, "meta.headline", "");
        const _quote = get(post, "meta.quote", "");
        const body = get(post, "meta.body", "")
  
        const published_at_year = get(post, "published_at", "").substring(0, 4);
  
        let quote;
  
        if(_quote.length > 10 && published_at_year > 2018){
          quote = _quote
        }else{
          quote = body.substr(0, 200).replace(/(\*|#|!?\[[^\]]*\]\([^\)]+\))/gm, "");
        }
  
        return <>{(!company && insert && insertPlace == id) && insert}<PostCard key={id} id={id} headline={headline} quote={quote}/></>
  
      })

    }}
  </CachableDatasource></>);
}

WidgetPosts.defaultProps = {
  label: "posts.latest",
  company: null,
  page: 1,
  insert : null,
  insertPos: 4
}

export default WidgetPosts