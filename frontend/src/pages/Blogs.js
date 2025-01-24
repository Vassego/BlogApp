import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      } else {
        setError("Failed to fetch blogs."); // Handle case where success is false
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while fetching blogs."); // Set error message
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      {loading ? ( // Show loading message while fetching
        <p className="displaying-texts">Loading...</p>
      ) : error ? ( // Show error message if there was an error
        <p className="displaying-texts" style={{ color: "red" }}>
          {error}
        </p>
      ) : blogs.length > 0 ? ( // Check if blogs exist
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