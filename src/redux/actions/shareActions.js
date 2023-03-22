
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

