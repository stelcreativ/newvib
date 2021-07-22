import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Avatar, Card } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import firebase from "../../firebase/config"

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

const SignIn = (props) => {
    const { classes } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = async () => {

        try {
            await firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
            await firebase
                .auth().currentUser
            props.history.push("/profile")
        } catch (error) {
            alert(error)
        }

    }


    return (
        <div className="container">
            <h1 className="grey-text text-darken-3">Sign In</h1>
            <Card className={classes.card}>
                <Avatar className={classes.lockicon}>
                    <LockOutlinedIcon />
                </Avatar>
                <form className="white" onSubmit={e => e.preventDefault() && false}>

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

                    <div className="input'-field">
                        <button className="btn pink lighten-1 z-depth-0"
                            onClick={handleSignIn}
                        >
                            Sign In
                        </button>
                        <div>
                            Need an account? <Link to="/signup">Sign Up</Link>
                        </div>

                        <div>
                            <Link to="forgot-password">Forgot Password?</Link>
                        </div>


                    </div>
                </form>
            </Card>
        </div>
    )

}

export default (withStyles(styles)(SignIn))