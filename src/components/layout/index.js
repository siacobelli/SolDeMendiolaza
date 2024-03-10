import { Layout, useSidebarState, useCreatePath } from "react-admin";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import {
  PointOfSale,
  AssignmentInd,
  Hotel,
  Paid,
  Home,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { ListItemIcon } from "@mui/material";

const menuData = [
  { icon: <Home />, label: "Inicio", path: "/" },
  {
    icon: <PointOfSale />,
    label: "Movimientos",
    path: { resource: "movimientos", type: "list" },
  },
  {
    icon: <Hotel />,
    label: "Huespedes",
    path: { resource: "huespedes", type: "list" },
  },
  {
    icon: <Paid />,
    label: "Convenios",
    path: { resource: "convenios", type: "list" },
  },
  {
    icon: <AssignmentInd />,
    label: "Personal",
    subitems: [
      { label: "Personal", path: { resource: "personal", type: "list" } },
      {
        label: "Horas Mensuales",
        path: { resource: "horasMensualesPersonal", type: "list" },
      },
    ],
  },
];

const SidebarMenu = () => {
  const [sidebarState, setSidebarState] = useSidebarState();
  const [expand, setExpand] = React.useState({});
  const navigate = useNavigate();
  const createPath = useCreatePath();

  const handleClick = (index, item) => {
    console.log("item clic %o", item);
    if (item.path) {
      const pathToNavigate = item.path.resource
        ? createPath(item.path)
        : item.path;
      navigate(pathToNavigate);
    }
    setExpand((prevOpen) => {
      if (prevOpen[index]) setSidebarState(true);
      return {
        ...prevOpen,
        [index]: !prevOpen[index],
      };
    });
  };

  const renderMenuItems = (items, parentIndex = "") => {
    return items.map((item, index) => {
      const itemIndex = `${parentIndex}_${index}`;
      const hasSubitems = item.subitems && item.subitems.length > 0;

      return (
        <React.Fragment key={itemIndex}>
          <ListItem onClick={() => handleClick(itemIndex, item)}>
            <ListItemIcon sx={{ minWidth: "32px" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
            {sidebarState && hasSubitems ? (
              expand[itemIndex] ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )
            ) : null}
          </ListItem>
          {sidebarState && hasSubitems && (
            <Collapse in={expand[itemIndex]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderMenuItems(item.subitems, itemIndex)}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });
  };

  return <List component="nav">{renderMenuItems(menuData)}</List>;
};

export const MainLayout = (props) => <Layout {...props} menu={SidebarMenu} />;
