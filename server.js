const express = require("express");
const fetch = require("node-fetch");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.get("/jobs", async (req, res) => {
const workdayUrl =
"https://wd3-services1.myworkday.com/ccx/service/customreport2/checkout/ISU_INT058+Career+Site+Jobs/INT058_Jobs_on_Careers_Site_RAAS?format=json";

const username = process.env.WORKDAY_USERNAME;
const password = process.env.WORKDAY_PASSWORD;

const auth = Buffer.from(`${username}:${password}`).toString("base64");

try {
const response = await fetch(workdayUrl, {
headers: {
Authorization: `Basic ${auth}`,
},
});

if (!response.ok) {
throw new Error(`Workday API error: ${response.status} ${response.statusText}`);
}

const data = await response.json();

res.setHeader("Access-Control-Allow-Origin", "*");
res.json(data);
} catch (err) {
console.error("Error fetching Workday data:", err.message);
res.status(500).json({ error: err.message });
}
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
