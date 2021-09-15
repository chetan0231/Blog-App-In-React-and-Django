import React, { useEffect, useState } from "react";
import SecureAxios from "../config/SecureAxios";
import BlogCrud from "./BlogCrud";
import { Grid, Typography, Box, TextField, Button } from "@material-ui/core";

export default function MyBlogs(props) {
  const [myBlogs, setMyBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState(props.title);
  const [newBody, setNewBody] = useState(props.body);
  const user = localStorage.getItem('loggedIn')
  useEffect(() => {
    SecureAxios({
      method: "GET",
      url: `/blogApi/blogAuthor/${localStorage.id}`,
      headers: {
        Authorization: "Bearer " + localStorage.accessToken,
      },
    })
      .then((res) => res.data)
      .then((data) => setMyBlogs(data));
  }, []);

  const handleCreateBlog = () => {
    SecureAxios({
      method: "POST",
      url: "/blogApi/blogCrud/",
      headers: {
        Authorization: "Bearer " + localStorage.accessToken,
      },
      data: {
        id: String(props.id),
        title: newTitle,
        body: newBody,
        author: localStorage.id,
      },
    }).then((res) => console.log(res.data));
    window.location.reload();
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {myBlogs.map((item, ind) => {
            return (
              <div key={ind} style={{ marginLeft: "10%", marginTop: "5%" }}>
                <BlogCrud title={item.title} body={item.body} id={item.id} />
              </div>
            );
          })}
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" justifyContent="flex-end" mr={8} mt={5}>
            <Box component="div">
              <Box component="div" display="flex" justifyContent="center">
                <Typography variant="h6">Create a Post</Typography>
              </Box>
              <Box component="div" mb={3}>
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  margin="dense"
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                  }}
                />
              </Box>
              <Box component="div">
                <TextField
                  id="outlined-basic"
                  label="Body"
                  variant="outlined"
                  multiline="True"
                  maxRows="20"
                  minRows="10"
                  size="medium"
                  onChange={(e) => {
                    setNewBody(e.target.value);
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
                  variant="contained"
                  onClick={() => {
                    handleCreateBlog();
                  }}
                >
                  POST
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
