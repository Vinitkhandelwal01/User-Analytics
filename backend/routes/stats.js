const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

router.get("/", async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const totalClicks = await Event.countDocuments({
      event_type: "click",
    });
    const totalPageViews = await Event.countDocuments({
      event_type: "page_view",
    });
    const sessions = await Event.distinct("session_id");
    res.json({
      total_sessions: sessions.length,
      total_events: totalEvents,
      total_clicks: totalClicks,
      total_page_views: totalPageViews,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch stats",
    });
  }
});

module.exports = router;