const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

router.post("/", async (req, res) => {
  try {
    const {
      session_id,
      event_type,
      page_url,
      timestamp,
      click_x,
      click_y
    } = req.body;

    const event = await Event.create({
      session_id,
      event_type,
      page_url,
      timestamp,
      click_x: click_x ?? null,
      click_y: click_y ?? null
    });

    res.status(201).json({ success: true, event_id: event._id });
  } catch (err) {
    console.error("Error saving event:", err);
    res.status(500).json({ error: "Failed to save event" });
  }
});

module.exports = router;
