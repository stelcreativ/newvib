import React, { useState, useContext } from 'react'
import { Container } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import bgImg from '../images/imagebg.jpg'
import { projectStorage } from '../../firebase/config'
import { postShare } from '../../redux/actions/shareActions'
import { connect } from 'react-redux'
import { AuthContext } from '../auth/Auth'



const styles = (theme) => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
            width: 400,
            marginleft: 'auto',
            marginLight: 'auto',
        },
        postshare: {
            '& .img-wrap': {
                textAlign: 'center',
                position: 'relative'
            },
        },

        submit: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
        }
    }
})

const PostShare = (props) => {
    const { classes } = props

    const { currentUser } = useContext(AuthContext)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)
    const [progress, setProgress] = useState(0)
    const [url, setUrl] = useState(null)

    const types = ['image/png', 'image/jpeg']

    const handleSubmit = async (e) => {

        e.preventDefault()

        const imageUrl = await uploadHandler()

        const share = {
            userId: currentUser.uid,
            url: url,
            createdAt: new Date(),
            title: title,
            content: content
        }

        props.postShare(share)
        props.history.push('/')
    }

    const changeHandler = (e) => {
        let selected = e.target.files[0]

        if (selected && types.includes(selected.type)) {
            setFile(selected)
            setError('')
        } else {
            setFile(null)
            setError('Please select an image file (png or jpeg')
        }
    }


    const uploadHandler = async () => {
        const storageRef = projectStorage.ref(`share-images/${file.name}`)
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
        return { progress, url, error }
    }


    return (
        <Container component='main' maxWidth="xs">

            <h1>Share</h1>

            <h2>Here are the Prop Types</h2>

            <h5>Post Share</h5>
            <div className={classes.postshare}>
                <div className="img-wrap">
                    <img src={url || bgImg} alt='upload-img' height="300" width="400" />
                    <input type="file" onChange={changeHandler} />
                    <button onClick={uploadHandler}>Upload</button>

                </div>

                <div className="progress-bar">{progress} % uploaded.</div>

                <form onSubmit={handleSubmit}>
                    <div className="post-share">
                        <div className="input-field">
                            <label htmlFor="title">My Share</label>
                            <input type="text" id="title" value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className="input-field">
                            <label htmlFor="content">Enter story</label>
                            <textarea id="content" cols="30" rows="10" value={content}
                                onChange={(e) => setContent(e.target.value)}>Enter Comment</textarea>
                        </div>

                        <button className="btn orange darken-2 z depth-0" type="submit">Add Sharing</button>

                    </div>
                </form>
            </div>

        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        postShare: (share) => dispatch(postShare(share))
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(PostShare))
