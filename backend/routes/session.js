const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

router.get("/", async (req, res) => {
  try {
    const sessions = await Event.aggregate([
      {
        $group: {
          _id: "$session_id",
          totalEvents: { $sum: 1 },
          firstSeen: { $min: "$timestamp" },
          lastSeen: { $max: "$timestamp" }
        }
      },
      {
        $sort: {
          lastSeen: -1
        }
      }
    ]);

    res.json(sessions);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/:sessionId/events", async (req, res) => {
  try {
    const events = await Event.find({
      session_id: req.params.sessionId
    }).sort({ timestamp: 1 });

    if (events.length === 0) {
      return res.status(404).json({
        message: "Session not found"
      });
    }
    const session = {
      session_id: req.params.sessionId,
      first_seen: events[0].timestamp,
      last_seen: events[events.length - 1].timestamp,
      event_count: events.length
    };

    res.json({
      session,
      events
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;