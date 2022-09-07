import React, { useRef, useState } from "react";
import { postTasks } from "../../store/tasks";
import { useDispatch } from "react-redux";
import classes from "./NewTask.module.css";
import Button from "../UI/Button";

const NewTask = () => {
  const [status, setStatus] = useState(null);
  const dispatch = useDispatch();
  const titleRef = useRef();
  const descriptionRef = useRef();

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
      postTasks({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        date: new Date().getTime(),
      })
    );
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    setStatus("New task was created!");
  };
  return (
    <div>
      <form onSubmit={submitHandler} className={classes.form}>
        <label htmlFor="title">Task title</label>
        <input id="title" type="text" ref={titleRef} />
        <label htmlFor="description">Task description</label>
        <input id="description" type="text" ref={descriptionRef} />
        {status && <p>{status}</p>}
        <Button type="submit">Create Task</Button>
      </form>
    </div>
  );
};

export default NewTask;
