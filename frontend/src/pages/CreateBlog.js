import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={"48%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.6)"} 
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
          backgroundColor="#2e2e3e" 
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="#f8c8dc"
          >
            Create your Blog
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold", color: "#f2e7fe" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                backgroundColor: "#2e2e3e",
                borderColor: "#8d38f5", 
                color: "#f2e7fe", 
              },
              "& .MuiInputLabel-root": {
                color: "#f2e7fe", 
                fontWeight: "bold",
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                borderColor: "#caa0f5", 
              },
            }}
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold", color: "#f2e7fe" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                backgroundColor: "#2e2e3e",
                borderColor: "#8d38f5",
                color: "#f2e7fe",
              },
              "& .MuiInputLabel-root": {
                color: "#f2e7fe",
                fontWeight: "bold",
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                borderColor: "#caa0f5",
              },
            }}
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold", color: "#f2e7fe" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                backgroundColor: "#2e2e3e",
                borderColor: "#8d38f5",
                color: "#f2e7fe",
              },
              "& .MuiInputLabel-root": {
                color: "#f2e7fe",
                fontWeight: "bold",
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                borderColor: "#caa0f5",
              },
            }}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{
              borderRadius: "20px",
              padding: "10px 20px",
              fontWeight: "bold",
              marginTop: "20px",
              backgroundColor: "#8d38f5", 
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#caa0f5", 
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
