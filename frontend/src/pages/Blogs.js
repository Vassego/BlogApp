import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      } else {
        setError("Failed to fetch blogs."); 
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while fetching blogs."); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getAllBlogs();
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
            key={blog?._id}
            id={blog?._id}
            isUser ={localStorage.getItem("userId") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <p className="displaying-texts">No blogs exist.</p> 
      )}
    </div>
  );
};

export default Blogs;