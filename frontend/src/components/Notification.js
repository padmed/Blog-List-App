import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  const failed = {
    border: '4px solid red',
    color: '#8B0000',
    backgroundColor: '#ffb2b2',
    margin: '5px',
    padding: '5px',
    borderRadius: '5px',
  }
  const success = {
    border: '4px solid green',
    color: 'green',
    backgroundColor: '#aaf0d1',
    margin: '5px',
    padding: '5px',
    borderRadius: '5px',
  }

  const style = notification.status ? success : failed

  return (
    <div style={style}>
      <h3>{notification.message}</h3>
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object
}
export default Notification
