import React, { useEffect, useState } from "react";
import SecureAxios from "../config/SecureAxios";
import Blog from "./Blog";

export default function MyBlogs(props) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    SecureAxios({
      method: "GET",
      url: "/blogApi/allblogs/",
    })
      .then((res) => res.data)

      .then((data) => setBlogs(data));
  }, []);

  return (
    <div>
      <div>
        {blogs.map((item) => {
          return (
            <div style={{ marginLeft: "10%", marginTop: "5%" }}>
              <Blog title={item.title} body={item.body} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
