import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification) {
    return (
      <Alert severity='success'>
        {notification}
      </Alert>
    )
  }
  return (
    <>
    </>
  )
}

export default Notification