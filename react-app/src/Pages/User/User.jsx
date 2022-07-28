import React from 'react';
import { useParams } from 'react-router-dom';

const User = () => {

    const { id } = useParams();

    // const compairingUserId = User.find(user => user.id === id);

  return (
    <div>
      Hello  {id}
     
    </div>
  )
}

export default User
