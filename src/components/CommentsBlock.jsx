import React, { useEffect } from "react";

import { SideBlock } from "./SideBlock";
import {ListItem} from "@mui/material";
import {ListItemAvatar} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {ListItemText} from "@mui/material";
import Divider from "@mui/material/Divider";
import { List } from "@mui/material";
import {Skeleton} from "@mui/material";

import interfaceData from "../assets/data/interface.json"

export const CommentsBlock = ({ items, children, isLoading = true }) => {

  // useEffect(()=>{

  // },[items])

  return (
    <SideBlock title={interfaceData.find((el) => el.lang === 'fr')?.inscription.homePage.lastComments}>
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <ListItemText
                  primary={obj.user.fullName}
                  secondary={obj.text}
                />
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
