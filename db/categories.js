const client = require("./client");

const addCategoryToProject = async (params) => {
  const { projectId, categoryId } = params;

  try {
    const {
      rows: [projectCategory],
    } = await client.query(
      `INSERT INTO project_categories("projectId", "categoryId") VALUES ($1, $2) RETURNING *;`,
      [projectId, categoryId]
    );

    return projectCategory;
  } catch (error) {
    console.error(error);
  }
};

const createCategory = async (name) => {
  try {
    const {
      rows: [category],
    } = await client.query(
      `INSERT INTO categories(name) VALUES ($1) RETURNING *;`,
      [name]
    );

    return category;
  } catch (error) {
    console.error(error);
  }
};

const deleteCategory = async (id) => {
  try {
    const {
      rows: [category],
    } = await client.query(`DELETE FROM categories WHERE id=$1 RETURNING *;`, [
      id,
    ]);
    return category;
  } catch (error) {
    console.error(error);
  }
};

const getAllCategories = async () => {
  try {
    const { rows: categories } = await client.query(
      `SELECT * FROM categories;`
    );

    return categories;
  } catch (error) {
    console.error(error);
  }
};

const getCategoriesByProjectId = async (projectId) => {
  try {
    const { rows: categories } = await client.query(
      `SELECT * FROM categories
            JOIN project_categories ON project_categories."categoryId"=categories.id
            WHERE project_categories."projectId"=$1;`,
      [projectId]
    );

    return categories;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addCategoryToProject,
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoriesByProjectId,
};
