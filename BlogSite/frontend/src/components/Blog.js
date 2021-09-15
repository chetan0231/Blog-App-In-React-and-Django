import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Card,CardContent,CardMedia,Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height : "250px",
    width : "80%"
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    width : '520px'
  },
  cover: {
    width: 250,
  },
}));

export default function Blog(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            <h2>{props.title}</h2>
          </Typography>
          <Typography variant="body2" component="p">
            {props.body}
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        alt="blog image"
        className={classes.cover}
        component="img"
        image="https://source.unsplash.com/1600x900/?technology,technews,sci-fi"
        title="blog images"
      />
    </Card>
  );
}
