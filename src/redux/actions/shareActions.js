
export const postShare = (share) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore
            .collection('shares')
            .add({
                ...share,
                likes: null,
                comments: null

            }).then(() => {
                dispatch({ type: 'POST_SHARE', payload: share })
            }).catch((err) => {
                dispatch({ type: 'POST_SHARE_ERROR', err })
            })

    }
}


/**
export const deleteShare = (share) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirebase().getFirestore()
        firestore
            .collection('shares')
            .doc(share.key)
            .delete()
            .then(() => {
                dispatch({ type: 'DELETE_SHARE', payload: share.key })
            }).catch((err) => {
                dispatch({ type: 'DELETE_SHARE_ERROR', err })
            })

    }
}*/