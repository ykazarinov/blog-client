import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchLastComments = createAsyncThunk('comments/fetchLastComments', async() => {
    const {data} = await axios.get('/comments')
    return data
})

export const fetchPostComments = createAsyncThunk('comments/fetchPostComments', async(id) => {
    const {data} = await axios.get(`/posts/${id}/comments`)
    return data
})

export const fetchRemoveComment = createAsyncThunk('comments/fetchRemoveComment', async(id) => 
    axios.delete(`/comments/${id}`)
  
)

const initialState = {
    comments: {
        items: [],
        status: 'loading' 
    },


}

const commentsSlice = createSlice({
    name: 'comments',
    initialState, 
    reducers: {},
    extraReducers: {
        // Get last comments
        [fetchLastComments.pending]: (state) => {
            state.comments.items = []
            state.comments.status = 'loading'
        },
        [fetchLastComments.fulfilled]: (state, action) => {
            state.comments.items = action.payload
            state.comments.status = 'loaded'
        },
        [fetchLastComments.rejected]: (state) => {
            state.comments.items = []
            state.comments.status = 'error'
        },

        // Get post comments
        [fetchPostComments.pending]: (state) => {
            state.comments.items = []
            state.comments.status = 'loading'
        },
        [fetchPostComments.fulfilled]: (state, action) => {
            state.comments.items = action.payload
            state.comments.status = 'loaded'
        },
        [fetchPostComments.rejected]: (state) => {
            state.comments.items = []
            state.comments.status = 'error'
        },
       
        // Remove comment
        [fetchRemoveComment.pending]: (state, action) => {
            state.comments.items = state.comments.items.filter(obj => obj._id !== action.meta.arg)
        },

    }
})

export const commentsReducer =  commentsSlice.reducer