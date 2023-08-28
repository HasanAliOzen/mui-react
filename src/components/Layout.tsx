import { PropsWithChildren } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContextProvider";
import {
  Drawer,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  AppBar,
  Typography,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import {
  Brightness4Rounded,
  Brightness7Rounded,
  CreateOutlined,
  SubjectOutlined,
} from "@mui/icons-material";

const drawerWidth = 240;

const Layout = (props: PropsWithChildren) => {
  const { children } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleColorMode } = useThemeContext();

  const menuItems = [
    {
      text: "Notes",
      icon: <SubjectOutlined color="primary" />,
      path: "/",
    },
    {
      text: "Create Note",
      icon: <CreateOutlined color="primary" />,
      path: "/create",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" noWrap component="h1">
            Notes
          </Typography>
          <IconButton
            onClick={toggleColorMode}
            color="inherit"
            sx={{ justifyContent: "flex-end" }}
          >
            {mode === "dark" ? <Brightness4Rounded /> : <Brightness7Rounded />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              sx={
                location.pathname == item.path
                  ? (theme) => {
                      return { bgcolor: theme.palette.action.selected };
                    }
                  : {}
              }
              disablePadding
            >
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
