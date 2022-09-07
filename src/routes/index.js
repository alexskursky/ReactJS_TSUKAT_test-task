import AllTasks from "../components/AllTasks/AllTasks";
import NewTask from "../components/NewTask/NewTask";

export const public_routes = [
  {
    name: "All Tasks",
    path: "/tasks",
    element: <AllTasks />,
  },
  {
    name: "Create Task",
    path: "/new-task",
    element: <NewTask />,
  },
];
