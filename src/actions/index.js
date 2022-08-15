import _ from 'lodash'

import streams from "../apis/streams"
import history from "../history"

import { 
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from "./types"

export const signIn = (payload) => {
    return {
        type: SIGN_IN,
        payload
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const createStream = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth
    const response = await streams.post('/streams', {...formValues, userId})

    dispatch({ type: CREATE_STREAM, payload: response.data })
    history.push('/')
}

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams')
    dispatch({ type: FETCH_STREAMS, payload: response.data })
}

export const fetchStream = streamID => async dispatch => {
    const response = await streams.get(`/streams/${streamID}`)

    dispatch({ type: FETCH_STREAM, payload: response.data })
}

export const editStream = streamDetails => async (dispatch, getState) => {
    const response = await streams.patch(`/streams/${streamDetails.id}`, { ..._.omit(streamDetails, ['id'])})

    dispatch({ type: EDIT_STREAM, payload: response.data })
    history.push('/')
}

export const deleteStream = id => async dispatch => {
    await streams.delete(`/streams/${id}`)

    dispatch({ type: DELETE_STREAM, payload: id })
    history.push('/')
}