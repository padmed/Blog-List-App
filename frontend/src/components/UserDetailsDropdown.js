import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  TableCell,
  TableRow,
} from "@mui/material";

const UserDetailsDropdown = ({ user }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "none" } }}>
        <TableCell sx={{ fontSize: "20px", borderBottom: "none" }}>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {user.username}
        </TableCell>
        <TableCell sx={{ fontSize: "20px", borderBottom: "none" }}>
          {user.name}
        </TableCell>
        <TableCell sx={{ fontSize: "20px", borderBottom: "none" }}>
          {user.blogs.length}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} unmountOnExit timeout="auto">
            {user.blogs.length > 0 ? (
              <Box sx={{ margin: 1 }}>
                <h4>Blogs created by {user.name}:</h4>
                <List>
                  {user.blogs.map((blog) => (
                    <div key={blog.id}>
                      <ListItem key={blog.id}>- {blog.title}</ListItem>
                      <Divider variant="middle" />
                    </div>
                  ))}
                </List>
              </Box>
            ) : (
              <h4>There are no blogs by {user.name}</h4>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

UserDetailsDropdown.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserDetailsDropdown;
