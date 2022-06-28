import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import CloseButton from "react-bootstrap/CloseButton";
import "./List.css";
import { useEffect } from "react";
import { changeTodo, fetchTodos, removeTodo } from "../../features/todoSlice";

import CircularProgress from "@mui/material/CircularProgress";

const List = () => {
  const todos = useSelector((state) => state.todos); 
  const proccesing = useSelector((state) => state.proccesing); //ключ,который необходим для proloader при загрузке странички

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]); //загрузка тудушек с сервера. Второй аргумент [dispatch] нужен, чтобы предотвратить бесконенчый цикл 

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  }; //передаём в reducer id для удаления

  const handleChangeTask = (todo) => {
    dispatch(changeTodo(todo));
  }; //передаём в reducer всю тудушку для изменения её ключа

  return (
    <div className="list">
      {todos.map((element) => { 
        return (
          <div key={element._id} className="todo">
            {element.proccesing ? (                //Если идём обработка запроса, то proccessing равен true и появляется кружок загрузки
              <div className="circular">
                <CircularProgress color="primary" />
              </div>
            ) : (
              <InputGroup
                className={element.completed ? "completed" : "no_completed"}
              >
                <button
                  className="button_completed"
                  onClick={() => handleChangeTask(element)}
                >
                  ✔
                </button>
                <div className="todo_text">{element.text}</div>
                <CloseButton
                  onClick={() => handleRemoveTodo(element._id)}
                ></CloseButton>
              </InputGroup>
            )}
          </div>
        );
      })}
      {proccesing && (
        <div className="circular"> 
          <CircularProgress color="primary" /> 
        </div>
      )}
    </div>
  );
};

export default List;
