import app from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIRE_API_KEY,
    authDomain: process.env.REACT_APP_FIRE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIRE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIRE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIRE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIRE_MESSAGING_ID,
    appId: process.env.REACT_APP_FIRE_APP_ID
};
// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig)

const projectStorage = firebase.storage()
const projectFirestore = firebase.firestore()
//const timestamp = firebase.firestore.Fieldvalue.serverTimestamp
projectFirestore.settings({ timestampsInSnapshots: true })



export { projectStorage, projectFirestore }
export default firebase