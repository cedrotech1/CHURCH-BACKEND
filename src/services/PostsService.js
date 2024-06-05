
import db from "../database/entity/index.js";

const users = db["User"];
const Posts = db["Posts"];


// createImagePosts

export const createImagePosts = async (PostsData) => {
  try {
    return await Posts.create(PostsData);
  } catch (error) {
    throw new Error(`Error creating Posts: ${error.message}`);
  }
};

export const createPosts = async (PostsData) => {
  try {
    return await Posts.create(PostsData);
  } catch (error) {
    throw new Error(`Error creating Posts: ${error.message}`);
  }
};

export const getAllPosts = async () => {
  try {
    const Allposts = await Posts.findAll(
      {
        include: [
          {
            model: users,
            as: "PostsUser",
          },
        ],
      }
    );

    return Allposts;
  } catch (error) {
    console.error("Error fetching all restaurants with users:", error);
    throw error;
  }
};

export const getevents = async () => {
  try {
    const events = await Posts.findAll({
      where: {
        type: "event",
      },
   
      include: [
        {
          model: users,
          as: "PostsUser",
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });

    if (!events || events.length === 0) {
      return null;
    }



    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const getblogs = async () => {
  try {
    const blogs = await Posts.findAll({
      where: {
        type: "blog",
      },
   
      include: [
        {
          model: users,
          as: "PostsUser",
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });

    if (!blogs || blogs.length === 0) {
      return [];
    }



    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const getpics = async () => {
  try {
    const pics = await Posts.findAll({
      where: {
        type: "pic",
      },
   
      include: [
        {
          model: users,
          as: "PostsUser",
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });

    if (!pics || pics.length === 0) {
      return null;
    }



    return pics;
  } catch (error) {
    console.error("Error fetching pic:", error);
    throw error;
  }
};


// ckeckPosts
export const approvePosts = async (id) => {
  const Poststoapprove = await Posts.findOne(
    { where: { id } }

  );
  if (Poststoapprove) {
    await Posts.update({ status: "approved" }, { where: { id } });
    return Poststoapprove;
  }
  return null;
};

export const ckeckPosts = async (id) => {
  const Poststoapprove = await Posts.findOne(
    { where: { id } }

  );
  if (Poststoapprove) {
    await Posts.update({ status: "checked" }, { where: { id } });
    return Poststoapprove;
  }
  return null;
};

export const unckeckPosts = async (id) => {
  const Poststoapprove = await Posts.findOne(
    { where: { id } }

  );
  if (Poststoapprove) {
    await Posts.update({ status: "pending" }, { where: { id } });
    return Poststoapprove;
  }
  return null;
};


export const rejectPosts = async (id) => {
  const Poststoapprove = await Posts.findOne(
    { where: { id } }

  );
  if (Poststoapprove) {
    await Posts.update({ status: "rejected" }, { where: { id } });
    return Poststoapprove;
  }
  return null;
};



export const updateUser = async (userId, points) => {
  try {
    const userToUpdate = await users.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] },
    });

    if (userToUpdate) {
      await userToUpdate.update({ points: points });
      const updatedUser = await users.findByPk(userId, {
        attributes: { exclude: ["password"] },
      });

      return updatedUser;
    }


    return null;
  } catch (error) {
    console.error("Error updating user with restaurant:", error);
    throw error;
  }
};

export const updateOnePosts = async (id, PostsData) => {
  try {
    const PostsToUpdate = await Posts.findOne({ where: { id } });
    
    if (!PostsToUpdate) {
      return null;
    }

    await Posts.update(PostsData, { where: { id } });
    const updatedPosts = await Posts.findOne({ where: { id } });

    return updatedPosts;
  } catch (error) {
    console.error('Error updating Posts:', error);
    throw error;
  }
};



export const pending = async (id) => {
  const pending = await Posts.findAll({ where: { status:'pending' } });
  if (pending) {
    return pending;
  }
  return null;
};

export const getone = async (id) => {
  try {
    const Posts = await Posts.findByPk(id,
      {
        include: [

          {
            model: users,
            as: "PostsUser",
          },

        ],

      });

    return Posts;
  } catch (error) {
    console.error("Error fetching all Posts with users:", error);
    throw error;
  }
};



export const checkExistingPosts = async (title) => {
  return await Posts.findOne({
    where: {
      title,
    },
  });
};

export const deleteOnePosts = async (id) => {
  const restToDelete = await Posts.findOne({ where: { id } });
  if (restToDelete) {
    await Posts.destroy({ where: { id } });
    return restToDelete;
  }
  return null;
};


export const updateOneResto = async (id, resto) => {
  const restoToUpdate = await Posts.findOne({ where: { id } });
  if (restoToUpdate) {
    await Posts.update(resto, { where: { id } });
    return resto;
  }
  return null;
};

export const deactivateResto = async (id) => {
  const restoToUpdate = await Posts.findOne({ where: { id } });
  if (restoToUpdate) {
    await Posts.update({ status: 'inactive' }, { where: { id } });
    return restoToUpdate;
  }
  return null;
};

