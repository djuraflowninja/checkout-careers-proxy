const express = require("express");
const fetch = require("node-fetch");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.get("/jobs", async (req, res) => {
  const workdayUrl =
    "https://wd3-impl-services1.workday.com/ccx/service/customreport2/checkout7/ISU_INT058+Career+Site+Jobs/INT058_Job_Details_from_Career_Site_for_Agency_Publishing_RAAS?format=json";

  const username = process.env.WORKDAY_USERNAME;
  const password = process.env.WORKDAY_PASSWORD;
  const auth = Buffer.from(`${username}:${password}`).toString("base64");

  try {
    const response = await fetch(workdayUrl, {
      headers: { Authorization: `Basic ${auth}` }
    });
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(data);
  } catch (err) {
    console.error("Workday fetch error:", err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
