const express = require("express");
const { google } = require('googleapis')
require('dotenv').config()
const app = express();
const port = process.env.PORT;

app.use(express.json()) 

const scopes = ['https://www.googleapis.com/auth/spreadsheets'];
const auth = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes
  );
const sheets = google.sheets({ version: 'v4', auth });


app.use("/", express.static(__dirname + '/public/spanish'));
app.use("/en", express.static(__dirname + '/public/english'));

app.use('/assets', express.static(__dirname + '/public/assets'));
  

// Define route handler for form submission
app.post('/submit-wedding-form', async (req, res) => {
  try {
    const defaultValue = '';
    // Parse form data from request body
    const { 
      name, 
      attending, 
      impediments = defaultValue, 
      bus_in = defaultValue, 
      bus_out = defaultValue, 
      comments = defaultValue, 
      email = defaultValue
    } = req.body;
    // Write data to Google Sheet
    const range = 'Sheet1!A1';
    const values = [[name, attending, impediments, bus_in, bus_out, comments, email]];
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: range,
      valueInputOption: 'USER_ENTERED',
      resource: { values: values },
    });
    // Send response to client
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
