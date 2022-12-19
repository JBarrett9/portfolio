const { getCategoriesByProjectId } = require("./categories");
const client = require("./client");
const { getImagesByProjectId } = require("./images");
const { getTechnologiesByProjectId } = require("./technologies");

const addProject = async (params) => {
  try {
    const { title, published, description, url, github } = params;

    const { rows: project } = await client.query(
      `INSERT INTO projects(title, published, description, url, github) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *;`,
      [title, published, description, url, github]
    );

    return project;
  } catch (error) {
    console.error(error);
  }
};

const deleteProject = async (id) => {
  try {
    const {
      rows: [project],
    } = await client.query(
      `
      DELETE FROM project_technologies WHERE "projectId"=id;
      DELETE FROM project_categories WHERE "projectId"=id;
      DELETE FROM images WHERE "projectId"=id;
      DELETE FROM projects WHERE id=$1 RETURNING *;`,
      [id]
    );

    return project;
  } catch (error) {
    console.error(error);
  }
};

const editProject = async ({ id, ...fields }) => {
  const setStr = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(", ");

  if (setStr.length === 0) {
    return;
  }

  try {
    const {
      rows: [project],
    } = await client.query(
      `UPDATE projects SET ${setStr} WHERE id=${id} RETURNING *;`,
      Object.values(fields)
    );

    return project;
  } catch (error) {
    console.error(error);
  }
};

const getAllProjects = async () => {
  try {
    const { rows: projects } = await client.query(`SELECT * FROM projects;`);

    for (let project of projects) {
      const images = await getImagesByProjectId(project.id);
      projects.images = images;

      const technologies = await getTechnologiesByProjectId(project.id);
      project.technologies = technologies;
    }

    return projects;
  } catch (error) {
    console.error(error);
  }
};

const getPublicProjects = async () => {
  try {
    const { rows: projects } = await client.query(
      `SELECT * FROM projects WHERE active=true;`
    );

    for (let project of projects) {
      const images = await getImagesByProjectId(project.id);
      project.images = images;

      const technologies = await getTechnologiesByProjectId(project.id);
      project.technologies = technologies;

      const categories = await getCategoriesByProjectId(project.id);
      project.categories = categories;
    }

    return projects;
  } catch (error) {
    console.error(error);
  }
};

const getProjectsByCategory = async (categoryId) => {
  try {
    const { rows: projects } = await client.query(
      `SELECT * FROM projects JOIN project_categories ON project_categories."projectId"=projects.id WHERE project_categories."categoryId"=$1 ORDER BY published DESC;`,
      [categoryId]
    );

    for (let project of projects) {
      const images = await getImagesByProjectId(project.projectId);
      project.images = images;

      const technologies = await getTechnologiesByProjectId(project.projectId);
      project.technologies = technologies;

      const categories = await getCategoriesByProjectId(project.projectId);
      project.categories = categories;
    }

    return projects;
  } catch (error) {
    console.error(error);
  }
};

const getProjectById = async (id) => {
  try {
    const {
      rows: [project],
    } = await client.query(`SELECT * FROM projects WHERE id=($1);`, [id]);

    const images = await getImagesByProjectId(project.id);
    project.images = images;

    const technologies = await getTechnologiesByProjectId(project.id);
    project.technologies = technologies;

    const categories = await getCategoriesByProjectId(project.id);
    project.categories = categories;

    return project;
  } catch (error) {
    console.error(error);
  }
};

const getProjectsByTechnology = async (technologyId) => {
  try {
    const { rows: projects } = await client.query(
      `SELECT * FROM projects JOIN project_technologies ON project_technologies."projectId"=projects.id WHERE project_technologies."technologyId"=$1 ORDER BY published DESC;`,
      [technologyId]
    );

    for (let project of projects) {
      const images = await getImagesByProjectId(project.projectId);
      project.images = images;

      const technologies = await getTechnologiesByProjectId(project.projectId);
      project.technologies = technologies;

      const categories = await getCategoriesByProjectId(project.projectId);
      project.categories = categories;
    }

    return projects;
  } catch (error) {
    console.error(error);
  }
};

const hideProject = async (id) => {
  try {
    const {
      rows: [project],
    } = await client.query(
      `UPDATE projects SET active=false WHERE id=$1 RETURNING *;`,
      [id]
    );

    return project;
  } catch (error) {
    console.error(error);
  }
};

const unhideProject = async (id) => {
  try {
    const {
      rows: [project],
    } = await client.query(
      `UPDATE projects SET active=true WHERE id=$1 RETURNING *;`,
      [id]
    );

    return project;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addProject,
  editProject,
  deleteProject,
  getAllProjects,
  getPublicProjects,
  getProjectById,
  getProjectsByCategory,
  getProjectsByTechnology,
  hideProject,
  unhideProject,
};
