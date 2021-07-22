
const initState = {
    shares: []
}

export const shareReducer = (state = initState, action) => {
    switch (action.type) {
        case 'POST_SHARE': {
            alert('share published!')
            console.log('You posted a share')
            return state

        }
        case 'POST_SHARE_ERROR': {
            console.log('post share error', action.err)
            return state
        }

        default:
            return state
    }
}

export default shareReducer