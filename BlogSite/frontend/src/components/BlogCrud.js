import React, { useEffect, useState } from "react";
import SecureAxios from "../config/SecureAxios";
import {
  Button,
  Card,
  TextField,
  CardContent,
  Typography,
  Box,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "520px",
  },
  title: {
    fontSize: 14,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "500px",
  },
  cover: {
    width: 250,
  },
});

export default function BlogCrud(props) {
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(props.title);
  const [updatedBody, setUpdatedBody] = useState(props.body);
  const classes = useStyles();
  const [open, setOpen] = useState(false);


  const handleDelete = () => {
    console.log("In Delete");
    SecureAxios({
      method: "DELETE",
      url: "/blogApi/deleteBlog/",
      headers: {
        Authorization: "Bearer " + localStorage.accessToken,
      },
      data: {
        id: String(props.id),
        title: props.title,
        body: props.body,
      },
    }).then((res) => res.data);

    setDeleteStatus(!setDeleteStatus);
    window.location.reload();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    SecureAxios({
      method: "PUT",
      url: "/blogApi/blogCrud/",
      headers: {
        Authorization: "Bearer " + localStorage.accessToken,
      },
      data: {
        id: String(props.id),
        title: updatedTitle,
        body: updatedBody,
        author: localStorage.id,
      },
    }).then((res) => console.log(res.data));
    window.location.reload();
  };

  return (
    <div>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent>
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
            <Box component="div" mt={5}>
              <Box component="span" mr={2}>
                <Button
                  on
                  variant="outlined"
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  delete
                </Button>
              </Box>
              <Box component="span">
                <Button variant="outlined" onClick={handleClickOpen}>
                  Edit
                </Button>
              </Box>
            </Box>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogContent>
                <Box component="div">
                  <Box component="div" display="flex" justifyContent="center">
                    <Typography variant="h6">Edit your post</Typography>
                  </Box>
                  <Box component="div" mb={3}>
                    <TextField
                      id="outlined-basic"
                      value={updatedTitle}
                      label="Title"
                      variant="outlined"
                      margin="dense"
                      onChange={(e) => {
                        setUpdatedTitle(e.target.value);
                      }}
                    />
                  </Box>
                  <Box component="div">
                    <TextField
                      id="outlined-basic"
                      value={updatedBody}
                      label="Body"
                      variant="outlined"
                      multiline="True"
                      maxRows="20"
                      minRows="10"
                      size="medium"
                      onChange={(e) => {
                        setUpdatedBody(e.target.value);
                      }}
                    />
                  </Box>
                  <Box
                    component="div"
                    display="flex"
                    justifyContent="center"
                    mt={3}
                  >
                    <Button
                      onClick={() => {
                        handleUpdate();
                      }}
                    >
                      Save Changes
                    </Button>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                    </DialogActions>
                  </Box>
                </Box>
              </DialogContent>
            </Dialog>
          </CardContent>
        </div>
        <CardMedia
          className={classes.cover}
          component="img"
          image="https://source.unsplash.com/1600x900/?technology,technews,sci-fi"
          title="blog"
        />
      </Card>
    </div>
  );
}
