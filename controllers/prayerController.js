//It is used to handle what to  do with the incoming request

const jwt = require("jsonwebtoken");
const prayerModel = require("../models/prayerModel");


//prayer controllers
exports.insertPrayer = async (req, res) => {
  const { name, time } = req.body;

  try {
    await prayerModel.insertNewPrayer(name, time);
    res.send("Prayer added successfully!");
  } catch (error) {
    console.error("Error in inserting prayer:", error);
    res.status(500).send("Error adding prayer.");
  }
};

exports.getPrayers = async (req, res) => {
  try {
    const prayers = await prayerModel.getAllPrayers();
    res.json(prayers);
  } catch (error) {
    console.error("Error in fetching prayers:", error);
    res.status(500).send("Error fetching prayers.");
  }
};
