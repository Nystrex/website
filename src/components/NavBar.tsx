import * as React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import AvatarButton from './AvatarButton'
import UserAvatarMenu from "./UserAvatarMenu"

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      background: 'transparent',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    grow: {
      flexGrow: 1,
    },
    emptyToolbar: theme.mixins.toolbar,
  }),
)

const NavBar = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [session, loading] = useSession()

  let authButton: React.ReactNode

  if (loading) {
    authButton = <Typography variant="body2">Loading...</Typography>
  } else if (session) {
    const onClickAvatar = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setAnchorEl(e.currentTarget)
    }
    const onClickLogout = (e: React.MouseEvent) => {
      e.preventDefault()
      return signOut()
    }
    const onCloseMenu = () => setAnchorEl(null)

    authButton = <>
      <AvatarButton disableRipple user={session.user} onClick={onClickAvatar}/>
      <UserAvatarMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onCloseMenu} onClickLogout={onClickLogout}/>
    </>
  } else {
    const onClick = (e: React.MouseEvent) => {
      e.preventDefault()
      return signIn('discord')
    }
    authButton = <Button color="inherit" onClick={onClick}>Login with Discord</Button>
  }

  return (
    <>
      <AppBar position="fixed" className={classes.root} elevation={0}>
        <Container>
          <Toolbar disableGutters>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon/>
            </IconButton>
            <div className={classes.grow}/>
            {authButton}
          </Toolbar>
        </Container>
      </AppBar>
      <div className={classes.emptyToolbar}/>
    </>
  )
}

export default NavBar
