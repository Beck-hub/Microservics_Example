// we need to import our dependencies' libraries

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = module.exports = express();

app.use(bodyParser.json());
app.use(cors());
// /api/timestamp/:date_string?
// unix: date.getime()
// utc: date.toUTCString()

// Get Call to return JSON that formats natural and unix date
app.get("/dateValues/:dateVal", (req,res,next) => {
    //gets the request data for date
    var dateVal = req.params.dateVal;
    //Options for formatting date in natural date view
    var dateFormattingOptions = {
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    if(isNaN(dateVal)) {
        var naturalDate = new Date(dateVal);
        naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
        var unixDate = new Date(dateVal).getTime()/1000;
    } else {
        var unixDate = dateVal;
        var naturalDate = new Date(dateVal * 1000);
        naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
    }
    res.json({
        unix: unixDate,
        natural: naturalDate
    })
})
//post man
app.listen(process.env.PORT || 3000, () => {
    console.log("My server is working")
})

