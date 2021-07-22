import React, { useContext, useEffect, useState, Fragment } from 'react'
import { AuthContext } from '../auth/Auth'
import { projectFirestore } from '../../firebase/config'
import withStyles from '@material-ui/core/styles/withStyles'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import DeleteShare from './DeleteShare'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'


const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    userimage: {
        minWidth: 150
    },

    shareimage: {
        minWidth: 150
    },

    content: {
        padding: 25,
        objectFit: 'cover'
    }

}



const ShareScreen = (props) => {

    const { classes } = props
    const shares = props.shares

    const { currentUser } = useContext(AuthContext)
    const [likes, setLikes] = useState(1)

    const [userData, setUserData] = useState(null)

    const getUser = async () => {
        await projectFirestore
            .collection('users')
            .doc(currentUser.uid)
            .get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    console.log('User Data', docSnapshot.data())
                    setUserData(docSnapshot.data())
                }
            })
    }

    useEffect(() => {
        getUser()
    }, [])


    return (

        <Fragment>

            <div className="card-sharescreen" >

                {shares.map(share => (

                    <Card className={classes.card} key={share.shareId}>

                        <CardContent >

                            <Typography variant="h5"
                                component={Link}
                                to={'/shares', { shareId: share.shareId }}
                            >{share.title}</Typography>

                            <Typography variant="body1">{share.content}</Typography>

                            <Button tip="like" onClick={() => setLikes(likes + 1)}>
                                {likes}
                                <FavoriteIcon color="primary" />
                            </Button>

                            <Button tip="like" onClick={() => setLikes(likes - 1)}>
                                {likes}
                                <FavoriteBorderIcon color="primary" />
                            </Button>

                            <ChatBubbleOutlineIcon color="primary" />

                        </CardContent>

                        <CardMedia>
                            <img src={share.url} alt="profile" className={classes.shareimage} height="170" width="150" />
                        </CardMedia>

                        {currentUser.uid == share.userId ?
                            <DeleteShare key={share.shareId}
                                component={Link}
                                to={'/Profile', { userId: share.userId }} />
                            : null}

                    </Card>

                ))}


            </div>



        </Fragment>

    )

}

export default (withStyles(styles)(ShareScreen))