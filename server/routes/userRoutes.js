const express = require("express");
const {
   addToLikedMovies,
   getLikedMovies,
   removedFromLikedMovies,
} = require("../controllers/userController");

const Router = express.Router();

//api/user/add
Router.post("/add", addToLikedMovies);
//api/user/get/movies
Router.get("/get/movies/:email", getLikedMovies);
//api/user/remove
Router.put("/remove", removedFromLikedMovies);

module.exports = Router;
