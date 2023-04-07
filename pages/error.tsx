// page returning body of error from next-auth 

import React from 'react'

function Error({ session, setSession, setSessionUser, setSessionUserEmail, setSessionUserImage, setSessionUserToken, setSessionUserType }) {
    if (session) {
        setSession(session)
        setSessionUser(session.user)
        setSessionUserEmail(session.user.email)
        setSessionUserImage(session.user.image)
        setSessionUserToken(session.user.token)
        setSessionUserType(session.user.type)
    }
    return (
        <div>
            <p>error</p>
        </div>
    )
};

export default Error;