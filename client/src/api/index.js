const fetchProjectById = async (projectId) => {
  try {
    const response = await fetch(`/api/projects/project/${projectId}`, {
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
    const response = await fetch(`/api/projects`, {
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
    const response = await fetch(`/api/projects/category/${categoryId}`, {
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

const fetchTechnologies = async () => {
  try {
    const response = await fetch(`/api/technologies`, {
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
