const express = require("express");
const router = express.Router();
const Pool = require("../models/pool");

router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    // Fetch necessary data from the database
    const allPools = await Pool.find().exec();
    const allBodiesOfWater = allPools.length;
    const newBoWCount = allPools.filter(
      (pool) => pool.status === "New BoW"
    ).length;
    const receivedCount = allPools.filter(
      (pool) => pool.status === "Received"
    ).length;
    const ongoingCount = allPools.filter(
      (pool) => pool.status === "Ongoing"
    ).length;
    const improvingCount = allPools.filter(
      (pool) => pool.status === "Improving"
    ).length;
    const almostCount = allPools.filter(
      (pool) => pool.status === "Almost"
    ).length;
    const closedCount = allPools.filter(
      (pool) => pool.status === "Closed"
    ).length;
    const followUp1Count = allPools.filter(
      (pool) => pool.status === "Follow-up 1"
    ).length;
    const followUp2Count = allPools.filter(
      (pool) => pool.status === "Follow-up 2"
    ).length;
    const noUpdateCount = allPools.filter(
      (pool) => pool.status === "No update"
    ).length;
    // Add more counts as needed for other statuses

    res.render("index", {
      allBodiesOfWater,
      newBoWCount,
      receivedCount,
      ongoingCount,
      improvingCount,
      almostCount,
      closedCount,
      followUp1Count,
      followUp2Count,
      noUpdateCount,
    });
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
