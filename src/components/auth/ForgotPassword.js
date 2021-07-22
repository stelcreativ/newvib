import React, { useState } from "react"
import { Link } from "react-router-dom"
import withStyles from '@material-ui/core/styles/withStyles'
import { Card, Avatar } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import firebase from "../../firebase/config"

const styles = theme => ({
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
})

const ForgotPassword = (props) => {
    const { classes } = props

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleResetPassword = async () => {

        try {
            await firebase
                .auth()
                .sendPasswordResetEmail(email)
            setMessage('Check your email to reset your password')
        } catch (error) {
            alert(error)
        }

    }


    return (
        <div className="container">
            <h1 className="grey-text text-darken-3">Forgot Password</h1>
            <Card className={classes.card}>
                <Avatar className={classes.lockicon}>
                    <LockOutlinedIcon />
                </Avatar>

                {message && <div className="message">{message}</div>}
                <form className="white" onSubmit={e => e.preventDefault() && false}>

                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input name="email" type="email" id="email"
                            onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div classname="input'-field">
                        <button className="btn pink lighten-1 z-depth-0"
                            onClick={handleResetPassword}
                        >
                            Reset Password
                </button>
                        <div>
                            <Link to="/login">Login</Link>
                        </div>
                        <div>
                            Need an account? <Link to="/signup">Sign Up</Link>
                        </div>

                    </div>
                </form></Card>
        </div>
    )

}

export default (withStyles(styles)(ForgotPassword))