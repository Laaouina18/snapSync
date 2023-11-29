import app from "./app.js";

const port = process.env.port || 5000;
// listen to server
app.listen(port, function () {
    console.log("Server listening on port " + port + "...");
});
