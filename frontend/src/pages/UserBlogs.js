import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      } else {
        setError("Failed to fetch user blogs."); // Handle case where success is false
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while fetching your blogs."); // Set error message
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    getUserBlogs(); // Fetch user blogs when the component mounts
  }, []);

  return (
    <div>
      {loading ? ( // Show loading message while fetching
        <p className="displaying-texts">Loading...</p>
      ) : error ? ( // Show error message if there was an error
        <p className="displaying-texts" style={{ color: "red" }}>
          {error}
        </p>
      ) : blogs.length > 0 ? ( // Check if user blogs exist
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
        <h1 className="message">You Haven't Created a Blog</h1> // Message if no blogs exist
      )}
    </div>
  );
};

export default UserBlogs;