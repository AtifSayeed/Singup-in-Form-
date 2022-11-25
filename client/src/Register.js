import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const changeHandler = 
  return (
    <div>
      <center>
        <form>
          <h3>Register</h3>
          <input type="text" name="username" placeholder="User Name" />
          <br />
          <input type="email" name="email" placeholder="Email" />
          <br />
          <input type="password" name="password" placeholder="Password" />
          <br />
          <input type="password" name="confirmPassword" placeholder="Confirm Password"/>
          <br />
          <input type="submit" value="Register" />
          <br />
        </form>
      </center>
    </div>
  );
};

export default Register;
