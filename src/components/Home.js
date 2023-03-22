import React, { useState, useEffect, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Link } from "react-router-dom"
import withStyles from '@material-ui/core/styles/withStyles'
import { AuthContext } from './auth/Auth'
import ShareScreen from './sharing/ShareScreen'
import logo from './newv.svg';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { projectFirestore } from '../firebase/config'
import StaticProfile from './users/StaticProfile'




const styles = theme => ({
    grid: {
        marginLeft: 40
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,


    },
    content: {
        padding: 25,
        objectFit: 'cover'
    },
    submit: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
})

const Home = (props) => {

    const { classes } = props

    const [shares, setShares] = useState([])
    const [loading, setLoading] = useState(true)
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {

        const fetchShares = async () => {

            try {

                const sharelist = []

                await projectFirestore
                    .collection('shares')
                    .orderBy('createdAt', 'desc')
                    .limit(6)
                    .get()
                    .then((querySnapshot) => {
                        console.log(querySnapshot)
                        querySnapshot.forEach(doc => {
                            const { userId, url, title, content, likes, comments } = doc.data()
                            sharelist.push({
                                shareId: doc.id,
                                userId,
                                url: url,
                                title: title,
                                content: content,
                                likes: null,
                                comments: null
                            })

                        })
                    })

                setShares(sharelist)

                if (loading) {
                    setLoading(false)
                }

                console.log('shares: ', sharelist)

            } catch (e) {
                console.log(e)
            }
        }

        fetchShares()


    }, [])

    if (loading) return <CircularProgress />


    return (

        <div className="container">

            <img src={logo} className="App-logo" alt="logo" />
            <Grid container spacing={16}>
                <Grid item sm={6} xs={12}>
                    <p>Share Life Changing Memories</p>

                    <Card className={classes.card}>
                        <CardContent className={classes.content}>
                            {shares && <ShareScreen shares={shares}

                            />}
                        </CardContent >
                    </Card>


                </Grid>
                <Grid item sm={4} xs={12}>
                    <StaticProfile />
                    {currentUser && currentUser.uid ?
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
                        :
                        <Button
                            type="submit"
                            fullwidth
                            variant="contained"
                            component={Link}
                            color="secondary"
                            to="/SignUp"
                            className={classes.submit}

                        >
                            Continue
                        </Button>
                    }

                </Grid>
            </Grid>


        </div>

    )
}

export default withStyles(styles)(Home)