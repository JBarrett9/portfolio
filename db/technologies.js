const client = require("./client");

const addTechnologyToProject = async (params) => {
  const { projectId, technologyId } = params;

  try {
    const {
      rows: [projectTechnology],
    } = await client.query(
      `INSERT INTO project_technologies("projectId", "technologyId")
      VALUES ($1, $2) 
      RETURNING *;`,
      [projectId, technologyId]
    );

    return projectTechnology;
  } catch (error) {
    console.error(error);
  }
};

const createTechnology = async (params) => {
  const { name, icon, color } = params;
  try {
    const {
      rows: [technology],
    } = await client.query(
      `INSERT INTO technologies(name, icon, color)
      VALUES ($1, $2, $3) 
      RETURNING *;`,
      [name, icon, color]
    );

    return technology;
  } catch (error) {
    console.error(error);
  }
};

const deleteTechnology = async (id) => {
  try {
    const {
      rows: [technology],
    } = await client.query(
      `DELETE FROM technologies WHERE id=$1 RETURNING *;`,
      [id]
    );

    return technology;
  } catch (error) {
    console.error(error);
  }
};

const editTechnology = async ({ id, ...fields }) => {
  const setStr = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(", ");

  if (setStr.length === 0) {
    return;
  }

  try {
    const {
      rows: [technology],
    } = await client.query(
      `UPDATE technologies SET ${setStr} WHERE id=${id} RETURNING *;`,
      Object.values(fields)
    );

    return technology;
  } catch (error) {
    throw error;
  }
};

const getAllTechnologies = async () => {
  try {
    const { rows: technologies } = await client.query(
      `SELECT * FROM technologies;`
    );

    return technologies;
  } catch (error) {
    console.error(error);
  }
};

const getTechnologiesByProjectId = async (projectId) => {
  try {
    const { rows: technologies } = await client.query(
      `SELECT * FROM technologies
            JOIN project_technologies ON project_technologies."technologyId"=technologies.id 
            WHERE project_technologies."projectId"=$1;`,
      [projectId]
    );

    return technologies;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addTechnologyToProject,
  createTechnology,
  deleteTechnology,
  editTechnology,
  getAllTechnologies,
  getTechnologiesByProjectId,
};
