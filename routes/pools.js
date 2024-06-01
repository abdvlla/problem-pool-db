const express = require("express");
const router = express.Router();
const Pool = require("../models/pool");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

// All Pools Route
router.get("/", ensureAuthenticated, async (req, res) => {
  let query = Pool.find();
  try {
    const pools = await query.exec();
    res.render("pools/index", { pools: pools });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
});

router.get("/new", ensureAuthenticated, (req, res) => {
  renderNewPage(res, new Pool());
});

// Create Pool Route
router.post("/", ensureAuthenticated, async (req, res) => {
  const pool = new Pool({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    number: req.body.number,
    email: req.body.email,
    bodyOfWater: req.body.bodyOfWater,
    status: req.body.status,
    description: req.body.description,
    system: req.body.system,
    pump: req.body.pump,
    filter: req.body.filter,
    heater: req.body.heater,
    hhlBuild: req.body.hhlBuild,
    size: req.body.size,
    otherEquipment: req.body.otherEquipment,
    brand: req.body.brand,
    make: req.body.make,
  });

  saveImages(pool, req.body.cover);

  try {
    const newPool = await pool.save();
    res.redirect(`pools/${newPool.id}`);
  } catch (err) {
    console.log(err);
    renderNewPage(res, pool, true);
  }
});

// Show Pool Route
router.get("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const pool = await Pool.findById(req.params.id).exec();
    res.render("pools/show", { pool: pool });
  } catch {
    res.redirect("/");
  }
});

// Edit Pool Route
router.get("/:id/edit", ensureAuthenticated, async (req, res) => {
  try {
    const pool = await Pool.findById(req.params.id);
    renderEditPage(res, pool);
  } catch {
    res.redirect("/");
  }
});

router.put("/:id", ensureAuthenticated, async (req, res) => {
  let pool;
  try {
    pool = await Pool.findById(req.params.id);
    pool.firstName = req.body.firstName;
    pool.lastName = req.body.lastName;
    pool.number = req.body.number;
    pool.email = req.body.email;
    pool.bodyOfWater = req.body.bodyOfWater;
    pool.status = req.body.status;
    pool.description = req.body.description;
    pool.system = req.body.system;
    pool.pump = req.body.pump;
    pool.filter = req.body.filter;
    pool.heater = req.body.heater;
    pool.size = req.body.size;
    pool.otherEquipment = req.body.otherEquipment;
    pool.hhlBuild = req.body.hhlBuild;
    pool.brand = req.body.brand;
    pool.make = req.body.make;

    if (req.body.removeImages) {
      const removeIndices = req.body.removeImages.map(Number);
      pool.images = pool.images.filter(
        (_, index) => !removeIndices.includes(index)
      );
    }

    appendImages(pool, req.body.cover);

    await pool.save();
    res.redirect(`/pools/${pool.id}`);
  } catch (err) {
    console.error(err);
    if (pool != null) {
      renderEditPage(res, pool, true);
    } else {
      res.redirect("/");
    }
  }
});

function appendImages(pool, coversEncoded) {
  if (!coversEncoded) return;

  try {
    const covers = Array.isArray(coversEncoded)
      ? coversEncoded
      : [coversEncoded];

    const newImages = covers
      .map((coverEncoded) => {
        const cover = JSON.parse(coverEncoded);
        if (cover != null && imageMimeTypes.includes(cover.type)) {
          return {
            image: Buffer.from(cover.data, "base64"),
            imageType: cover.type,
          };
        }
      })
      .filter(Boolean);

    pool.images = pool.images.concat(newImages);
  } catch (err) {
    console.error("Error parsing cover data", err);
  }
}

function appendImages(pool, coversEncoded) {
  if (!coversEncoded) return;

  try {
    const covers = Array.isArray(coversEncoded)
      ? coversEncoded
      : [coversEncoded];

    const newImages = covers
      .map((coverEncoded) => {
        const cover = JSON.parse(coverEncoded);
        if (cover != null && imageMimeTypes.includes(cover.type)) {
          return {
            image: Buffer.from(cover.data, "base64"),
            imageType: cover.type,
          };
        }
      })
      .filter(Boolean);

    pool.images = pool.images.concat(newImages);
  } catch (err) {
    console.error("Error parsing cover data", err);
  }
}

// Delete Pool Page
router.delete("/:id", ensureAuthenticated, async (req, res) => {
  let pool;
  try {
    pool = await Pool.findById(req.params.id);
    await pool.deleteOne();
    res.redirect("/pools");
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

async function renderNewPage(res, pool, hasError = false) {
  renderFormPage(res, pool, "new", hasError);
}

async function renderEditPage(res, pool, hasError = false) {
  renderFormPage(res, pool, "edit", hasError);
}

async function renderFormPage(res, pool, form, hasError = false) {
  try {
    const params = { pool: pool };
    if (hasError) {
      params.errorMessage =
        form === "edit" ? "Error Updating Pool" : "Error Creating Pool";
    }
    res.render(`pools/${form}`, params);
  } catch {
    res.redirect("/pools");
  }
}

function saveImages(pool, coversEncoded, removeCover) {
  if (removeCover) {
    pool.images = [];
    return;
  }

  if (!coversEncoded) return;

  try {
    const covers = Array.isArray(coversEncoded)
      ? coversEncoded
      : [coversEncoded];

    const newImages = covers
      .map((coverEncoded) => {
        const cover = JSON.parse(coverEncoded);
        if (cover != null && imageMimeTypes.includes(cover.type)) {
          return {
            image: Buffer.from(cover.data, "base64"),
            imageType: cover.type,
          };
        }
      })
      .filter(Boolean);

    pool.images = pool.images.concat(newImages);
  } catch (err) {
    console.error("Error parsing cover data", err);
  }
}

module.exports = router;
