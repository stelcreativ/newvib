import shareReducer from './shareReducer'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    share: shareReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
})

export default rootReducer