import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CachableDatasource from '../datasources/CachableDatasource'
import {useRouter} from 'next/router'
import {slug} from '../helpers'
import {useTranslate} from '../i18n'
import get from 'lodash/get'
import Wrapper from '../components/Wrapper'

const useStyles = makeStyles(theme => ({
  root: {
    // maxWidth: 700,
    // marginBottom: 10,
    [theme.breakpoints.up('sm')]: {
      // maxWidth: 700,
    },
    
   
  },

  container: {
    // display: 'flex',
    // padding: 10,
    // [theme.breakpoints.up('sm')]: {
    
    //   flexDirection: 'row',
    //   justifyContent: 'space-around',
    //   alignItems: 'baseline'
    // }
  },

//   icons : {
//     width: 300,
//     [theme.breakpoints.up('sm')]: {
   
//     },
//     flex: "1 0 100px",
//   },

  texts: {
    // flex: "3 0 300px",
    // [theme.breakpoints.up('sm')]: {
    
    // }
  }
}));

function WidgetPostsByAuthor({except, company_id, page, label}) {

    const classes = useStyles();
    const router = useRouter();
    const [translate] = useTranslate();

    return (
 <CachableDatasource queries={{
      bycompany: {
        resource: "posts",
        params: { 
            company_id: company_id,
            page: page
        },
        filters: {
            limit: 6
        }
      },
    }}>{({bycompany}) => {
        
        const filtered = bycompany.filter(post => post.id != except)

        if(!filtered.length){
            return null
        }

        return <Wrapper first={false}>
        
          <Typography  variant="h4" component="h3" >{translate(label)}</Typography>
          
          <Box>{filtered.map(post => {

            const id = get(post, 'id')
            const headline = get(post, "meta.headline");
            
            if(!id){
                return null;
            }

              
            return (
      
              <Card key={id} className={classes.root} elevation={0}>
              <CardActionArea className={classes.container} onClick={() => router.push(`/${slug(headline)},${id}`)}>
                <CardContent className={classes.texts}>
                  <Typography gutterBottom variant="h6" component="h6">
                    {headline}
                  </Typography>
                </CardContent>
              </CardActionArea>
          
            </Card>
          
            )
          })}</Box></Wrapper>
    }
  }</CachableDatasource>);
}

WidgetPostsByAuthor.defaultProps = {
  label: "posts.other",
  company_id: null,
  page: 1,
  except: null
}

export default WidgetPostsByAuthor