import { createStore, combinedReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import shareReducer from './reducers/shareReducer'

const initialState = {}

const middleware = [thunk]

const reducers = combinedReducers({
    share: shareReducer
})

const store = createStore(reducers, initialState, compose(applyMiddleware(...middleware)))

export default store