const userModel = require("../models/userModel");

//add likedMovies
const addToLikedMovies = async (req, res) => {
   try {
      const { email, data } = req.body;
      console.log(email, data);
      const user = await userModel.findOne({ email });

      if (!user) {
         const createUser = await userModel.create({
            email,
            likedMovies: [data],
         });
         res.status(201).json({
            success: true,
            message: "movies Successfully added",
         });
      }
      const { likedMovies } = user;

      const moviesAlreadyLiked = likedMovies.find(({ id }) => id === data.id);

      if (!moviesAlreadyLiked) {
         await userModel.findByIdAndUpdate(
            user._id,
            {
               likedMovies: [...user.likedMovies, data],
            },
            { new: true }
         );
         res.status(200).json({
            success: true,
            likedMovies,
         });
      } else {
         res.json({
            success: false,
            message: "movie already added to the liked list",
         });
      }
   } catch (error) {
      console.log(error);
   }
};

//getlikedMovies
const getLikedMovies = async (req, res) => {
   try {
      const { email } = req.params;
      const user = await userModel.findOne({ email });
      if (!user) {
         res.json({
            message: "invalid email",
         });
      }
      res.json({
         success: true,
         movies: user.likedMovies,
      });
      console.log(user);
   } catch (error) {
      console.log(error);
   }
};

const removedFromLikedMovies = async (req, res) => {
   try {
      const { email, movieId } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
         res.json({
            success: false,
            message: "invalid email",
         });
      }
      const { likedMovies } = user;
      const movieIndex = await likedMovies.findIndex(
         ({ id }) => id === movieId
      );

      if (!movieIndex) res.status(400).send({ message: "movies not found" });
      likedMovies.splice(movieIndex, 1);
      await userModel.findByIdAndUpdate(
         user._id,
         {
            likedMovies: likedMovies,
         },
         { new: true }
      );
      res.json({
         message: "movies deleted successfully",
         likedMovies,
      });
   } catch (error) {
      console.log(error);
   }
};

module.exports = {
   addToLikedMovies,
   getLikedMovies,
   removedFromLikedMovies,
};
