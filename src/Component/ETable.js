import React from 'react'
import NavBar from './NavBar';
import {useState,useRef} from "react"
import {Table,Button} from "react-bootstrap"
import { Form } from 'react-bootstrap'
export default function ETable() {
    const[index,setIndex]=useState(0);
    
    const[userdata,setUserData]=useState([]);
    const [show, setShow] = useState(false);
    const titleRef=useRef(null);
    const amountRef=useRef(null);
    const handleClose = () =>{

      setShow(false);
      let user1=JSON.parse(localStorage.getItem("users"));
      const title=titleRef.current.value;
      const amount=parseInt(amountRef.current.value);
      const expense={title:title,amount:amount}
      user1.expenses[index]=expense;
     
      localStorage.setItem("users",JSON.stringify(user1));
        titleRef.current.value="";
        amountRef.current.value="";
    } 
    const handleShow = (i) =>{ setShow(true);
      setIndex(i);
      let user1=JSON.parse(localStorage.getItem("users"));
      const exp=user1.expenses[index];
      console.log(exp);
      titleRef.current.value=exp.title;
      amountRef.current.value=exp.amount;
    }
  
       let user=JSON.parse(localStorage.getItem("users"));
        console.log(user);

    const deleteE=(i)=>{
        let user = JSON.parse(localStorage.getItem('users'))
        const bool = window.confirm("Do You really want to delele this?")
        if (bool == true) {
            user.expenses.splice(i, 1)
            
            localStorage.setItem('users', JSON.stringify(user));
        }
         user = JSON.parse(localStorage.getItem('users'))
        const userd = user.expenses
        setUserData([...userd]);
        console.log(userdata)
    }
    return (
        <div>
            <NavBar/>
        <Table striped bordered hover size="sm">
        <thead>
            <tr>
              <th>S No.</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
        {user.expenses.map((ex,i)=>

       
          
         
            <tr key={ex.id}>
              <td>{i}</td>
              <td>{ex.title}</td>
              <td>{ex.amount}</td>
              <td><button  onClick={()=>handleShow(i)}>Update</button><button onClick={()=>deleteE(i)}>Delete</button></td>
            </tr>
            
         
          
        )}
        </tbody>
          </Table> 
          {/* {show? */}
         <div style={{width:"600px","border":"black solid 2px","marginTop":20}}>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Expense title</Form.Label>
        <Form.Control
        id="title"
          type="text"
          name="title"
          ref={titleRef}
          placeholder="Enter your expense title"
        />
      </Form.Group>
   
        
        
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter amount</Form.Label>
        <Form.Control
        id="amount"
          type="number"
          name="amount"
          ref={amountRef}
          placeholder="Enter amount"
        />
      </Form.Group>
      </Form>
      
        
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
          </div>
        {/* : ""} */}
      
        </div>
    )
}
