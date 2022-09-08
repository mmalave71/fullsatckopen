import React from 'react'
import PropTypes from 'prop-types'

import { Alert } from 'react-bootstrap'

const Notification = ( { message, type } ) => {

  if (message===''){
    return null
  }else{
    return (
      <Alert variant={type}>
        {message}
      </Alert>
    )
  }

}

Notification.propTypes={
  message:PropTypes.string.isRequired,
  type:PropTypes.string.isRequired
}
export default Notification