// Install libs with: npm i chartjs-node-canvas chart.js
// Docs https://www.npmjs.com/package/chartjs-node-canvas
// Config documentation https://www.chartjs.org/docs/latest/axes/
const express = require("express");
const app = express();
const path = require("path");

const fs = require('fs');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const multer = require('multer')

const width = 400; //px
const height = 400; //px
const backgroundColour = 'white'; // Uses https://www.w3schools.com/tags/canvas_fillstyle.asp
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour});

const configuration = {
    type: 'line',   // for line chart
    data: {
        labels: [0, 2, 4, 6, 8, 10, 12, 14],
        datasets: [{
            label: "Line Chart Example",
            data: [0,100, 120, 240, 408, 700, 650],
            fill: false,
            borderColor: ['rgb(51, 204, 204)'],
            borderWidth: 1,
            xAxisID: 'xAxis1' //define top or bottom axis ,modifies on scale
        }
        ],

    }
}

async function run() {
    const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
    const base64Image = dataUrl

    var base64Data = base64Image.replace(/^data:image\/png;base64,/, "");


    fs.writeFile("out.png", base64Data, 'base64', function (err) {
        if (err) {
            console.log(err);
        }
        // const upload = "data:image/png;base64,"+fs.readFileSync("out.png", 'base64');
        // console.log(upload);
    });
    return dataUrl
}

app.get("/getFile", async (req, res) => {
    try{
        console.log("1");
        const data = await run();
        console.log(data);
        console.log(path.join(__dirname, "out.png"));
        res.sendFile(path.join(__dirname, "out.png"));
    } catch(e) {
        console.log("error", e);
    }
})

app.listen("4000", () => {
    console.log("server running on port: ", 4000);
})