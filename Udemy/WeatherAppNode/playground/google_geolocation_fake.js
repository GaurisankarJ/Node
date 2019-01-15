const express = require("express");
var app = express();

app.get("/location_data", (req, res) => {
    res.json({
        results: [
            {
                formatted_address: req.query.address,
                geometry: {
                    location: {
                        lat: "10.850516",
                        lng: "76.271080"
                    }
                }
            }
        ]
    });
});

app.listen(3000, () => {
    console.log("Application is listening on port 3000!");
});