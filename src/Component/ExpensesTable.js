import React from "react";
import { Button, Row, Container, Col } from "react-bootstrap";

import { Form } from "react-bootstrap";
import { useRef } from "react";
import NavBar from "./NavBar";

export default function ExpensesTable() {
  const budgetRef = useRef(null);
  const titleRef = useRef(null);
  const amountRef = useRef(null);

  let user = JSON.parse(localStorage.getItem("users"));

  const AddBudget = () => {
    user = JSON.parse(localStorage.getItem("users"));
    const budget = parseInt(budgetRef.current.value);
    if (budget !== undefined) {
      user.budget = user.budget + budget;
    }
    localStorage.setItem("users", JSON.stringify(user));
    budgetRef.current.value = "";
  };
  const AddExpenses = () => {
    user = JSON.parse(localStorage.getItem("users"));
    const title = titleRef.current.value;
    const amount = parseInt(amountRef.current.value);
    const expense = { title: title, amount: amount };
    user.expenses = [...user.expenses, expense];
    console.log(user);
    localStorage.setItem("users", JSON.stringify(user));
    amountRef.current.value = "";

    titleRef.current.value = "";
  };

  return (
    <>
      <div>
        <NavBar />

        <Container>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Enter Budget</Form.Label>
                  <Form.Control
                    type="number"
                    name="budget"
                    ref={budgetRef}
                    placeholder="Enter your budget"
                  />
                </Form.Group>
                <Button onClick={() => AddBudget()}>Submit</Button>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Enter Expense title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    ref={titleRef}
                    placeholder="Enter your expense title"
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Enter amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    ref={amountRef}
                    placeholder="Enter amount"
                  />
                </Form.Group>
              </Form>
              <Button onClick={() => AddExpenses()}>Submit</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
