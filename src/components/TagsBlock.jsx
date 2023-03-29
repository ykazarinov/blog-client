import React from "react";

import { List } from "@mui/material";
import {ListItem} from "@mui/material";
import {ListItemButton} from "@mui/material";
import {ListItemIcon} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import {ListItemText} from "@mui/material";
import {Skeleton} from "@mui/material";
import { Link } from "react-router-dom";

import { SideBlock } from "./SideBlock";

export const TagsBlock = ({ items, isLoading = true }) => {
  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/tag/${name}`}
            key={i}
          >
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};
