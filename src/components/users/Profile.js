import React, { useState, useContext, useEffect, Fragment } from 'react'
import { Container, Card, Typography, Paper, Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from "../../firebase/config"
import { projectFirestore } from '../../firebase/config'
import { projectStorage } from '../../firebase/config'
import { connect } from 'react-redux'
import { AuthContext } from '../auth/Auth'
import { Link } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import LocationOn from '@material-ui/icons/LocationOn'
import CallIcon from '@material-ui/icons/Call';
import blue from '@material-ui/core/colors/blue'
import ShareScreen from '../sharing/ShareScreen'


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        }
    },

    paper: {
        marginTop: theme.spacing(8),
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        maxWidth: 400,
        flexDirection: 'column',
        alignItems: 'center',
        palette: {
            primary: blue,
        },
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
    card: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },


})

const Profile = props => {
    const { classes } = props

    const { currentUser } = useContext(AuthContext)
    const [shares, setShares] = useState([])
    const [userData, setUserData] = useState()
    const [userImg, setUserImg] = useState()
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)

    const types = ['image/png', 'image/jpeg']

    const onSignout = async () => {
        await firebase.auth().signOut
    }

    const collectionRef = projectFirestore.collection('shares')



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
        fetchShares()
    }, [])

    //Update User Image
    const collectionUser = projectFirestore.collection('users')

    const updateHandler = async () => {
        let imageUrl = await handleUploadPicture()
        if (imageUrl == null && userData.userImg) {
            imageUrl = userData.userImg
        }



        collectionUser
            .doc(currentUser.uid)
            .update({
                userImg: imageUrl,

            })
            .then(() => {
                console.log('User Image Updated!')
                alert('Profile image updated!')

            })
            .catch((error) => {
                console.log('Something went wrong', error)
            })
        setUserImg(userImg)
        return userImg
    }



    const handleImageChange = (e) => {
        let selected = e.target.files[0]

        if (selected && types.includes(selected.type)) {
            setFile(selected)
            setError('')
        } else {
            setFile(null)
            setError('Please select an image file (png or jpeg')
        }
    }


    const handleUploadPicture = async () => {
        if (file == null) {
            return <img src='https://via.placeholder.com/150'></img>
        }
        const storageRef = projectStorage.ref(`user-images/${file.name}`)
        storageRef.put(file)
            .on('state_changed', (snapshot) => {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(
                    Math.round(percentage))
            }, (err) => {
                setError(err)
            }, async () => {
                const url = await storageRef.getDownloadURL()
                setUrl(url)

            }

            )
        return { url }
    }


    //Display shares for connected user
    const fetchShares = async () => {
        try {
            const list = []
            await collectionRef
                .where('userId', '==', currentUser.uid)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const {
                            userId,
                            url,
                            title,
                            content,
                            likes,
                            comments
                        } = doc.data()
                        list.push({
                            shareId: doc.id,
                            userId,
                            url,
                            title,
                            content,
                            likes,
                            comments
                        })
                    })
                })
            setShares(list)
            if (loading) {
                setLoading(false)
            }
            console.log('Shares: ', shares)
        } catch (e) {
            console.log(e)
        }

    }


    if (loading) return <CircularProgress />

    return (
        <Container component='main' maxWidth="xm">
            <Card className={classes.card}>
                <Paper className={classes.paper}
                    color="primary">
                    <h3>Newvibe</h3>
                    <Typography component="h1" variant="h5">
                        Welcome {userData ? userData.firstname : 'Your Name'}
                        <br />
                        {userData ? userData.lastname : 'Your Lastname'}
                    </Typography>

                    <h4>Share amazing memories</h4>

                    <div className="img-wrap">
                        <div className="user-image">

                            {url !== null ? <img src={userData ? userData.userImg : 'https://via.placeholder.com/150'} alt='upload-img' className="profile-image"
                                style={{ width: 145, height: 150, alignSelf: "center" }}

                            /> : <img src={'https://via.placeholder.com/150'} />}
                            <input type="file" onChange={handleImageChange} />

                            <Tooltip title="Edit profile image" placement="top">
                                <IconButton onClick={handleUploadPicture} className="button">
                                    <EditIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                        </div>

                        <div className="upload-progress"><circularProgress /><Typography>{progress} % uploaded!</Typography></div>



                        <Button onClick={updateHandler}
                            className={classes.submit}
                            type="submit"
                            fullwidth
                            variant="contained"
                            color="primary"
                        >
                            Update Profil Picture
                        </Button>
                    </div>

                    <div className="profile-details">
                        <Fragment>
                            {userData ? userData.bio :
                                <Typography variant="body1">
                                    BIO
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium odio dolor odit natus unde consequatur magni recusandae ipsum sequi illo similique atque quam commodi quasi modi quas tempore, suscipit ea?
                                </Typography>
                            }
                        </Fragment>
                        <br />
                        <Fragment>
                            <LocationOn color="primary" />
                            <span>{userData ? userData.city : 'City'}</span>

                        </Fragment>

                        <Typography variant="body2">
                            <CallIcon color="primary" />
                            {userData ? userData.telephone : 'telephone'}
                        </Typography>
                        <hr />

                        <Typography>{shares.length} Shares</Typography>

                    </div>


                    <Fragment>
                        <div className="options">
                            <Button
                                type="submit"
                                fullwidth
                                variant="contained"
                                component={Link}
                                color="primary"
                                to="/PostShare"
                                className={classes.submit}

                            >
                                Post Share
                            </Button>


                            <Button
                                type="submit"
                                fullwidth
                                variant="contained"
                                component={Link}
                                color="primary"
                                to="SignIn"
                                className={classes.submit}
                                onClick={onSignout}
                            >
                                Signout
                            </Button>


                            <Button
                                type="submit"
                                fullwidth
                                variant="contained"
                                component={Link}
                                color="primary"
                                to="/EditProfil"
                                className={classes.submit}

                            >
                                Edit Profil
                            </Button>
                        </div></Fragment>
                </Paper>
            </Card>
            <Card className={classes.card}>
                <ShareScreen shares={shares} />
            </Card>


        </Container>


    )
}

const mapStateToProps = (state) => ({
    user: state.firebase.auth.uid
})

export default connect(mapStateToProps)(withStyles(styles)(Profile))
