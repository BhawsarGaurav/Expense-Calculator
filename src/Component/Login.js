import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { FloatingLabel, Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/button";
import { useNavigate } from "react-router";
import SocialButton from "./SocialButton";
import { Link } from "react-router-dom";

export default function Login() {
  let flag = true;
  const [user, setUser] = useState();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3000/users").then(function (response) {
      setUser(response.data);
    });
  }, []);
  const checkdata = () => {
    const e = emailRef.current.value;
    const p = passwordRef.current.value;
    for (const u in user) {
      if (user[u]["email"] === e && user[u]["password"] === p) {
        alert("loggedIn Succsefull");
        localStorage.setItem("users", JSON.stringify(user[u]));
        flag = false;
        navigate(`/expensesTable`);
        break;
      }
    }
    if (flag) alert("check user id and password");
  };
  const handleSocialLogin = (users) => {
    console.log(users);
    let logineduser = user.find((i) => i.email === users._profile.email);
    let userIndex = user.indexOf(logineduser);
    if (userIndex + 1) {
      localStorage.setItem("users", JSON.stringify(user[userIndex]));
      navigate(`/expensesTable`);
    } else {
      const FormData = {
        name: users._profile.name,
        email: users._profile.email,
        uname: users._profile.firstName,
        password: "socialLogoin",
        budget: 0,
        expenses: [],
      };
      localStorage.setItem("users", JSON.stringify(FormData));
      axios.post("http://localhost:3000/users", FormData);
      navigate("expensesTable");
    }
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };
  return (
    <div>
      <Container
        style={{
          width: "50%",
          marginTop: "10%",
          border: "1px solid grey",
          padding: "50px",
        }}
      >
        <h1
          style={{
            color: "black",
            marginBottom: "10px",
            fontFamily: "bolder",
            textAlign: "center",
          }}
        >
          Login Page
        </h1>
        <FloatingLabel label="Email" className="mb-3">
          <Form.Control
            type="email"
            id="email"
            ref={emailRef}
            placeholder="name@example.com"
          />
        </FloatingLabel>
        <FloatingLabel label="Password">
          <Form.Control
            type="password"
            id="password"
            ref={passwordRef}
            placeholder="Password"
          />
        </FloatingLabel>

        <Container style={{ textAlign: "center" }}>
          <Button
            className="mt-3"
            style={{ width: "50%" }}
            onClick={() => checkdata()}
          >
            Login
          </Button>
        </Container>
        <p>
          If not Registerd <Link to="/registration">Register Here</Link>
        </p>
        <SocialButton
          provider="google"
          appId="737566999311-l1k9ivh20a7lqpfoaardq2m7avkgm3qt.apps.googleusercontent.com"
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
        >
          Login with Google
        </SocialButton>
      </Container>
    </div>
  );
}
