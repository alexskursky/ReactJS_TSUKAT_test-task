import React from "react";
import TasksItem from "./TasksItem";
import classes from "./TasksList.module.css";

const TasksList = (props) => {
  return (
    <ul className={classes.tasks__list}>
      {props.tasks.map((item) => (
        <TasksItem
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          date={item.date}
        />
      ))}
    </ul>
  );
};

export default TasksList;
