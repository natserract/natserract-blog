import { makeStyles, useTheme } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import { useCallback, useEffect, useState } from 'react'

const useStyles = makeStyles(theme => ({
  scrollToTopContainer: {
    position: 'fixed',
    right: 80,
    bottom: 35,
    height: '30px',
    cursor: 'pointer',

    [`${theme.breakpoints.down("sm")} and (orientation: landscape)`]: {
      right: 20,
      bottom: 30
    },

    [`${theme.breakpoints.only("xs")} and (orientation: portrait)`]: {
      right: 20,
      bottom: 30
    },
  },
  scrollToTopBtn: {
    background: '#222',
    color: '#fff',
    minWidth: 40,
    height: 35,


    '&:hover': {
      background: '#222 !important',
    }
  }
}))

const ScrollToTop = () => {
  const classes = useStyles()
  const [showScroll, setShowScroll] = useState(false)

  // From: https://gist.github.com/romanonthego/223d2efe17b72098326c82718f283adb
  const onScrollToTop = useCallback(() => {
    try {
      // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      // just a fallback for older browsers
      window.scrollTo(0, 0);
    }
  }, [])

  useEffect(() => {
    function checkScrollTop() {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true)
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false)
      }
    }

    window.addEventListener('scroll', checkScrollTop)

    return () => window.removeEventListener('scroll', checkScrollTop)
  }, [showScroll])

  return (
    showScroll && (
      <div className={classes.scrollToTopContainer}>
        <Button className={classes.scrollToTopBtn} onClick={onScrollToTop}>
          <ArrowUpwardIcon fontSize="small" />
        </Button>
      </div>
    )
  )
}

export default ScrollToTop