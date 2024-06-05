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
  ckeckPosts,
  unckeckPosts,
  createImagePosts,
  getevents,
  getblogs,
  getpics
  
  
} from "../services/PostsService";
import {getUserEmployees} from "../services/userService";
import Email from "../utils/mailer";
import { upload } from '../utils/cloudinaryConfig';
import imageUploader from "../helper/imageUplouder";
// import imageUploader from "../helper/imageUploader";

export const uploadPdf = async (req, res) => {
  try {
    console.log('Request received for file upload');

    if (req.user.role !== "customer") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  customer",
      });
    }
    // const { id } = req.params;
    console.log(req.params.id)
    // let data = await getone(id);
    // if (!data) {
    //   return res.status(404).json({
    //     message: "Posts not found",
    //   });
    // }
    if (req.files && req.files.file) { // Ensure req.files.file exists
      console.log('File received:', req.files.file);
      const image = await imageUploader(req);
      if (!image || !image.url) {
      
        throw new Error('Upload failed or image URL missing');
      }
      req.body.file = image.url;
      console.log(req.params.id,req.body)
      req.body.status = 'rib-approved';
      const updatedPosts = await updateOnePosts(req.params.id,req.body);

      return res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        updatedPosts,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
  } catch (error) {
    console.error('Error during file upload:', error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};



export const addPostsController = async (req, res) => {
  try {

    req.body.userid = req.user.id
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

    if (req.body.type!=='blog' &&  req.body.type!=='event'  &&  req.body.type!=='pic') {
      return res.status(400).json({
        success: false,
        message: "post must be event or blog or pic",
      });
    }

    let image; // Declare the image variable in the outer scope


    if (req.files && req.files.file) { // Ensure req.files.file exists
      console.log('File received:', req.files.file);
       image = await imageUploader(req);
      if (!image || !image.url) {
      
        throw new Error('Upload failed or image URL missing');
      }
    }
      req.body.file = image.url;

      if(req.body.type==='event' || req.body.type==='blog'){
        if (!req.body.title ||  !req.body.description) {
          return res.status(400).json({
            success: false,
            message: "all field is required",
          });
        }

      }

   
   

   
    req.body.status = "active";
    let newPosts;

    if(req.body.type=='pic'){

       newPosts = await createImagePosts(req.body);

    }
       newPosts = await createPosts(req.body);
  
    // const email = new Email(req.user, newPosts);
    // await email.sendPostsConfirmation();
    // console.log(approval);

    // if (approval && approval.length > 0) {
    //   approval.forEach(async (user) => {
    //     await new Email(user, newPosts).sendPostsNewRequest();
    //   });
    // }



    return res.status(201).json({
      success: true,
      message: "new Posts created successfully",
      Posts: newPosts,
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
    if (req.user.role !== "customer") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  customer",
      });
    }
    const data = await getone(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "Posts not found",
      });
    }

    if (data.status === "approved") {
      return res.status(404).json({
        success: false,
        message: "You are too late to update this Posts because it aready approved !",
      });
    }

    if (data.status === "rejected") {
      return res.status(404).json({
        success: false,
        message: "You are too late to update this Posts because it aready rejected !",
      });
    }

    req.body.userid = req.user.id
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
    // req.body.date = date;
    // req.body.time = time;


    if (!req.body.title ||  !req.body.description) {
      return res.status(400).json({
        success: false,
        message: "all field is required",
      });
    }
    // req.body.status = "pending";

    const updatedPosts = await updateOnePosts(req.params.id,req.body);


    return res.status(201).json({
      success: true,
      message: "Posts updated successfully",
      // Posts: updatedPosts,
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

export const approvePostsController = async (req, res) => {
  try {
    if (req.user.role !== "employee" && req.user.role !== "superadmin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  employee",
      });
    }

    const data = await getone(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "Posts not found",
      });
    }
    // req.body.status = "pending";
    const Posts = await approvePosts(req.params.id);
    // console.log(data);

    const email = new Email(data.PostsUser, data);
    await email.sendPostsApproval();

    return res.status(201).json({
      success: true,
      message: "Posts approved successfully",
      // Posts: Posts,

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


export const ckeckPostsController = async (req, res) => {
  try {
    if (req.user.role !== "employee" && req.user.role !== "superadmin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  employee",
      });
    }

    const data = await getone(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "Posts not found",
      });
    }
    // req.body.status = "pending";
    const Posts = await ckeckPosts(req.params.id);

    const email = new Email(data.PostsUser, data);
    await email.sendPostsCheckedApproval();

    return res.status(201).json({
      success: true,
      message: "Posts checked successfully now client can give it to RIB",
      // Posts: Posts,

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
export const unckeckPostsController = async (req, res) => {
  try {
    if (req.user.role !== "employee" && req.user.role !== "superadmin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  employee",
      });
    }

    const data = await getone(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "Posts not found",
      });
    }
    // req.body.status = "pending";
    const Posts = await unckeckPosts(req.params.id);

    const email = new Email(data.PostsUser, data);
    await email.sendPostsUnCheckedRejection();

    return res.status(201).json({
      success: true,
      message: "Posts un checked successfully",
      // Posts: Posts,

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

export const rejectPostsController = async (req, res) => {
  try {
    if (req.user.role !== "employee" && req.user.role !== "superadmin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  employee",
      });
    }

    const data = await getone(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "Posts not found",
      });
    }

 
    req.body.status = "rejected";
    const Posts = await rejectPosts(req.params.id);

    const email = new Email(data.PostsUser, data);
    await email.sendPostsRejection();

    return res.status(201).json({
      success: true,
      message: "Posts rejected successfully",
      // Posts: Posts,
      


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
    if (req.user.role !== "customer") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  customer",
      });
    }


    let data = await getone(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    }


    if (data.status === "approved") {
      return res.status(404).json({
        success: false,
        message: "You are too late to cancil this Posts becouse it aready approved !",
      });
    }
    if (data.status === "rejected") {
      return res.status(404).json({
        success: false,
        message: "You are too late to cancil this Posts becouse it aready rejected !",
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

// getevents

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
    const { id } = req.params;
    let data = await getone(id);
    if (!data) {
      return res.status(404).json({
        message: "Posts not found",
      });
    }
    if (req.user.role === "customer") {
      // if (!Array.isArray(data)) {
      //   data = [data];
      // }
      // data = data.filter(Posts => Posts.userid === req.user.id);

      // if (data.userid != req.user.id) {
      //   return res.status(200).json({
      //     success: true,
      //     message: "Posts there is no Posts you make",
      //     data: data
      //   });
      // }
    }

  
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
