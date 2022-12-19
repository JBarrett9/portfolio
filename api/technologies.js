const express = require("express");
const {
  createTechnology,
  deleteTechnology,
  editTechnology,
  getAllTechnologies,
  getTechnologiesByProjectId,
  addTechnologyToProject,
} = require("../db/technologies");
const { requireAdmin } = require("./utils");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const technologies = await getAllTechnologies();
    res.json(technologies);
  } catch (error) {
    next(error);
  }
});

router.post("/", requireAdmin, async (req, res, next) => {
  const { params } = req.body;

  try {
    const technology = await createTechnology(params);
    res.json({ message: "success", data: technology });
  } catch (error) {
    next(error);
  }
});

router.get("/project/:projectId", async (req, res, next) => {
  const { projectId } = req.params;

  try {
    const technologies = await getTechnologiesByProjectId(projectId);
    res.json(technologies);
  } catch (error) {
    next(error);
  }
});

router.post("/project/:projectId", requireAdmin, async (req, res, next) => {
  const { projectId } = req.params;
  const { technologyId } = req.body;

  try {
    const projectTechnology = addTechnologyToProject({
      projectId,
      technologyId,
    });
    res.json(projectTechnology);
  } catch (error) {
    next(error);
  }
});

router.delete("/:technologyId", requireAdmin, async (req, res, next) => {
  const { technologyId } = req.params;

  try {
    const technology = await deleteTechnology(technologyId);
    res.json({ message: "success", data: technology });
  } catch (error) {
    next(error);
  }
});

router.patch("/:technologyId", requireAdmin, async (req, res, next) => {
  const { technologyId } = req.params;
  const { fields } = req.body;

  try {
    const technology = await editTechnology({ id: technologyId, ...fields });

    res.json(technology);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
