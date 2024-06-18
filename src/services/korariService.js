import db from "../database/entity/index.js";

const users = db["User"];
const Korari = db["Koraris"]; 
const Posts = db["Posts"];



export const getStatistics = async () => {
  try {
    // Count posts by type and korariId status
    const numberofkorari = await Korari.count(); 
    const numberofusers = await users.count(); 

    const churchPostsCount = await Posts.count({
      where: {
        korariId: null
      }
    });

    const korariPostsCount = await Posts.count({
      where: {
        korariId: {
          [db.Sequelize.Op.not]: null
        }
      }
    });

    // Count posts by type for church (where korariId is null)
    const churchPicCount = await Posts.count({
      where: {
        type: 'pic',
        korariId: null
      }
    });

    const churchEventCount = await Posts.count({
      where: {
        type: 'event',
        korariId: null
      }
    });

    const churchBlogCount = await Posts.count({
      where: {
        type: 'blog',
        korariId: null
      }
    });

    // Count posts by type for korari (where korariId is not null)
    const korariPicCount = await Posts.count({
      where: {
        type: 'pic',
        korariId: {
          [db.Sequelize.Op.not]: null
        }
      }
    });

    const korariEventCount = await Posts.count({
      where: {
        type: 'event',
        korariId: {
          [db.Sequelize.Op.not]: null
        }
      }
    });

    const korariBlogCount = await Posts.count({
      where: {
        type: 'blog',
        korariId: {
          [db.Sequelize.Op.not]: null
        }
      }
    });

    const statistics = {
      churchPosts: churchPostsCount,
      korariPosts: korariPostsCount,
      church: {
        pic: churchPicCount,
        event: churchEventCount,
        blog: churchBlogCount
      },
      korari: {
        pic: korariPicCount,
        event: korariEventCount,
        blog: korariBlogCount
      },
      users: numberofusers,
      korari: numberofkorari
    };

    return statistics;
  } catch (error) {
    console.error('Error in getStatistics function:', error);
    throw error; // Re-throw the error to handle it elsewhere
  }
};


export const getoneKorari = async (id) => {
  try {
    // Fetch Korari details without posts
    const korari = await Korari.findByPk(id, {
      include: [
        {
          model: users,
          as: "KorariUser",
          attributes: { exclude: ["password"] }, // Exclude sensitive fields if necessary
        },
      ],
    });

    if (!korari) {
      return null;
    }

    // Fetch posts associated with the Korari
    const posts = await Posts.findAll({
      where: {
        korariId: id,
      },
      include: [
        {
          model: users,
          as: "PostsUser",
          attributes: { exclude: ["password"] },
        },
      ],
    });

    // Initialize grouped posts
    const allposts = {
      event: [],
      blog: [],
      pic: []
    };

    // Group posts by type
    posts.forEach(post => {
      allposts[post.type].push(post);
    });

    // Return structured response
    return {
      korari,
      allposts
    };

  } catch (error) {
    console.error("Error fetching Korari with posts:", error);
    throw error;
  }
};


export const getOneKorariByadmin = async (id) => {
  try {
    const korari1 = await Korari.findAll({
      where: {
        admin: id,
      },
      include: [
        {
          model: users,
          as: "KorariUser",
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });

    if (!korari1 || korari1.length === 0) {
      return null;
    }

    return korari1;
  } catch (error) {
    console.error("Error fetching Korari:", error);
    throw error;
  }
};

export const checkExistingAdmin = async (id) => {
  return await Korari.findOne({
    where: {
      admin: id,
    },
  });
};



export const createImageKorari = async (KorariData) => {
  try {
    return await Korari.create(KorariData);
  } catch (error) {
    throw new Error(`Error creating Korari: ${error.message}`);
  }
};
// Garageorange@2020

export const createKorari = async (KorariData) => {
  try {
    return await Korari.create(KorariData);
  } catch (error) {
    throw new Error(`Error creating Korari: ${error.message}`);
  }
};

export const getAllKorari = async () => {
  try {
    const Allposts = await Korari.findAll(
      {
        include: [
          {
            model: users,
            as: "KorariUser",
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

// export const getAllKorari = async () => {
//   try {
//     const AllKorari = await Korari.findAll(
//       // {
//       //   include: [
//       //     {
//       //       model: users,
//       //       as: "KorariUser",
//       //     },
//       //   ],
//       // }
//     );

//     return AllKorari;
//   } catch (error) {
//     console.error("Error fetching all restaurants with users:", error);
//     throw error;
//   }
// };







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

export const updateOneKorari = async (id, KorariData) => {
  try {
    const KorariToUpdate = await Korari.findOne({ where: { id } });
    
    if (!KorariToUpdate) {
      return null;
    }

    await Korari.update(KorariData, { where: { id } });
    const updatedKorari = await Korari.findOne({ where: { id } });

    return updatedKorari;
  } catch (error) {
    console.error('Error updating Korari:', error);
    throw error;
  }
};


// deleteOneKorariByadmin






export const checkExistingKorari = async (title) => {
  return await Korari.findOne({
    where: {
      title,
    },
  });
};

export const deleteOneKorari = async (id) => {
  const restToDelete = await Korari.findOne({ where: { id } });
  if (restToDelete) {
    await Korari.destroy({ where: { id } });
    return restToDelete;
  }
  return null;
};


export const updateOneResto = async (id, resto) => {
  const restoToUpdate = await Korari.findOne({ where: { id } });
  if (restoToUpdate) {
    await Korari.update(resto, { where: { id } });
    return resto;
  }
  return null;
};

export const deactivateResto = async (id) => {
  const restoToUpdate = await Korari.findOne({ where: { id } });
  if (restoToUpdate) {
    await Korari.update({ status: 'inactive' }, { where: { id } });
    return restoToUpdate;
  }
  return null;
};

