import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import ViewCarousel from '@material-ui/icons/ViewCarousel'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    margin: '15px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  input__wrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px'
  },
  input: {
    width: '70px'
  },
  galleryIcon: {
    position: 'relative',
    top: '-60px',
    margin: '0 10px -50px auto',
    display: 'block',
    background: 'rgba(255,255,255,.5)',
    '&:hover': {
      background: 'white'
    }
  }
}))

export default function ActivityItem({ activity, handleOpen }) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const [count, setCount] = useState(0)

  const { name, description, images, dates, price } = activity

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleChange = e => setCount(e.target.value)

  return (
    <Card className={classes.card}>
      <CardHeader title={name} subheader={dates[0]} />
      <CardMedia className={classes.media} image={images[0]} title='img' />
      <IconButton className={classes.galleryIcon} aria-label='add to favorites' onClick={() => handleOpen(images)}>
        <ViewCarousel />
      </IconButton>
      <CardContent>
        <Typography variant='h6' color='textSecondary' component='p'>
          Price: {price}$
        </Typography>
        <div className={classes.input__wrap}>
          <IconButton onClick={() => (count >= 1 ? setCount(count - 1) : null)}>
            <Remove />
          </IconButton>
          <TextField
            className={classes.input}
            value={count}
            variant='outlined'
            size='small'
            type='number'
            onChange={handleChange}
            inputProps={{ style: { textAlign: 'center' } }}
          />
          <IconButton onClick={() => setCount(count + 1)}>
            <Add />
          </IconButton>
        </div>
        <Typography variant='body2' color='textSecondary' component='p'>
          {description.slice(0, 197) + '...'}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}
