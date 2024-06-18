import { name } from "ejs";
import { Router } from "express";
import { serve, setup } from "swagger-ui-express";

const docrouter = Router();

const options = {
  openapi: "3.0.1",
  info: {
    title: "CHURCH APIs documentation",
    version: "1.0.0",
    description: "CHURCH APIs documentation",
  },
  basePath: "/api",
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    { name: "Authontication", description: "" },
    { name: "Users", description: "Users" },
    { name: "Posts", description: "Posts" },
    { name: "Korari", description: "Korari" },


  ],
  paths: {
    "/api/v1/auth/login": {
      post: {
        tags: ["Authontication"],
        summary: "Login a user",
        description: "Login a user",
        operationId: "loginUser",
        security: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                email: "superadmin@gmail.com",
                password: "1234",
              },
            },
            required: true,
          },
        },
        responses: {
          200: {
            description: "User logged in successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },


    "/api/v1/users/signup": {
      post: {
        tags: ["Users"],
        summary: "signup as christian",
        description: "signup as christian",
        operationId: "addchristian",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                firstname: "John",
                lastname: "cedrick",
                phone: "078654325",
                email: "cedrickhakuzimana@gmail.com",
                notify: "yes/no",
                password: "1234",
                comfirmpassword: "1234",
              },
            },
            required: true,
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/add": {
      post: {
        tags: ["Users"],
        summary: "Add a employee admin",
        description: "Add a user",
        operationId: "addemployee",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                firstname: "cedro",
                lastname: "cedrick",
                phone: "078654325",
                email: "cedrickhakuzimana@gmail.com"
                        
              },
            },
            required: true,
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/check": {
      post: {
        tags: ["Users"],
        summary: "Get  users user by email by email and send code",
        description: "Get all users",
        operationId: "getAllUserscheck",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                email: "cedrickhakuzimana.com",                    
              },
            },
            required: true,
          },
        },
        responses: {
          200: {
            description: "User retrived successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/code/{email}": {
      post: {
        tags: ["Users"],
        summary: "check code !",
        description: "checking code send thrugth email",
        operationId: "code",
        parameters: [
          {
            name: "email",
            in: "path",
            description: "User's email",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                code: "10000",                    
              },
            },
            required: true,
          },
        },
        responses: {
          200: {
            description: "User retrived successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users": {
      get: {
        tags: ["Users"],
        summary: "Get all users",
        description: "Get all users",
        operationId: "getAllUsers",
        responses: {
          200: {
            description: "User retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get a user",
        description: "Get a user",
        operationId: "getOneUser",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "User's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    // "/api/v1/users/update/{id}": {
    //   put: {
    //     tags: ["Users"],
    //     summary: "Update a user",
    //     description: "Update a user",
    //     operationId: "updateOneUser",
    //     parameters: [
    //       {
    //         name: "id",
    //         in: "path",
    //         description: "User's id",
    //         required: true,
    //         schema: {
    //           type: "string",
    //         },
    //       },
    //     ],
    //     requestBody: {
    //       content: {
    //         "application/json": {
    //           schema: {
    //             $ref: "#/components/schemas/User",
    //           },
    //           example: {
    //             firstname: "John",
    //             lastname: "Doe",
    //             email: "test@example.com",
    //             phone: "08012345678",
    //           },
    //         },
    //         "multipart/form-data": {
    //           schema: {
    //             $ref: "#/components/schemas/User",
    //           },
    //         },
    //       },
    //     },
    //     responses: {
    //       200: {
    //         description: "User deleted successfully",
    //       },
    //       400: {
    //         description: "Bad request",
    //       },
    //       401: {
    //         description: "Unauthorized",
    //       },
    //       404: {
    //         description: "User not found",
    //       },
    //       500: {
    //         description: "Something went wrong",
    //       },
    //     },
    //   },
    // },

    "/api/v1/users/update/{id}": {
      "put": {
        "tags": ["Users"],
        "summary": "update Users",
        "description": "update Users",
        "operationId": "updateUsers",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "users's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        "requestBody": {
          "required": true,
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "file": {
                    "type": "string",
                    "format": "binary",
                    "description": "image file to upload"
                  },
                  "firstname": {
                    "type": "string",
                    "description": "first name"
                  },
                  "lastname": {
                    "type": "string",
                    "description": "last name"
                  },
                  "phone": {
                    "type": "string",
                    "description": "phone name"
                  }
                },
                "required": ["file"]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "File uploaded successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "fileUrl": {
                      "type": "string"
                    },
                    "public_id": {
                      "type": "string"
                    }
                  },
                  "example": {
                    "message": "File uploaded successfully",
                    "fileUrl": "http://res.cloudinary.com/dzl8xve8s/pdf_uploads/sample.pdf",
                    "public_id": "sample"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  },
                  "example": {
                    "error": "No file uploaded"
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "500": {
            "description": "Something went wrong"
          }
        }
      }
    },
// resetPassword
"/api/v1/users/resetPassword/{email}": {
  put: {
    tags: ["Users"],
    summary: "reset  user password",
    description: "reset  user password  !! ",
    operationId: "reset-passwordr",
    parameters: [
      {
        name: "email",
        in: "path",
        description: "User's email",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/User",
          },
          example: {
            newPassword: "newp",
            confirmPassword: "cpass",
           
          },
        },
      },
    },
    responses: {
      200: {
        description: "User password updated  successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      404: {
        description: "User not found",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},

    "/api/v1/users/changePassword": {
      put: {
        tags: ["Users"],
        summary: "change  user password",
        description: "change  user password  for current loged in user !! ",
        operationId: "change-passwordr",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                oldPassword: "oldp",
                newPassword: "newp",
                confirmPassword: "cpass",
               
              },
            },
          },
        },
        responses: {
          200: {
            description: "User password updated  successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/delete/{id}": {
      delete: {
        tags: ["Users"],
        summary: "Delete a user",
        description: "Delete a user",
        operationId: "deleteOneUser",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "User's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Posts/": {
      get: {
        tags: ["Posts"],
        summary: "all  a Posts",
        description: "Posts",
        operationId: "all Posts",
      
      
        responses: {
          201: {
            description: "Posts retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/Posts/events": {
      get: {
        tags: ["Posts"],
        summary: "all  a events Posts",
        description: "Posts",
        operationId: "events",
      
      
        responses: {
          201: {
            description: "Posts retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Posts/pics": {
      get: {
        tags: ["Posts"],
        summary: "all  a pics Posts",
        description: "pics",
        operationId: "pics",
      
      
        responses: {
          201: {
            description: "pics Posts retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },








    "/api/v1/Posts/blogs": {
      get: {
        tags: ["Posts"],
        summary: "all  a blogs Posts",
        description: "Posts blogs",
        operationId: "blogs",
      
      
        responses: {
          201: {
            description: "blogs Posts retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },



    "/api/v1/Posts/add": {
      "post": {
        "tags": ["Posts"],
        "summary": "Add post either blog or event",
        "description": "Add post either blog or event",
        "operationId": "addPostsUpload",
        // parameters: [
        //   {
        //     name: "id",
        //     in: "path",
        //     description: "Posts's id",
        //     required: true,
        //     schema: {
        //       type: "string",
        //     },
        //   },
        // ],
        "requestBody": {
          "required": true,
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "file": {
                    "type": "string",
                    "format": "binary",
                    "description": "image file to upload"
                  },
                  "title": {
                    "type": "string",
                    // "format": "binary",
                    "description": "Post title"
                  },
                  "description": {
                    "type": "string",
                    // "format": "binary",
                    "description": "description of post "
                  },
                  "type": {
                    "type": "string",
                    // "format": "binary",
                    "description": "type of post, you must specify event/blog/pic"
                  }
                },
                "required": ["file"]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "File uploaded successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "fileUrl": {
                      "type": "string"
                    },
                    "public_id": {
                      "type": "string"
                    }
                  },
                  "example": {
                    "message": "File uploaded successfully",
                    "fileUrl": "http://res.cloudinary.com/dzl8xve8s/pdf_uploads/sample.pdf",
                    "public_id": "sample"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  },
                  "example": {
                    "error": "No file uploaded"
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "500": {
            "description": "Something went wrong"
          }
        }
      }
    },
    "/api/v1/Posts/update/{id}": {
      "put": {
        "tags": ["Posts"],
        "summary": "update post either blog or event",
        "description": "update post either blog or event",
        "operationId": "updatePostsUpload",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Posts's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        "requestBody": {
          "required": true,
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "file": {
                    "type": "string",
                    "format": "binary",
                    "description": "image file to upload"
                  },
                  "title": {
                    "type": "string",
                    // "format": "binary",
                    "description": "Post title"
                  },
                  "description": {
                    "type": "string",
                    // "format": "binary",
                    "description": "description of post "
                  },
                  "type": {
                    "type": "string",
                    // "format": "binary",
                    "description": "type of post, you must specify event/blog/pic"
                  }
                },
                "required": ["file"]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "File uploaded successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "fileUrl": {
                      "type": "string"
                    },
                    "public_id": {
                      "type": "string"
                    }
                  },
                  "example": {
                    "message": "File uploaded successfully",
                    "fileUrl": "http://res.cloudinary.com/dzl8xve8s/pdf_uploads/sample.pdf",
                    "public_id": "sample"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  },
                  "example": {
                    "error": "No file uploaded"
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "500": {
            "description": "Something went wrong"
          }
        }
      }
    },
  
   
    "/api/v1/Posts/one/{id}": {
      get: {
        tags: ["Posts"],
        summary: "get one  a Posts",
        description: "customer/admin get one Posts",
        operationId: "getPosts",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Posts's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
        responses: {
          201: {
            description: "Posts retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Posts/delete/{id}": {
      delete: {
        tags: ["Posts"],
        summary: "delete a Posts",
        description: "delete Posts",
        operationId: "deletePosts",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Posts's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
        responses: {
          201: {
            description: "Posts rejected successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },




    "/api/v1/Korari/statistic": {
      get: {
        tags: ["Korari"],
        summary: "all  a statistic",
        description: "statistic",
        operationId: "all statistic",
      
      
        responses: {
          201: {
            description: "Korari retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Korari/": {
      get: {
        tags: ["Korari"],
        summary: "all  a Korari",
        description: "Korari",
        operationId: "all Korari",
      
      
        responses: {
          201: {
            description: "Korari retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Korari/one/{id}": {
      get: {
        tags: ["Korari"],
        summary: "one  a Korari",
        description: "Korari",
        operationId: "one Korari",
             parameters: [
          {
            name: "id",
            in: "path",
            description: "korari's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
      
        responses: {
          201: {
            description: "Korari retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/Korari/delete/{id}": {
      delete: {
        tags: ["Korari"],
        summary: "delete a Korari",
        description: "delete Korari",
        operationId: "deleteKorari",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Posts's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
        responses: {
          201: {
            description: "Posts rejected successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/Korari/update/{id}": {
      "put": {
        "tags": ["Korari"],
        "summary": "update Korari",
        "description": "update Korari",
        "operationId": "updateKorari",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "korari's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        "requestBody": {
          "required": true,
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "file": {
                    "type": "string",
                    "format": "binary",
                    "description": "image file to upload"
                  },
                  "name": {
                    "type": "string",
                    // "format": "binary",
                    "description": "Post title"
                  },
                  "admin": {
                    "type": "string",
                    // "format": "binary",
                    "description": "description of post "
                  },
            
                },
                "required": ["file"]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "File uploaded successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "fileUrl": {
                      "type": "string"
                    },
                    "public_id": {
                      "type": "string"
                    }
                  },
                  "example": {
                    "message": "File uploaded successfully",
                    "fileUrl": "http://res.cloudinary.com/dzl8xve8s/pdf_uploads/sample.pdf",
                    "public_id": "sample"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  },
                  "example": {
                    "error": "No file uploaded"
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "500": {
            "description": "Something went wrong"
          }
        }
      }
    },
    "/api/v1/Korari/add": {
      "post": {
        "tags": ["Korari"],
        "summary": "Add Korari",
        "description": "Add Korari",
        "operationId": "addKorari",
        // parameters: [
        //   {
        //     name: "id",
        //     in: "path",
        //     description: "Posts's id",
        //     required: true,
        //     schema: {
        //       type: "string",
        //     },
        //   },
        // ],
        "requestBody": {
          "required": true,
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "file": {
                    "type": "string",
                    "format": "binary",
                    "description": "image file to upload"
                  },
                  "name": {
                    "type": "string",
                    // "format": "binary",
                    "description": "Post title"
                  },
                  "admin": {
                    "type": "string",
                    // "format": "binary",
                    "description": "description of post "
                  },
            
                },
                "required": ["file"]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "File uploaded successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "fileUrl": {
                      "type": "string"
                    },
                    "public_id": {
                      "type": "string"
                    }
                  },
                  "example": {
                    "message": "File uploaded successfully",
                    "fileUrl": "http://res.cloudinary.com/dzl8xve8s/pdf_uploads/sample.pdf",
                    "public_id": "sample"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  },
                  "example": {
                    "error": "No file uploaded"
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "500": {
            "description": "Something went wrong"
          }
        }
      }
    },


  },

  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          username: {
            type: "string",
            description: "User's username",
          },
         
          role: {
            type: "string",
            description: "User's role",
          },
    
          email: {
            type: "string",
            description: "User's email",
          },
          password: {
            type: "string",
            description: "User's password",
          },
          password: {
            type: "string",
            description: "User's ponts",
          },

        },
      },
    
    

    
    },

    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

docrouter.use("/", serve, setup(options));

export default docrouter;
