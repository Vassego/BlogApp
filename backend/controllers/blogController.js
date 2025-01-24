import { startSession } from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";

export async function getAllBlogsController(req, res) {
  try {
    const blogs = await blogModel.find({}).populate("user", "username"); // Populate user with username
    if (!blogs.length) {
      return res.status(200).send({
        success: false,
        message: "No Blogs Found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All Blogs lists",
      blogs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error While Getting Blogs",
      error: error.message,
    });
  }
}

export async function createBlogController(req, res) {
  const session = await startSession();
  session.startTransaction();
  try {
    const { title, description, image, user } = req.body;
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Provide All fields",
      });
    }
    const existingUser  = await userModel.findById(user).session(session);
    if (!existingUser ) {
      return res.status(404).send({
        success: false,
        message: "Unable to find user",
      });
    }

    const newBlog = new blogModel({ title, description, image, user });
    await newBlog.save({ session });
    existingUser .blogs.push(newBlog);
    await existingUser .save({ session });
    await session.commitTransaction();
    return res.status(201).send({
      success: true,
      message: "Blog Created!",
      newBlog,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error While Creating the blog",
      error: error.message,
    });
  } finally {
    session.endSession();
  }
}

export async function updateBlogController(req, res) {
  try {
    const { id } = req.params;
    const updatedBlog = await blogModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Blog has been updated!",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error While Updating Blog",
      error: error.message,
    });
  }
}

export async function getBlogByIdController(req, res) {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id).populate("user");
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Fetched single blog",
      blog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting single blog",
      error: error.message,
    });
  }
}

export async function deleteBlogController(req, res) {
  const session = await startSession();
  session.startTransaction();
  try {
    const blog = await blogModel.findByIdAndDelete(req.params.id).session(session);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }
    await userModel.findByIdAndUpdate(blog.user, { $pull: { blogs: blog._id } }, { session });
    await session.commitTransaction();
    return res.status(200).send({
      success: true,
      message: "Blog Deleted!",
    });
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error While Deleting the Blog",
      error: error.message,
    });
  } finally {
    session.endSession();
  }
}
export async function userBlogController(req, res) {
  try {
    const userBlog = await userModel.findById(req.params.id).populate({
      path: 'blogs',
      populate: {
        path: 'user', // Populate the user field in each blog
        select: 'username' // Only select the username field
      }
    });
    
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "Blogs not found with this id",
      });
    }
    
    return res.status(200).send({
      success: true,
      message: "User  blogs",
      userBlog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in user blog",
      error: error.message,
    });
  }
}