import { useState, useEffect } from 'react'
import { projectFirestore } from '../firebase/config'

const hookFirestore = (posts) => {
    const [docs, setDocs] = useState([])

    useEffect(() => {
        const unsubscribe = projectFirestore.collection(collection)
            .orderBy('createdAt')
            .onSnapshot((snap) => {
                var documents = []
                snap.forEach(doc => {
                    documents.push({ ...doc.data(), id: doc.id })
                })
                setDocs(documents)
            })

        return () => unsubscribe()

    }, [{ url, posts }])

    return { docs }
}

export default hookFirestore