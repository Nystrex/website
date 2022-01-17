import useSession from "@/hooks/use-session"
import AppBar, { AppBarProps } from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import { styled } from "@mui/material/styles"
import { signIn, signOut } from "next-auth/react"
import NextImage from "next/image"
import NextLink from "next/link"
import { useRouter } from "next/router"
import * as React from "react"
import AvatarButton from "./AvatarButton"
import UserAvatarMenu from "./UserAvatarMenu"
import { IconButton, Menu, MenuItem } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"

interface StyledAppBarProps extends AppBarProps {
  scrolled: boolean
}

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "scrolled",
})<StyledAppBarProps>(({ theme, scrolled }) => ({
  backgroundColor: "transparent",
  transition: theme.transitions.create(["background-color", "box-shadow"]),
  ...(scrolled && {
    backgroundColor: theme.palette.background.default,
  }),
}))

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })
  const router = useRouter()
  const [session, loading] = useSession()

  let homePageLink: React.ReactNode
  if (router.route == "/") {
    homePageLink = (
      <Link variant="h6" color="inherit" underline="hover">
        Fire
      </Link>
    )
  } else {
    homePageLink = (
      <Link>
        <NextImage src="/logo-gr.svg" width={40} height={40} layout="intrinsic" priority />
      </Link>
    )
  }

  let authButton: React.ReactNode

  if (loading) {
    authButton = <Typography variant="body2">Loading...</Typography>
  } else if (session) {
    if (session.error == "RefreshFailed") signIn("discord")
    const onClickAvatar = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setAnchorEl(e.currentTarget)
    }
    const onClickLogout = (e: React.MouseEvent) => {
      e.preventDefault()
      return signOut()
    }
    const onCloseMenu = () => setAnchorEl(null)

    authButton = (
      <>
        <AvatarButton disableRipple user={session.user} onClick={onClickAvatar} />
        <UserAvatarMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onCloseMenu}
          onClickLogout={onClickLogout}
        />
      </>
    )
  } else {
    const onClick = (e: React.MouseEvent) => {
      e.preventDefault()
      return signIn("discord")
    }
    authButton = (
      <Button color="inherit" onClick={onClick}>
        Login with Discord
      </Button>
    )
  }

  return (
    <>
      <StyledAppBar position="fixed" scrolled={scrollTrigger} elevation={scrollTrigger ? 4 : 0}>
        <Container>
          <Toolbar disableGutters>
            <NextLink href="/" passHref>
              <Typography
                sx={{ mr: 2, display: { xs: "none", md: "flex", textDecoration: "none", cursor: "pointer" } }}
              >
                {homePageLink}
              </Typography>
            </NextLink>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={() => {}}>
                  <NextLink href="/discover" passHref>
                    <Typography textAlign="center">Discover</Typography>
                  </NextLink>
                </MenuItem>
                <MenuItem onClick={() => {}}>
                  <NextLink href="/commands" passHref>
                    <Typography textAlign="center">Commands</Typography>
                  </NextLink>
                </MenuItem>
                <MenuItem onClick={() => {}}>
                  <NextLink href="/stats" passHref>
                    <Typography textAlign="center">Stats</Typography>
                  </NextLink>
                </MenuItem>
              </Menu>
            </Box>

            <NextLink href="/" passHref>
              <Typography
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none", textDecoration: "none", cursor: "pointer" } }}
              >
                {homePageLink}
              </Typography>
            </NextLink>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <NextLink href="/discover" passHref>
                <Button variant="text">Discover</Button>
              </NextLink>
              <NextLink href="/commands" passHref>
                <Button variant="text">Commands</Button>
              </NextLink>
              <NextLink href="/stats" passHref>
                <Button variant="text">Stats</Button>
              </NextLink>
            </Box>
            {authButton}
          </Toolbar>
        </Container>
      </StyledAppBar>
      <Box minHeight={64} />
    </>
  )
}

export default NavBar
