import React, { useState, useContext, useEffect, Fragment } from 'react'
import { Typography, Paper } from '@material-ui/core'
import { projectFirestore } from '../../firebase/config'
import { AuthContext } from '../auth/Auth'
import MuiLink from '@material-ui/core/Link'
import LocationOn from '@material-ui/icons/LocationOn'
import CallIcon from '@material-ui/icons/Call';
import { Link } from 'react-router-dom'
import UsrImg from '../images/user_img.png'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const styles = (theme) => ({
    paper: {
        padding: 20,
        marginTop: 50,
        marginLeft: 30,

    },

    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative'
        },
        '& .profile-image': {
            width: 200,
            height: 230,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        }
    }

})

dayjs.extend(relativeTime)

const StaticProfile = (props) => {


    const { classes } = props

    const { currentUser } = useContext(AuthContext)
    const [shares, setShares] = useState([])
    const [userData, setUserData] = useState()

    const [loading, setLoading] = useState(false)

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

    {/** */ }
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



    return (

        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wapper">

                    <img src={userData ? userData.userImg.url : UsrImg} alt="profile" className="profile-image" />
                </div>
                <hr />
                <div className="profile-details">
                    <MuiLink
                        component={Link}
                        to="/Profile"
                        color="primary"
                        variant="h5"
                    >
                        {userData ? userData.firstname : 'test'}
                    </MuiLink>
                    <hr />
                    <Typography variant="body2>">
                        {userData ? userData.bio : 'No Bio'} </Typography>
                    <hr />

                    <Fragment>
                        <LocationOn color="primary" /> <span>{userData ? userData.city : 'City'}</span>
                    </Fragment>


                    <Typography variant="body2">
                        <CallIcon color="primary" />
                        {userData ? userData.telephone : 'telephone'}
                    </Typography>
                    <Typography>{shares.length} Shares</Typography>
                </div>

            </div>
        </Paper>
    )
}
export default withStyles(styles)(StaticProfile)