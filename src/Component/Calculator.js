import React from "react";
import NavBar from "./NavBar";
import { Card, Row, Container, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
export default function Calculator() {
  const [budget, setBudget] = useState(0);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("users"));
    setBudget(user.budget);
    let totalAmount = 0;
    user.expenses.map((ex) => {
      totalAmount += ex.amount;
    });
    setAmount(totalAmount);

    setBalance(user.budget - totalAmount);
  }, []);
  return (
    <div>
      <NavBar />

      <div className="mt-5">
        <Container>
          <Row>
            <Col>
              <Card style={{ width: "18rem", marginBottom: "10px" }}>
                <Card.Body>
                  <Card.Title>Budject</Card.Title>
                  <AttachMoneyIcon
                    style={{ fontSize: 50, textAlign: "center" }}
                  />
                  <Card.Text style={{ fontWeight: "bold" }}>
                    ${budget}
                  </Card.Text>
                  <Card.Text></Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "18rem", marginBottom: "10px" }}>
                <Card.Body>
                  <Card.Title>Balance</Card.Title>
                  <AccountBalanceWalletIcon
                    style={{ fontSize: 50, textAlign: "center" }}
                  />
                  <Card.Text style={{ fontWeight: "bold" }}>
                    ${balance}
                  </Card.Text>
                  <Card.Text></Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "18rem", marginBottom: "10px" }}>
                <Card.Body>
                  <Card.Title>Amount</Card.Title>
                  <LocalAtmIcon style={{ fontSize: 50, textAlign: "center" }} />
                  <Card.Text style={{ fontWeight: "bold" }}>
                    ${amount}
                  </Card.Text>
                  <Card.Text></Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
