const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
});

personSchema.pre("save", async function (next) {
  const person = this;
  // If the password is not modified, skip hashing
  if (!person.isModified("password")) return next();

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    person.password = await bcrypt.hash(person.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  const person = this;

  try {
    const ismatch = await bcrypt.compare(candidatePassword, person.password);
    return ismatch;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("Person", personSchema);
