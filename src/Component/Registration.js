import React from "react";
import { Form, Alert } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+.[^\s@]+$/);
const regForName = RegExp(/^[a-zA-Z]/);
const regForpassword = RegExp(
  "^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*])(?=.{8,})"
);

export default function Registration() {
  const navigate = useNavigate();
  const nameRef = useRef("");
  const [error, seterror] = useState("");
  const emailRef = useRef("");
  const unameRef = useRef("");
  const enquiryRef = useRef("");
  const passwordRef = useRef("");
  const conpasswordRef = useRef("");

  const Validate = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "fname":
        let error = regForName.test(value) ? "" : "Name should be character";
        seterror(error);
        break;
      case "uname":
        let error1 = regForName.test(value)
          ? ""
          : "UserName should be character";
        seterror(error1);
        break;
      case "email":
        let error2 = regForEmail.test(value) ? "" : "Enter Correct Email-Id";
        seterror(error2);
        break;
      case "password":
        let error3 = regForpassword.test(value) ? "" : "Check Password Format";
        seterror(error3);
        break;
      case "conpassword":
        let error4 =
          passwordRef === conpasswordRef ? "" : "password id not matched";
        seterror(error4);
        break;
      default:
        seterror("formSubmited");
    }
  };
  const AddData = () => {
    const FormData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      uname: unameRef.current.value,
      password: passwordRef.current.value,

      budget: 0,
      expenses: [],
    };

    axios.post("http://localhost:3000/users", FormData);
    
    localStorage.setItem("users", JSON.stringify(FormData));
    nameRef.current.value = "";
    emailRef.current.value = "";
    unameRef.current.value = "";
    passwordRef.current.value = "";
    conpasswordRef.current.value = "";
    enquiryRef.current.value = "";
    navigate(`/expensesTable`);
  };
  return (
    <div style={{"width":'70%',marginLeft:"80px",marginTop:'5%',border:"black solid 2px"}}>
    <h3>Register Here</h3>
      <Form className="m-5">
        <Form.Label>
          {error.length > 1 && <Alert severity="danger">{error}</Alert>}
        </Form.Label>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fname"
            ref={nameRef}
            placeholder="Enter Full Name"
            onChange={Validate}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> UserName</Form.Label>
          <Form.Control
            type="text"
            name="uname"
            ref={unameRef}
            placeholder="Enter UserName"
            onChange={Validate}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={Validate}
            name="email"
            type="email"
            ref={emailRef}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            ref={passwordRef}
            placeholder="Enter Password"
            onChange={Validate}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="conpassword"
            ref={conpasswordRef}
            placeholder="Confirm Password"
            onChange={Validate}
          />
        </Form.Group>

        

        <Button variant="primary" onClick={() => AddData()}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
