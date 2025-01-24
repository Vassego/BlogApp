import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
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
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success("User  Registered Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Registration failed. Please try again.");
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
        boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.6)"} 
        display="flex"
        flexDirection={"column"}
        backgroundColor="#2e2e3e" 
      >
        <Typography
          variant="h2"
          textAlign={"center"}
          fontWeight="bold"
          padding={3}
          color="#f8c8dc"
        >
          Register
        </Typography>
        <TextField
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
          name="name"
          margin="normal"
          type={"text"}
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
            width: "100%", 
          }}
        />
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
            width: "100%", 
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
            width: "100%", 
          }}
        />

        <Button
          type="submit"
          sx={{
            borderRadius: "20px",
            marginTop: "20px",
            backgroundColor: "#8d38f5", 
            color: "#ffffff", 
            "&:hover": {
              backgroundColor: "#caa0f5",
            },
          }}
          variant="contained"
        >
          Submit
        </Button>
        <Button
          onClick={() => navigate("/login")}
          sx={{
            borderRadius: "20px",
            marginTop: "20px",
            color: "#f2e7fe",
          }}
        >
          Already Registered? Please Login
        </Button>
      </Box>
    </form>
  );
};

export default Register;