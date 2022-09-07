import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, { rejectedWithValue }) => {
    try {
      const response = await fetch(
        "https://tsukat-test-task-task-manager-default-rtdb.europe-west1.firebasedatabase.app/tasks.json"
      );
      if (!response.ok) {
        throw new Error("Fetching failed!");
      }
      const data = await response.json();
      const arr = [];
      for (const key in data) {
        arr.push({ ...data[key], id: key });
      }
      return arr;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const postTasks = createAsyncThunk(
  "tasks/postTasks",
  async (task, { rejectedWithValue }) => {
    try {
      const response = await fetch(
        "https://tsukat-test-task-task-manager-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }
      );
      if (!response.ok) {
        throw new Error("Post failed!");
      }
      return task;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const deleteTasks = createAsyncThunk(
  "tasks/deleteTasks",
  async (id, { rejectedWithValue }) => {
    try {
      const response = await fetch(
        `https://tsukat-test-task-task-manager-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Put failed!");
      }
      return id;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const patchTasks = createAsyncThunk(
  "tasks/patchTasks",
  async (obj, { rejectedWithValue }) => {
    try {
      const response = await fetch(
        `https://tsukat-test-task-task-manager-default-rtdb.europe-west1.firebasedatabase.app/tasks/${obj.id}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj.task),
        }
      );
      if (!response.ok) {
        throw new Error("PATCH failed!");
      }
      return obj;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postTasks.pending, (state) => {
        state.error = null;
      })
      .addCase(postTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = [
          { ...action.payload, id: action.payload.date },
          ...state.tasks,
        ];
      })
      .addCase(postTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTasks.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(patchTasks.pending, (state) => {
        state.error = null;
      })
      .addCase(patchTasks.fulfilled, (state, action) => {
        state.loading = false;
        const elIndex = state.tasks.findIndex(
          (el) => el.id === action.payload.id
        );
        state.tasks[elIndex] = {
          ...action.payload.task,
          id: action.payload.id,
        };
      })
      .addCase(patchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice.reducer;
