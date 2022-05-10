const mongoose = require("mongoose");

const styleSchema = mongoose.Schema({
  styleName: {
    type: String,
    required: true,
  },
  styleOrder: {
    type: Number,
    required: true,
  },
});
mongoose.model("Styles", styleSchema);
