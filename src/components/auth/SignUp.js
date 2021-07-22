import React, { useState } from "react"
import { Link } from "react-router-dom"
import Card from '@material-ui/core/Card'
import withStyles from '@material-ui/core/styles/withStyles'
import { Avatar } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import firebase from "../../firebase/config"
import { projectFirestore } from '../../firebase/config'

const styles = {
    card: {
        position: 'relative',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    lockicon: {
        margin: 'auto'
    }
}

const SignUp = (props) => {
    const { classes } = props

    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [bio, setBio] = useState('')
    const [city, setCity] = useState('')
    const [telephone, setTelephone] = useState('')

    const handleSignUp = async () => {


        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    projectFirestore.collection('users').doc(firebase.auth().currentUser.uid)
                        .set({
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            bio: bio,
                            city: city,
                            telephone: telephone,
                            userImg: null,

                        })
                })



            props.history.push("/profile")
        } catch (error) {
            alert(error)
        }
    }


    return (
        <div className="container">
            <h1 className="grey-text text-darken-3">Sign up</h1>

            <Card className={classes.card}>
                <Avatar className={classes.lockicon}>
                    <LockOutlinedIcon />
                </Avatar>
                <form className="white" onSubmit={e => e.preventDefault() && false}>
                    <div className="input-field">
                        <label htmlFor="firstname">First Name</label>
                        <input name="firstname" type="text" value={firstname} onChange={e => setFirstName(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastname">Last Name</label>
                        <input name="lastname" type="text" id="lastname" value={lastname} onChange={e => setLastName(e.target.value)} />
                    </div>

                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input name="email" type="email" id="email"
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input name="password" type="password" id="password"
                            onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="input-field">
                        <label htmlFor="bio">Enter your bio</label>
                        <textarea id="bio" cols="30" rows="10"
                            onChange={(e) => setBio(e.target.value)}></textarea>
                    </div>
                    <div className="input-field">
                        <label htmlFor="city">City</label>
                        <input name="city" type="text" id="city"
                            onChange={e => setCity(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="telephone">Telephone</label>
                        <input name="telephone" type="text" id="telephone"
                            onChange={e => setTelephone(e.target.value)} />
                    </div>

                    <div classname="input'-field">
                        <button className="btn pink lighten-1 z-depth-0"
                            onClick={handleSignUp}
                        >
                            Sign up
                        </button>
                        <div>
                            Already have an account? <Link to="/signin">Sign In</Link>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    )

}

export default (withStyles(styles)(SignUp))