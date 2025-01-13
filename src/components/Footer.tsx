import * as React from "react"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"

const StyledFooter = styled("footer")(({ theme }) => ({
  padding: theme.spacing(2, 0),
  marginTop: "auto",
  backgroundColor: theme.palette.grey[900],
}))

const Footer = () => {
  return (
    <StyledFooter>
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="caption" color="textSecondary">
          © 2025 Fire Bot. All Rights Reserved.
          <br />
          <a
            href="https://inv.wtf/privacy"
            style={{
              color: "white",
            }}
          >
            Privacy Policy
          </a>
          {" | "}
          <a href="https://inv.wtf/terms" style={{ color: "white" }}>
            Terms of Service
          </a>
        </Typography>
      </Container>
    </StyledFooter>
  )
}

export default Footer
