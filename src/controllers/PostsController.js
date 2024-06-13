// PostsController.js
import {
  createPosts,
  getAllPosts,
  deleteOnePosts,
  pending,
  approvePosts,
  rejectPosts,
  getone,
  updateOnePosts,
  createImagePosts,
  getevents,
  getblogs,
  getpics
  
  
} from "../services/PostsService";
import {
  getOneKorariByadmin,
} from "../services/korariService";
import {getUserEmployees} from "../services/userService";
import Email from "../utils/mailer";
import { upload } from '../utils/cloudinaryConfig';
import imageUploader from "../helper/imageUplouder";



export const addPostsController = async (req, res) => {
  try {
    let korari;
    console.log(req.user.id)
    if (req.user.role === "user") {
      korari = await getOneKorariByadmin(req.user.id);
      if (!korari) {
        return res.status(404).json({
          success: false,
          message: "Korari not found for the given admin",
        });
      }
      console.log(korari[0].id)

      req.body.korariId = parseInt(korari[0].id);
    }

    req.body.userid = req.user.id;

    const currentDate = new Date();
    const hours = currentDate.getHours();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12) || 12;
    const formattedMinutes = currentDate.getMinutes().toString().padStart(2, '0');
    const formattedSeconds = currentDate.getSeconds().toString().padStart(2, '0');

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    const date = `${year}-${month}-${day}`;
    const time = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amOrPm}`;
    req.body.date = date;
    req.body.time = time;

    if (req.body.type !== 'blog' && req.body.type !== 'event' && req.body.type !== 'pic') {
      return res.status(400).json({
        success: false,
        message: "post must be event or blog or pic",
      });
    }

    let image; 
    if (req.files && req.files.file) { 
      image = await imageUploader(req);
     if (!image || !image.url) {
     
       throw new Error('Upload failed or image URL missing');
     }
   }
     req.body.file = image.url;

    if (req.body.type === 'event' || req.body.type === 'blog') {
      if (!req.body.title || !req.body.description) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
    }

    req.body.status = "active";
    let newPosts;

    if (req.body.type === 'pic') {
      newPosts = await createPosts(req.body);
    } else {
      newPosts = await createPosts(req.body);
    }

    return res.status(201).json({
      success: true,
      message: "New post created successfully",
      post: newPosts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


export const updatePostsController = async (req, res) => {
  try {
    let korari;
    console.log(req.user.id)
    if (req.user.role === "user") {
      korari = await getOneKorariByadmin(req.user.id);
      if (!korari) {
        return res.status(404).json({
          success: false,
          message: "Korari not found for the given admin",
        });
      }
      console.log(korari[0].id)

      req.body.korariId = parseInt(korari[0].id);
    }

    req.body.userid = req.user.id;

    const currentDate = new Date();
    const hours = currentDate.getHours();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12) || 12;
    const formattedMinutes = currentDate.getMinutes().toString().padStart(2, '0');
    const formattedSeconds = currentDate.getSeconds().toString().padStart(2, '0');

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    const date = `${year}-${month}-${day}`;
    const time = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amOrPm}`;
    req.body.date = date;
    req.body.time = time;

    if (req.body.type !== 'blog' && req.body.type !== 'event' && req.body.type !== 'pic') {
      return res.status(400).json({
        success: false,
        message: "post must be event or blog or pic",
      });
    }

    let image; 
    if (req.files && req.files.file) { 
      image = await imageUploader(req);
     if (!image || !image.url) {
     
       throw new Error('Upload failed or image URL missing');
     }
   }
     req.body.file = image.url;

    if (req.body.type === 'event' || req.body.type === 'blog') {
      if (!req.body.title || !req.body.description) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
    }

    req.body.status = "active";
    let newPosts;

 
      newPosts = await updateOnePosts(req.params.id,req.body);
    

    return res.status(201).json({
      success: true,
      message: " post updated successfully",
      post: newPosts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


export const deleteOnePostsController = async (req, res) => {
  try {
    // if (req.user.role !== "customer") {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Not authorized, you are not  customer",
    //   });
    // }


    let data = await getone(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    }

    const Posts = await deleteOnePosts(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Posts deleted successfully",
      Posts:Posts,

    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};


export const Events = async (req, res) => {
  try {


    let data = await getevents();
    // data = allPosts;
    // let data;

    // if (req.user.role == "employee" || req.user.role == "superadmin") {

    //   data = allPosts;
    // }
    // if (req.user.role === "customer") {

    //   data = allPosts.filter(Posts => Posts.userid === req.user.id);
    // }




    return res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const Blogs = async (req, res) => {
  try {


    let data = await getblogs();
    // data = allPosts;
    // let data;

    // if (req.user.role == "employee" || req.user.role == "superadmin") {

    //   data = allPosts;
    // }
    // if (req.user.role === "customer") {

    //   data = allPosts.filter(Posts => Posts.userid === req.user.id);
    // }




    return res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const Pics = async (req, res) => {
  try {


    let data = await getpics();
    // data = allPosts;
    // let data;

    // if (req.user.role == "employee" || req.user.role == "superadmin") {

    //   data = allPosts;
    // }
    // if (req.user.role === "customer") {

    //   data = allPosts.filter(Posts => Posts.userid === req.user.id);
    // }




    return res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};


export const Posts = async (req, res) => {
  try {


    let data = await getAllPosts();
    // data = allPosts;
    // let data;

    // if (req.user.role == "employee" || req.user.role == "superadmin") {

    //   data = allPosts;
    // }
    // if (req.user.role === "customer") {

    //   data = allPosts.filter(Posts => Posts.userid === req.user.id);
    // }




    return res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const pendingController = async (req, res) => {
  try {


    let allPosts = await pending();
    let data;

    if (req.user.role == "employee" || req.user.role == "superadmin") {

      data = allPosts;
    }
    if (req.user.role === "customer") {
      data = allPosts.filter(Posts => Posts.userid === req.user.id);
    }
    return res.status(200).json({
      success: true,
      message: "pending Posts retrieved successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const getOnePostsController = async (req, res) => {


  try {
    // const { id } = req.params;
    let data = await getone(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "Posts not found",
      });
    }
    console.log(req.params.id)

  
    return res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      data,
    });
  } catch (error) {

    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};


// 0725998330
