import React from 'react';
import { useLocation } from "react-router-dom";

const UserInfo: React.FC<{username:string}> = ({username}) => {
    const location = useLocation();

    return(
        <>
            <h1> Info About {location.state}</h1>
        </>
    )
}

export default UserInfo