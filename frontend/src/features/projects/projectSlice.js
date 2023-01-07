import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import projectService from './projectService'

const initialState = {
  projects: [],
  projectIsError: false,
  projectIsSuccess: false,
  projectIsLoading: false,
  message: '',
}

export const getProjects = createAsyncThunk('projects/getAll', async(_, thunkAPI) => {
  try{
    return await projectService.getProjects()
  } catch (error) {
    const message = (error.message && error.response.data && error.response.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const createProject = createAsyncThunk('projects/create', async(goalData, thunkAPI) => {
  try{
    return await projectService.createProject(goalData)
  } catch (error) {
    const message = (error.message && error.response.data && error.response.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    projectReset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(getProjects.pending, (state) => {
      state.projectIsLoading = true
    })
    .addCase(getProjects.fulfilled, (state, action) => {
      state.projectIsLoading = false
      state.projectIsSuccess = true
      state.projects = action.payload
    })
    .addCase(getProjects.rejected, (state, action) => {
      state.projectIsLoading = false
      state.projectIsError = true
      state.message = action.payload
      state.projects = null
    })
  }
})

export const {projectReset} = projectSlice.actions
export default projectSlice.reducer
