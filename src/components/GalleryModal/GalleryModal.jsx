import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 0,
    position: 'relative',
    width: '100%',
    maxWidth: '968px',
    outline: 'none'
  },
  image: {
    width: '100%',
    display: 'block',
    marginBottom: '-4px'
  },
  left__arrow: {
    fontSize: '3em',
    top: '50%',
    transform: 'translateY(-50%)',
    left: '20px',
    position: 'absolute',
    background: 'rgba(255,255,255,.5)',
    textAlign: 'center',
    '&:hover': {
      background: 'white'
    }
  },
  right__arrow: {
    fontSize: '3em',
    top: '50%',
    transform: 'translateY(-50%)',
    right: '20px',
    position: 'absolute',
    background: 'rgba(255,255,255,.5)',
    textAlign: 'center',
    '&:hover': {
      background: 'white'
    }
  }
}))

export default function GalleryModal({ open, handleClose, images }) {
  const classes = useStyles()

  const [count, setCount] = useState(0)

  console.log(count, images[count])

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <IconButton className={classes.left__arrow} onClick={() => (count >= 1 ? setCount(count - 1) : null)}>
            <ArrowBackIos />
          </IconButton>
          <img src={images[count]} alt='img' className={classes.image} />
          <IconButton
            className={classes.right__arrow}
            onClick={() => (count + 1 < images.length ? setCount(count + 1) : null)}
          >
            <ArrowForwardIos />
          </IconButton>
        </div>
      </Fade>
    </Modal>
  )
}
