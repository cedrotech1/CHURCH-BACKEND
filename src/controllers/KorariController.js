// KorariController.js
import {
  createKorari,
  getAllKorari,
  deleteOneKorari,
  getoneKorari,
  updateOneKorari,
  checkExistingAdmin,
  getStatistics
 
} from "../services/korariService";
import {getUserEmployees} from "../services/userService";
import Email from "../utils/mailer";
import imageUploader from "../helper/imageUplouder";
export const addKorariController = async (req, res) => {
  try {

    if (req.user.role !== "superadmin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not superadmin",
      });
    }
    let image; 
    if (req.files && req.files.file) {
      try {
        // Upload the image and get the image URL
        image = await imageUploader(req);
    
        // Check if image upload failed or if image URL is missing
        if (!image || !image.url) {
          throw new Error('Upload failed or image URL missing');
        }
    
        // Assign the image URL to req.body.file
        req.body.file = image.url;
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error appropriately
      }
    }
    let newKorari;

    const existingAdmin = await checkExistingAdmin(
      req.body.admin,
    );

    if (existingAdmin) {
      console.log("that user has another chair");
      return res.status(400).json({
        success: false,
        message: "that user has another chair",
      });
    }


    newKorari = await createKorari(req.body);
  
    return res.status(201).json({
      success: true,
      message: "new Korari created successfully",
      Korari: newKorari,
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

export const updateKorariController = async (req, res) => {

  try {
    let image; 
    if (req.files && req.files.file) {
      try {
        // Upload the image and get the image URL
        image = await imageUploader(req);
    
        // Check if image upload failed or if image URL is missing
        if (!image || !image.url) {
          throw new Error('Upload failed or image URL missing');
        }
    
        // Assign the image URL to req.body.file
        req.body.file = image.url;
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error appropriately
      }
    }
    let newKorari;

    
    let data = await getoneKorari(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    }
    // console.log(data.korari.admin);

    if (req.user.role === "user" && data.korari.admin !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not allowed to edit that",
      });
    }
  
 
    newKorari = await updateOneKorari(req.params.id,req.body);

    
  
    return res.status(201).json({
      success: true,
      message: "updated Korari created successfully",
      Korari: newKorari,
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
export const deleteOneKorariController = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not superadmin",
      });
    }


    let data = await getoneKorari(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    }


 

    const Korari = await deleteOneKorari(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Korari deleted successfully",
      Korari:Korari,

    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};
export const Korari = async (req, res) => {
  try {


    let data = await getAllKorari();


    return res.status(200).json({
      success: true,
      message: "Korari retrieved successfully",
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

export const Statistics = async (req, res) => {
  try {


    let data = await getStatistics();


    return res.status(200).json({
      success: true,
      message: "statistics retrieved successfully",
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

export const getOneKorariController = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await getoneKorari(id);
    if (!data) {
      return res.status(404).json({
        message: "Korari not found",
      });
    }


  
    return res.status(200).json({
      success: true,
      message: "Korari retrieved successfully",
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
