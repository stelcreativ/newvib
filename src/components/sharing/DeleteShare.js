import React, { Fragment, useState } from 'react'
import { projectFirestore } from '../../firebase/config'
import { projectStorage } from '../../firebase/config'
import { Button } from '@material-ui/core'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import withStyles from '@material-ui/core/styles/withStyles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'

const styles = {
    delete: {
        position: 'absolute',
        left: '80%'
    }
}




const DeleteShare = (props) => {

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }


    const deleteFullshare = async ({ shareId }) => {
        console.log('current Share Id: ', shareId)

        projectFirestore
            .collection('shares')
            .doc(shareId)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    console.log('url', documentSnapshot.data())
                    const { url } = documentSnapshot.data()

                    if (url !== null) {

                        var imageRef = projectStorage.ref.child(`share-images/${url}`)
                        imageRef.delete()
                            .then(function () {
                                console.log('Share image deleted!')
                                deleteFirestoreData(shareId)
                            }).catch(function (error) {
                                console.log('error while deleting', error)
                            })
                    }

                } else {
                    console.log('No such data available!')
                }
            })

        const deleteFirestoreData = ({ share }) => {
            projectFirestore
                .collection('shares')
                .doc(share.key)
                .delete()
                .then(() => {
                    console.log('Share successfully deleted!')
                    console.log('share is :', share.key)
                    props.history.push('/')
                }).catch((error) => {
                    console.log('Error is', error)
                }
                )
        }

    }


    return (
        <div className="container">

            <Fragment>
                <Tooltip title="Delete Share" placement="top">
                    <IconButton aria-label="delete"
                        onClick={handleOpen}
                    >
                        <DeleteOutline color="secondary" />
                    </IconButton>
                </Tooltip>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle id="form-dialog-title">
                        Are you sure you want to delete this share?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button onClick={deleteFullshare} color="secondary">Delete</Button>
                    </DialogActions>
                </Dialog>


            </Fragment>


        </div>
    )
}

export default withStyles(styles)(DeleteShare)
