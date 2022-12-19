const BASE_URL = "https://jbarrett-portfolio.onrender.com/api";

const fetchProjectById = async (projectId) => {
  try {
    const response = await fetch(BASE_URL + `/projects/project/${projectId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const project = await response.json();
    return project;
  } catch (error) {
    console.error(error);
  }
};

const fetchProjects = async () => {
  try {
    const response = await fetch(BASE_URL + `/projects`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error(error);
  }
};

const fetchProjectsByCategory = async (categoryId) => {
  try {
    const response = await fetch(
      BASE_URL + `/projects/category/${categoryId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error(error);
  }
};

const fetchTechnologies = async () => {
  try {
    const response = await fetch(BASE_URL + `/technologies`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const technologies = await response.json();
    return technologies;
  } catch (error) {
    console.error(error);
  }
};

export {
  fetchProjects,
  fetchProjectsByCategory,
  fetchProjectById,
  fetchTechnologies,
};
