import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function VerticalTimeline({items}) {

  const classes = useStyles();

  return (
    <Timeline align="alternate">{
        items.map(({date, dotColor, dotVariant, title, description, icon, active}) => (

            <TimelineItem key={`${date}_${title}`}>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                {date}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color={dotColor} variant={dotVariant}>
                 {icon}
              </TimelineDot>
              <TimelineConnector className={active? classes.secondaryTail: ""} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  {title}
                </Typography>
                <Typography>{description}</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>

        ))
    }
     

    </Timeline>
  );
}

VerticalTimeline.defaultProps = {
    items: [

    ]
}

export default VerticalTimeline