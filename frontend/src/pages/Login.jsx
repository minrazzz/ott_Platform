import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [error, setError] = useState(null);
   const [formValues, setFormValues] = useState({
      email: "",
      password: "",
   });

   const handleLogin = async () => {
      try {
         const { email, password } = formValues;
         await signInWithEmailAndPassword(firebaseAuth, email, password);
      } catch (error) {
         console.log(error);
         setError(error.message);
      }
   };
   const navigate = useNavigate();
   onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
   });

   return (
      <Container>
         <BackgroundImage />
         <div className="content">
            <Header Signup />
            <div className="form-container flex column a-center j-center">
               <div className="form flex column a-center j-center">
                  <div className="title">
                     <h3>Login</h3>
                  </div>
                  <div className="container flex column">
                     <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={formValues.email}
                        onChange={(e) =>
                           setFormValues((prev) => ({
                              ...prev,
                              email: e.target.value,
                           }))
                        }
                     />

                     <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formValues.password}
                        onChange={(e) =>
                           setFormValues((prev) => ({
                              ...prev,
                              password: e.target.value,
                           }))
                        }
                     />

                     {error && (
                        <h3 className="error">Invalid Email or Password</h3>
                     )}

                     <button onClick={handleLogin}>Login</button>
                  </div>
               </div>
            </div>
         </div>
      </Container>
   );
};

export default Login;

const Container = styled.div`
   position: relative;
   .content {
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      height: 100vh;
      width: 100vw;
      display: grid;
      grid-template-rows: 15vh 85vh;

      .form-container {
         gap: 2rem;
         height: 85vh;
         .form {
            padding: 2rem;
            background-color: #000000b0;
            width: 25vw;
            gap: 2rem;
            color: white;
            .container {
               gap: 2rem;
               input {
                  padding: 0.5rem 1rem;
                  width: 15rem;
               }
               button {
                  padding: 0.5rem 1rem;
                  background-color: #e50914;
                  border: none;
                  cursor: pointer;
                  color: white;
                  font-weight: bolder;
                  font-size: 1.05rem;
               }
            }
         }
      }
   }
`;
