import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsersLikedMovies } from "../store";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

const UserLiked = () => {
   const movies = useSelector((state) => state.netflix.movies);
   const [isScrolled, setIsScrolled] = useState(false);
   const navigate = useNavigate();
   console.log(movies);
   const [email, setEmail] = useState(undefined);
   onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) setEmail(currentUser.email);
      else navigate("/login");
   });

   const dispatch = useDispatch();

   useEffect(() => {
      if (email) {
         dispatch(getUsersLikedMovies(email));
         console.log(email);
      }
   }, [email]);

   window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
   };

   return (
      <Container>
         <Navbar isScrolled={isScrolled} />
         <div className="content flex column">
            <h1>My List</h1>
            <div className="grid flex">
               {movies.map((movie, index) => {
                  return (
                     <Card
                        movieData={movie}
                        index={index}
                        key={movie.id}
                        isLiked={true}
                     />
                  );
               })}
            </div>
         </div>
      </Container>
   );
};

export default UserLiked;

const Container = styled.div`
   .content {
      margin-left: 5rem;
      margin-top: 8rem;
      gap: 3rem;
      h1 {
         margin-left: 3rem;
      }
      .grid {
         flex-wrap: wrap;
         gap: 0.5rem;
      }
   }
`;
