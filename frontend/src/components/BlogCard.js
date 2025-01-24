import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function BlogCard({ title, description, image, time, id, isUser , username }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      sx={{
        width: "50%",
        margin: "auto",
        mt: 2,
        padding: 2,
        borderRadius: "10px",
        backgroundColor: "#2e2e3e", // Dark background for the card
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.6)", // Darker shadow
        ":hover": {
          boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.8)", // Darker hover effect
        },
      }}
    >
      {isUser  && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto", color: "#8d38f5" }}>
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={handleDelete} sx={{ color: "#f8c8dc" }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          // Avatar without username, showing default letter "A"
          <Avatar sx={{ bgcolor: red[500], color: "#fff" }} aria-label="recipe">
            {username ? username.charAt(0).toUpperCase() : "A"} {/* Display first letter of username */}
          </Avatar>
        }
        title={<Typography variant="h6" color="#f8c8dc">{username || "Anonymous"}</Typography>} // Displaying username or "Anonymous"
        subheader={<Typography variant="body2" color="#f2e7fe">{time}</Typography>}
        sx={{
          backgroundColor: "#3d3d5c", // Darker background for header
          borderRadius: "5px",
          padding: "10px",
        }}
      />
      <CardMedia component="img" height="200" image={image} alt="Blog image" sx={{ borderRadius: "5px" }} />
      <CardContent sx={{ padding: "10px", color: "#e0e0e0" }}>
        <Typography variant="h6" color="#f8c8dc"> {/* Soft pink for the title */}
          Title: {title}
        </Typography>
        <Typography variant="body2" color="#e0e0e0">
          Description: {description}
        </Typography>
      </CardContent>
    </Card>
  );
}