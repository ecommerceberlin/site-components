import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Companies from '../datasources/Companies'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {slug} from '../helpers'
import take from 'lodash/take'
import {useTranslate} from '../i18n'
import CompanyLogotype from '../components/CompanyLogotype'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 700,
    minWidth: 200,
    marginBottom: 10,
    [theme.breakpoints.up('sm')]: {
      maxWidth: 700,
    },
    
    backgroundColor: "#fff",
    
  },

  container: {
    display: 'flex',
    padding: 10,

    justify: "center",
    alignItems: "center",


    [theme.breakpoints.up('sm')]: {
      
    }
  },

  icons : {
    width: 200,
    [theme.breakpoints.up('sm')]: {
   
    },
    flexGrow: "1",
  },

  texts: {
    flexGrow: "3",
    [theme.breakpoints.up('sm')]: {
    
    }
  }
}));

function WidgetPublishers() {

    const classes = useStyles();
    const router = useRouter();
    const [translate] = useTranslate();

    return (
    
    <>

    <Typography  variant="h4" component="h3" >{translate("publishers")}</Typography>
    <Grid container>
    <Companies filter={(item)=>item.featured}>{(all) => take(all, 5).map(company => {
      return (
        <Grid item key={company.id} > 
        <Card className={classes.root} elevation={0}>
        <CardActionArea 
            className={classes.container} 
            onClick={() => router.push(`/publishers/${company.slug}`)}
        >  
         <CompanyLogotype company={company} tiny={true} />
        </CardActionArea>
     
      </Card>
      </Grid>
      )
    })
  }</Companies></Grid></>);
}


export default WidgetPublishers