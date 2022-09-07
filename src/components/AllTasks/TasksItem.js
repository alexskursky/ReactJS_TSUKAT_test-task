import React, { useState, useRef } from "react";
import Button from "../UI/Button";
import classes from "./TasksItem.module.css";
import { useDispatch } from "react-redux";
import { deleteTasks, patchTasks } from "../../store/tasks";

const TasksItem = (props) => {
  const [change, setChange] = useState(false);
  const [status, setStatus] = useState(null);
  const dispatch = useDispatch();
  const titleRef = useRef();
  const descriptionRef = useRef();

  const taskDate = new Date(props.date).toLocaleString();

  const deleteTaskHandler = () => {
    dispatch(deleteTasks(props.id));
  };

  const changeTaskHandler = () => {
    setChange((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setStatus(null);
    if (
      titleRef.current.value.trim().length === 0 ||
      descriptionRef.current.value.trim().length === 0
    ) {
      setStatus("Error: All fields are required!");
      return;
    }
    dispatch(
      patchTasks({
        id: props.id,
        task: {
          title: titleRef.current.value,
          description: descriptionRef.current.value,
          date: new Date().getTime(),
        },
      })
    );
    setChange(false);
    setStatus("Task was updated!");
  };
  return (
    <li>
      {change ? (
        <form onSubmit={submitHandler} className={classes.form}>
          <label htmlFor="title">Task title</label>
          <input
            id="title"
            type="text"
            ref={titleRef}
            defaultValue={props.title}
          />
          <label htmlFor="description">Task description</label>
          <input
            id="description"
            type="text"
            ref={descriptionRef}
            defaultValue={props.description}
          />
          {status && <p>{status}</p>}
          <Button type="submit">Update Task</Button>
        </form>
      ) : (
        <>
          <h3>{props.title}</h3>
          <p>{props.description}</p>
          <p>
            <i>Updated at: {taskDate}</i>
          </p>
          <div className={classes.tasks__buttons}>
            <Button onClick={changeTaskHandler}>Change Task</Button>
            <Button onClick={deleteTaskHandler}>Delete Task</Button>
          </div>
        </>
      )}
    </li>
  );
};

export default TasksItem;
