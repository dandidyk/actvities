import React, { useState, useEffect } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ActivityItem from '../ActivityItem'
import GalleryModal from '../GalleryModal'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    paddingBottom: '60px'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#fff',
    flexWrap: 'wrap'
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  sort__wrap: {
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  select: {
    border: '1px solid #fff',
    padding: '5px',
    borderRadius: '4px',
    color: '#fff',
    background: 'transparent',
    outline: 'none',
    fontSize: '1.2em',
    margin: '15px',
    '&>option': {
      color: '#666',
      textTransform: 'uppercase'
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  activities__list: {
    padding: '20px 20px 20px',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  events: {
    padding: '10px'
  }
}))

export default function Activities() {
  const classes = useStyles()

  const [activities, setActivities] = useState([])
  const [categories, setCategories] = useState([])
  const [showCount, setShowCount] = useState(2)
  const [openModal, setOpenModal] = useState(false)
  const [images, setImages] = useState(null)
  const [activeCategory, setActiveCategory] = React.useState('')
  const [sortByPrice, setSortByPrice] = React.useState('1,-1')

  const handleChangeCategory = event => setActiveCategory(event.target.value)
  const handleChangePrice = event => setSortByPrice(event.target.value)

  const handleClose = () => {
    setImages(null)
    setOpenModal(false)
  }
  const handleOpen = images => {
    setImages(images)
    setOpenModal(true)
  }

  const increaseShowCount = () => setShowCount(showCount + 1)

  const getActivities = async () => {
    const res = await fetch('https://s3.eu-central-1.amazonaws.com/js.smartair.co.il/custom/activities.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const body = await res.json()
    setActivities(Object.values(body.activities).map(a => ({ ...a, count: 0 })))
  }

  useEffect(() => {
    getActivities()
  }, [])

  useEffect(() => {
    const categories = []
    activities.forEach(a =>
      a.category.forEach(c => (!categories.includes(c.toLowerCase()) ? categories.push(c.toLowerCase()) : null))
    )

    setCategories(categories)
  }, [activities])

  let filteredActivities = []

  if (activities.length > 0) {
    filteredActivities = activities
      .filter(a => a.category.some(c => (activeCategory === '' ? true : c.toLowerCase() === activeCategory)))
      .sort((a, b) => (a.price > b.price ? sortByPrice.split(',')[0] : sortByPrice.split(',')[1]))
  }

  return (
    <div className={classes.grow}>
      {openModal && images ? <GalleryModal handleClose={handleClose} open={openModal} images={images} /> : ''}
      <AppBar position='static' style={{ color: '#fff' }}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.sort__wrap}>
            <Typography className={classes.title} variant='h6' noWrap>
              Activities
            </Typography>
            <select name='select' className={classes.select} value={activeCategory} onChange={handleChangeCategory}>
              <option value={''}>all categories</option>
              {categories.map(c => (
                <option value={c} key={c}>
                  {c}
                </option>
              ))}
            </select>
            <select name='select' className={classes.select} value={sortByPrice} onChange={handleChangePrice}>
              <option value={'1,-1'}> Cheapest to expensive</option>
              <option value={'-1,1'}> Expensive to cheap</option>
            </select>
          </div>
          <div className={classes.events}>{filteredActivities.length} events found</div>
        </Toolbar>
      </AppBar>
      <div className={classes.activities__list}>
        {filteredActivities.length > 0 ? (
          filteredActivities
            .slice(0, showCount)
            .map(activity => <ActivityItem key={activity.id} activity={activity} handleOpen={handleOpen} />)
        ) : (
          <Typography className={classes.title} variant='h5' noWrap>
            Activities loading
          </Typography>
        )}
      </div>
      {filteredActivities.length > showCount ? (
        <Button variant='contained' color='primary' onClick={increaseShowCount}>
          Show more
        </Button>
      ) : (
        ''
      )}
    </div>
  )
}
