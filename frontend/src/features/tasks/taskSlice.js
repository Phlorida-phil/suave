import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import taskService from './taskService'

const initialState = {
  tasks: [],
  taskIsError: false,
  taskIsSuccess: false,
  taskIsLoading: false,
  message: ''
}

export const getTasks = createAsyncThunk('tasks/getAll', async(_, thunkAPI) => {
  try{
    return await taskService.getTasks()
  } catch (error) {
    const message = (error.message && error.response.data && error.response.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const createTask = createAsyncThunk('tasks/create', async(taskData, thunkAPI) => {
  try{
    return await taskService.createTask(taskData)
  } catch (error) {
    const message = (error.message && error.response.data && error.response.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteTask = createAsyncThunk('tasks/delete', async(id, thunkAPI) => {
  try {
    return await taskService.deleteTask(id)
  } catch (error) {
      const message = (error.message && error.response.data && error.response.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    taskReset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(getTasks.pending, (state) => {
      state.taskIsSuccess = true
    })
    .addCase(getTasks.fulfilled, (state, action) => {
      state.taskIsPending = false
      state.taskIsSuccess = true
      state.tasks = action.payload
    })
    .addCase(getTasks.rejected, (state, action) => {
      state.taskIsPending = false
      state.taskIsError = true
      state.message = action.payload
      state.tasks = null
    })
    .addCase(deleteTask.pending, (state) => {
      state.taskIsSuccess = true
    })
    .addCase(deleteTask.fulfilled, (state, action) => {
      state.taskIsLoading = false
      state.taskIsSuccess = true
      state.tasks = state.tasks.filter(
        (task) => task._id != action.payload.id)
    })
    .addCase(deleteTask.rejected, (state, action) => {
      state.taskIsLoading = false
      state.taskIsError = true
      state.message = action.payload
    })
  }
})

export const {taskReset} = taskSlice.actions
export default taskSlice.reducer
