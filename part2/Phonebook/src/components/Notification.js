import React from 'react';

const Notification=({message,type})=>{
    //type puede tener los valores exito o error
    //existe un style definido en el index.css tanto para  exito como para error
    if (message===null){
        return null;
    }
    else {
      return (
        <div className={type}>
          {message}
        </div>
      );
    }
}
export default Notification;