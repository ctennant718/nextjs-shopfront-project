import React from "react";
import Link from "next/link";

import { useUser } from "@auth0/nextjs-auth0/client";

import {
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box
} from '@/components/mui'
import ShoppingCartDisplay from "@/components/BasketDisplay";

function MobileNavigation({
  mobileOpen = false,
  handleDrawerToggle = () =>
    console.log("no handleDrawerToggle function provided"),
  drawerWidth = 240,
}) {
  const { user } = useUser();
  const itemLinkStyles = {
    display: "block",
    textDecoration: "none",
    flexGrow: "1",
  };
  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, 
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Go Outdoors! {user && <ShoppingCartDisplay user={user} />}
          </Typography>
          <Divider />
          <List>
            <ListItem>
              <Link href={"/"} passHref style={itemLinkStyles}>
                <ListItemButton sx={{ textAlign: "left", width: '100%' }}>
                  <ListItemText primary={"Shop"} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link href={"/blog"} passHref style={itemLinkStyles}>
                <ListItemButton sx={{ textAlign: "left", width: '100%' }}>
                  <ListItemText primary={"Blog"} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link href={"/contact"} passHref style={itemLinkStyles}>
                <ListItemButton sx={{ textAlign: "left", width: '100%' }}>
                  <ListItemText primary={"Contact"} />
                </ListItemButton>
              </Link>
            </ListItem>
            {user ? (
              <>
                <ListItem>
                  <Link href={"/profile"} passHref style={itemLinkStyles}>
                    <ListItemButton sx={{ textAlign: "left" }}>
                      <ListItemText primary={"Profile"} />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href={"/api/auth/logout"}
                    passHref
                    style={itemLinkStyles}
                  >
                    <ListItemButton sx={{ textAlign: "left", width: "100%" }}>
                      <ListItemText primary={"Log Out"} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              </>
            ) : (
              <ListItem>
                <Link
                  href={"/api/auth/login"}
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  <ListItemButton sx={{ textAlign: "left" }}>
                    <ListItemText primary={"Log In"} />
                  </ListItemButton>
                </Link>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default MobileNavigation;