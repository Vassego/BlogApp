import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store.js";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // State
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User  login Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        width={"44%"}
        border={3}
        borderRadius={10}
        padding={3}
        margin="auto"
        marginTop="30px"
        boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.6)"} // Darker shadow
        display="flex"
        flexDirection={"column"}
        backgroundColor="#2e2e3e" // Darker background to match your theme
      >
        <Typography
          variant="h2"
          textAlign={"center"}
          fontWeight="bold"
          padding={3}
          color="#f8c8dc" // Light purple text for better contrast
        >
          Login
        </Typography>

        <TextField
          placeholder="Email"
          value={inputs.email}
          name="email"
          margin="normal"
          type={"email"}
          required
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              backgroundColor: "#2e2e3e",
              borderColor: "#8d38f5", // Purple border
              color: "#f2e7fe", // Light text color
            },
            "& .MuiInputLabel-root": {
              color: "#f2e7fe", // Light purple label
              fontWeight: "bold",
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              borderColor: "#caa0f5", // Lighter purple on focus
            },
            width: "100%", // Full width
          }}
        />
        <TextField
          placeholder="Password"
          value={inputs.password}
          name="password"
          margin="normal"
          type={"password"}
          required
          onChange={handleChange}
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
            width: "100%", // Full width
          }}
        />

        <Button
          type="submit"
          sx={{
            borderRadius: "20px",
            marginTop: "20px",
            backgroundColor: "#8d38f5", // Vibrant purple button
            color: "#ffffff", // White text
            "&:hover": {
              backgroundColor: "#caa0f5", // Lighter purple on hover
            },
          }}
          variant="contained"
        >
          Submit
        </Button>
        <Button
          onClick={() => navigate("/register")}
          sx={{
            borderRadius: "20px",
            marginTop: "20px",
            color: "#f2e7fe", // Light text color
          }} // Match button color
        >
          Not a user? Please Register
        </Button>
      </Box>
    </form>
  );
};

export default Login;