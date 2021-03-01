import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import {useRouter} from 'next/router'
// import {slug} from '../helpers'
import {useTranslate} from '../i18n'
import get from 'lodash/get'
import cn from 'classnames'
import isFunction from 'lodash/isFunction'

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
  transparent: {
    backgroundColor: "transparent",
  },

  container: {
    display: 'flex',
    padding: 10,
    justify: "center",
    alignItems: "center",
  },

  avatarContainer: {
    height: 100,
    width: 180,
  },

  avatarContainerFluid: {
    height: "80%",
    width: "80%",
    padding: "5%"
  },

  avatarImg: {
    objectFit: "contain",
    maxHeight: "80%",
    maxWidth: "80%",
  },


}));

function Publisher({id, logotype, fluid, transparent, link}) {

    const classes = useStyles();
    const router = useRouter();
    // const [translate] = useTranslate();

    return (

        <Card className={cn(
          classes.root, 
          {
            [classes.transparent]: transparent
          }
          )} elevation={0}>
        <CardActionArea 
            className={classes.container} 
            href={link}
            onClick={link ? () => router.push(link): null }
        > 
         <Avatar variant="square" src={logotype} classes={{
           root: fluid? classes.avatarContainerFluid: classes.avatarContainer,
           img: classes.avatarImg
         }}/>
        </CardActionArea>
      </Card>
    )

}

Publisher.defaultProps = {
    id: 0,
    logotype: "",
    fluid: false,
    transparent: false,
    link: null
}

export default Publisher