const express = require("express");
const {
  addImage,
  deleteImage,
  editImage,
  getImagesByProjectId,
  getImage,
} = require("../db/images");
const { requireAdmin } = require("./utils");
const router = express.Router();

router.get("/:imageId", async (req, res, next) => {
  const { imageId } = req.params;

  try {
    const image = getImage(imageId);

    res.json(image);
  } catch (error) {
    next(error);
  }
});

router.get("/project/:projectId", async (req, res, next) => {
  const { projectId } = req.params;

  try {
    const images = getImagesByProjectId(projectId);
    res.json(images);
  } catch (error) {
    next(error);
  }
});

router.post("/project/:projectId", requireAdmin, async (req, res, next) => {
  const { projectId } = req.params;
  const { params } = req.body;

  try {
    const image = addImage({ projectId, ...params });
    res.json({ message: "success", data: image });
  } catch (error) {
    next(error);
  }
});

router.delete("/:imageId", requireAdmin, async (req, res, next) => {
  const { imageId } = req.params;

  try {
    const image = deleteImage(imageId);

    res.json({ message: "Success", data: image });
  } catch (error) {
    next(error);
  }
});

router.patch("/:imageId", requireAdmin, async (req, res, next) => {
  const { imageId } = req.params;
  const { fields } = req.body;

  try {
    const image = await editImage({ id: imageId, ...fields });

    res.json({ message: "Success", data: image });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
