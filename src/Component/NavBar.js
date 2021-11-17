import React from "react";
import axios from "axios";
import { Box, AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const logout = () => {
    const user = JSON.parse(localStorage.getItem("users"));

    axios.put(`http://localhost:3000/users/${user.id}`, user);
    localStorage.removeItem("users");
    navigate(`/`);
  };
  return (
    <div>
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Box sx={{ justifyContent: "center", flexGrow: 1 }}>
                <Link
                  to="/calculator"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Calculator
                </Link>
                <Link
                  to="/expensestable"
                  className="mx-3"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  ADDExpense
                </Link>
                <Link
                  to="/eTable"
                  className="mx-3"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Expense Table
                </Link>
              </Box>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button
                  onClick={() => logout()}
                  variant="contained"
                  color="error"
                >
                  Logout
                </Button>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
      </>
    </div>
  );
}
