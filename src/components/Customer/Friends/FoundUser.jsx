import React, { useState } from 'react'
import { ListItem, Button } from '@material-ui/core';
import Axios from 'axios';
function FoundUser({ userData, u }) {
    const [friendStatus, setFriendStatus] = useState(false)
    const handleFriendRequest = (currentId, uId) => {
        let sender, recipient, status;
        sender = currentId;
        recipient = uId;
        status = false;
        const friendRequest = { sender, recipient, status }
        Axios.post('/db/friendship/newFriend', friendRequest)
            .catch(err => console.warn(err));
    };
    return (
        <ListItem>
<<<<<<< HEAD
            <span>{u.first_name + u.last_name}</span>{friendStatus ? <span>Friend Request Sent</span> : (<span><Button onClick={() => {
=======
            <span>{u.first_name + ' ' + u.last_name}</span>{friendStatus ? <span>Friend Request Sent</span> :(<span><Button onClick={() => {
>>>>>>> 66175c7... (example) of pushing a commit
                setFriendStatus(true)
                handleFriendRequest(userData.id, u.id)
            }}>Send Friend Request</Button></span>)}
        </ListItem>
    )
}
export default FoundUser