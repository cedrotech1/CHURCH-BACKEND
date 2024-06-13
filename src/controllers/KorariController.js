// KorariController.js
import {
  createKorari,
  getAllKorari,
  deleteOneKorari,
  getoneKorari,
  updateOneKorari,
 
} from "../services/korariService";
import {getUserEmployees} from "../services/userService";
import Email from "../utils/mailer";
import imageUploader from "../helper/imageUplouder";
export const addKorariController = async (req, res) => {
  try {
    let image; 
     if (req.files && req.files.file) { 
       image = await imageUploader(req);
      if (!image || !image.url) {
      
        throw new Error('Upload failed or image URL missing');
      }
    }
      req.body.file = image.url;
    let newKorari;
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
       image = await imageUploader(req);
      if (!image || !image.url) {
      
        throw new Error('Upload failed or image URL missing');
      }
    }
      req.body.file = image.url;
    let newKorari;
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
    // if (req.user.role !== "customer") {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Not authorized, you are not  customer",
    //   });
    // }


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
