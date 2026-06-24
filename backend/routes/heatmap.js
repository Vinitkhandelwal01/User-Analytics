const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

router.get("/", async (req, res) => {
  try {
    const clicks = await Event.find({
      page_url: req.query.url,
      event_type: "click"
    });
    res.json({clicks});
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/pages", async (req, res) => {
  const pages = await Event.distinct(
    "page_url",
    { event_type: "click" }
  );
  res.json({ pages });
});

module.exports = router;