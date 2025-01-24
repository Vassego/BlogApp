import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      } else {
        setError("Failed to fetch user blogs."); 
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while fetching your blogs."); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div>
      {loading ? ( 
        <p className="displaying-texts">Loading...</p>
      ) : error ? ( 
        <p className="displaying-texts" style={{ color: "red" }}>
          {error}
        </p>
      ) : blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            isUser ={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user?.username || "Anonymous"}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1 className="message">You Haven't Created a Blog</h1> 
      )}
    </div>
  );
};

export default UserBlogs;