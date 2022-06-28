import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./Header.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addTodo } from "../../features/todoSlice";

const Header = () => {
  const dispatch = useDispatch(); 

  const [text, setText] = useState("");

  const handlerChange = (e) => {
    setText(e.target.value);
  };

  const handlerTask = () => {
    if (text !== "") {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <div className="Header">
      <h1 className="header_text">ToDoList</h1>
      <InputGroup className="mb-3">
        <Form.Control
          value={text} 
          placeholder="Write ToDo"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(e) => handlerChange(e)}
        />
        <Button
          variant="secondary"
          id="button-addon2"
          className="button_add"
          onClick={handlerTask}
        >
          Add
        </Button>
      </InputGroup>
    </div>
  );
};

export default Header;
