import React, { useState, useEffect, useContext } from 'react'
import { projectFirestore } from '../../firebase/config'
import { AuthContext } from '../auth/Auth'
import withStyles from '@material-ui/core/styles/withStyles'
import { Container, Paper, Card, Typography } from '@material-ui/core'


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
            width: 400,
            marginleft: 'auto',
            marginLight: 'auto',
        }
    },
    card: {
        position: 'relative',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .image-wrap': {
            textAlign: 'center',
            position: 'relative',

            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },

        '& .user-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            }
        },

        '& .options': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        }
    },

    submit: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },


})



const EditProfil = (props) => {

    const { classes } = props

    const { currentUser } = useContext(AuthContext)

    const [userData, setUserData] = useState(null)

    const getUser = async () => {
        projectFirestore
            .collection('users')
            .doc(currentUser.uid)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    console.log('User Data', documentSnapshot.data())
                    setUserData(documentSnapshot.data())
                }
            })
    }

    useEffect(() => {
        getUser()

    }, [])

    //Update User Data
    const collectionUser = projectFirestore.collection('users')

    const updateHandler = async () => {

        collectionUser
            .doc(currentUser.uid)
            .update({
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                bio: userData.bio,
                phone: userData.telephone,
                city: userData.city,


            })
            .then(() => {
                console.log('User Updated!')
                alert('Profile updated!')
                props.history.push('/')
            })
            .catch((error) => {
                console.log('Something went wrong', error)
            })
    }



    return (
        <Container component='main' maxWidth="xm">
            <Card className={classes.card}>

                <Paper className={classes.paper}>

                    <Typography component="h1" variant="h5">
                        {userData ? userData.firstname : 'Your Name'}
                        <br />
                        {userData ? userData.lastname : 'Your Lastname'}
                    </Typography>

                </Paper>

            </Card>

            <Paper>
                <Card className={classes.card}>
                    <form onSubmit={e => e.preventDefault() && false}>
                        <div className="update-profile">

                            <div className="input-field">
                                <label htmlFor="firstname"></label>
                                <input name="firstname" type="text" id="firstname"
                                    value={userData ? userData.firstname : ''} onChange={(e) => setUserData({ ...userData, firstname: e.target.value })} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="lastname"></label>
                                <input name="lastname" type="text" id="lastname"
                                    value={userData ? userData.lastname : ''} onChange={(e) => setUserData({ ...userData, lastname: e.target.value })} />
                            </div>

                            <div className="input-field">
                                <label htmlFor="email"></label>
                                <input name="email" type="email" id="email"
                                    value={userData ? userData.email : ''} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                            </div>

                            <div className="input-field">
                                <label htmlFor="bio"></label>
                                <textarea id="bio" cols="30" rows="10"
                                    value={userData ? userData.bio : ''} onChange={(e) => setUserData({ ...userData, bio: e.target.value })}></textarea>
                            </div>
                            <div className="input-field">
                                <label htmlFor="city"></label>
                                <input name="city" type="text" id="city"
                                    value={userData ? userData.city : ''} onChange={(e) => setUserData({ ...userData, city: e.target.value })} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="telephone"></label>
                                <input name="telephone" type="text" id="telephone"
                                    value={userData ? userData.telephone : ''} onChange={(e) => setUserData({ ...userData, telephone: e.target.value })} />
                            </div>

                            <button className="btn orange darken-2 z depth-0" type="submit" onClick={updateHandler}>Update</button>

                        </div>
                    </form>
                </Card>
            </Paper>

        </Container>
    )
}

export default withStyles(styles)(EditProfil)