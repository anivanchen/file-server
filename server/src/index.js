// Requirements

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const pool = require('../database');

const app = express();
const port = 8000;

// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// Authentification

app.post("/login", async (req, res) => {
    var password = (JSON.stringify(req.body.password).replace('{"password":"', "")).replace('"}', "");
    try {
        if (await bcrypt.compare(password, '$2b$10$x7ooVL3XoeTX41WsY2.G/ussJbTskyB8EVXZHGZ.pP/gUTLj2qPKa')) { // hash stored in script is temporary
            console.log("Allowed")
            res.send({
                token: 'test123'
            });
        } else {
            res.send("Login not allowed")
        }
    } catch (error) {
        console.error(error);
        console.error('fail')
        res.status(500).send("Login failure")
    }
});

app.get("/logout", (req, res) => {
    activeSession = false;
    res.redirect('/login');
});

// Routes

// Add file

app.post("/dashboard", async (req, res) => {

    try {

        const { file_title, file_owner, file_data } = req.body;

        const newFile = await pool.query(
            "INSERT INTO file (file_title, file_owner, file_data) VALUES ($1, $2, $3) RETURNING *",
            [file_title, file_owner, file_data]
        );

        res.json(newFile.rows[0]);

    } catch (error) {
        console.error(error);
    }

});

// Get all file information to display

app.get("/dashboard", async (req, res) => {

    try {

        const allFiles = await pool.query(
            "SELECT * FROM file"
        );

        res.json(allFiles.rows);

    } catch (error) {
        console.error(error);
    }

});

// Get a file

app.get("/dashboard/:file_id", async (req, res) => {

    try {

        const { file_id } = req.params;
        const file = await pool.query(
            "SELECT * FROM file WHERE file_id = $1",
            [file_id]
        );

        res.json(file.rows[0]);

    } catch (error) {
        console.error(error);
    }

});

// Delete a file

app.delete("/dashboard/:file_id", async (req, res) => {

    try {

        const { file_id } = req.params;
        const deleteFile = await pool.query(
            "DELETE FROM file WHERE file_id = $1",
            [file_id]
        );

        res.json("file deleted.");

    } catch (error) {
        console.error(error);
    }

});

// Update Title

app.put("/dashboard/:file_id", async (req, res) => {

    try {

        const { file_id } = req.params;
        const { file_title } = req.body;
        console.log(file_title)
        const updateTitle = await pool.query(
            "UPDATE file SET file_title = $1 WHERE file_id = $2",
            [file_title, file_id]
        );

        res.json("file_title was updated.");

    } catch (error) {
        console.error(error);
    }

});

// Start server

app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
});