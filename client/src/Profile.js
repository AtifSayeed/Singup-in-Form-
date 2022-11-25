import React, { useContext, useState, useEffect } from "react";
import { store } from "./App";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [token, setToken] = useContext(store);
  useEffect(()=>{
    axios.get('http://localhost:3000/profile')
    // headers: {
    //   'x-token': token
    // }
  },[])
  if (!token) {
    return <Redirect to="./login" />;
  }
  return (
    <div>
      <center>Welcome to Dashboard !!</center>
    </div>
  );
};

export default Profile;
