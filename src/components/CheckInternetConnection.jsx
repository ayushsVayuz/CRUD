import React, { useState, useEffect } from 'react'

const CheckInternetConnection = (props) => {

    const [isOnline, setOnline] = useState(true);


    /**
     * Updates the online status by checking navigator.onLine once on mount.
    */
    useEffect(() => {
        setOnline(navigator.onLine)
    }, [])

    console.log("isOnline", isOnline);



    window.addEventListener('online', () => {
        setOnline(true)
    })

    window.addEventListener('offline', () => {
        setOnline(false)
    })


    if (isOnline) {
        return (
            props.children
        )
    }
    else {
        return (<h1>Please check your internet connection.</h1>)
    }
}

export default CheckInternetConnection
