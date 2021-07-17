const mongoose = require("mongoose");

// user schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },
  name: {
    type: String,
    required: false,
    unique: false,
  },
  code: {
    time: {
      type: String,
      required: [true, "Please provide generated code!"],
      unique: false,
    },
    expire: {
      type: Date,
      required: [true, "Please provide expiration date"],
      unique: false,
    }
  },
  lastLogin: {
    type: Date,
    required: [true, "Please provide login date"],
    unique: false,
  }
});

// export UserSchema
module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);