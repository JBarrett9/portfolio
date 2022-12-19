const express = require("express");
const {
  getAllProjects,
  getPublicProjects,
  addProject,
  getProjectById,
  getProjectsByTechnology,
  getProjectsByCategory,
  hideProject,
  unhideProject,
  editProject,
} = require("../db/projects");
const { requireAdmin } = require("./utils");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const projects = await getPublicProjects();
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { params } = req.body;

  try {
    const project = await addProject(params);

    res.json({ message: "success", data: project });
  } catch (error) {
    next(error);
  }
});

router.get("/all", requireAdmin, async (req, res, next) => {
  try {
    const projects = await getAllProjects();
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.get("/project/:projectId", async (req, res, next) => {
  const { projectId } = req.params;

  try {
    const project = await getProjectById(projectId);
    res.json(project);
  } catch (error) {
    next(error);
  }
});

router.patch("/project/:projectId", requireAdmin, async (req, res, next) => {
  const { projectId } = req.params;
  const { fields } = req.params;
  try {
    const project = await editProject({ id: projectId, ...fields });

    res.json(project);
  } catch (error) {
    next(error);
  }
});

router.get("/technology/:technologyId", async (req, res, next) => {
  const { technologyId } = req.params;

  try {
    const projects = await getProjectsByTechnology(technologyId);
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.get("/category/:categoryId", async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const projects = await getProjectsByCategory(categoryId);
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/project/hide/:projectId",
  requireAdmin,
  async (req, res, next) => {
    const { projectId } = req.params;

    try {
      const project = hideProject(projectId);
      res.json({ message: "success", data: project });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/project/unhide/:projectId",
  requireAdmin,
  async (req, res, next) => {
    const { projectId } = req.params;

    try {
      const project = unhideProject(projectId);
      res.json({ message: "success", data: project });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
