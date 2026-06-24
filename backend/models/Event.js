const mongoose=require("mongoose");
const eventSchema=new mongoose.Schema(
  {
    session_id: {
      type: String,
      required: true,
      index: true,
    },
    event_type:{
      type: String,
      enum: ["page_view", "click"],
      required: true,
    },
    page_url:{
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
    },
    click_x: {
      type: Number,
      default: null,
    },
    click_y: {
      type: Number,
      default: null,
    }
  },
  {
    timestamps: true,
  }
);

eventSchema.index({ session_id: 1, timestamp: 1 });

eventSchema.index({ page_url: 1, event_type: 1 });

module.exports = mongoose.model("Event", eventSchema);
