import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../store/tasks";
import TasksList from "./TasksList";
import classes from "./AllTasks.module.css";

const AllTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  return (
    <div className={classes.tasks}>
      {loading ? <p>Loading Tasks...</p> : <TasksList tasks={tasks} />}
    </div>
  );
};

export default AllTasks;
