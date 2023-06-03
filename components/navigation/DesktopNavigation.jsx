import React from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuIcon,
  Typography,
  Button,
  Box,
} from "@/components/mui";
import { useTheme } from "@mui/material/styles";
import { useUser } from "@auth0/nextjs-auth0/client";
import QueryBoundaries from "../QueryBoundaries";

import ShoppingCartDisplay from "@/components/BasketDisplay";

function DesktopNavigation({
  handleDrawerToggle = () =>
    console.log("no handleDrawerToggle function provided"),
}) {
  const theme = useTheme();
  const { user } = useUser();
  const fontColor = "rgb(59, 73, 111)";
  return (
    <>
      <AppBar component="nav" position="sticky" sx={{ mb: 2 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            href={`/`}
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              textDecoration: "none",
              color: fontColor,
            }}
          >
            Go Outdoors!
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {user && <ShoppingCartDisplay user={user} />}

            <Button
              sx={{ color: fontColor }}
              component={Link}
              href="/blog"
            >
              Blog
            </Button>
            {user ? (
              <>
                <Button
                  href="/profile"
                  component={Link}
                  sx={{ color: fontColor }}
                >
                  Profile
                </Button>
                <Button
                  sx={{ color: fontColor }}
                  component={Link}
                  href="/contact"
                >
                  Contact
                </Button>
                <Button
                  href="/api/auth/logout"
                  component={Link}
                  sx={{ color: fontColor }}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <Button
                href="/api/auth/login"
                component={Link}
                sx={{ color: fontColor }}
              >
                Log In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default DesktopNavigation;
