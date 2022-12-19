const client = require("./client");

const createImage = async (params) => {
  const { url, alt, projectId } = params;

  try {
    const {
      rows: [image],
    } = await client.query(
      `INSERT INTO images(url, alt, "projectId") VALUES ($1, $2, $3) RETURNING *;`,
      [url, alt, projectId]
    );

    return image;
  } catch (error) {
    console.error(error);
  }
};

const getImagesByProjectId = async (projectId) => {
  try {
    const { rows: images } = await client.query(
      `SELECT * FROM images WHERE "projectId"=$1;`,
      [projectId]
    );
    return images;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createImage,
  getImagesByProjectId,
};
