import { useSelector } from "react-redux";
import TableContainer from "@mui/material/TableContainer";
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import UserDetailsDropdown from "./UserDetailsDropdown";
import PaperStyled from "./PaperStyled";

const Users = () => {
  const users = useSelector((state) => state.allUsers);

  return (
    <div
      style={{
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TableContainer component={PaperStyled}>
        <Toolbar style={{ display: "flex", justifyContent: "center" }}>
          <h2>Users</h2>
        </Toolbar>
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "20px", width: "100px" }}>
                Username
              </TableCell>
              <TableCell sx={{ fontSize: "20px", width: "100px" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontSize: "20px", width: "100px" }}>
                Blogs Created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <UserDetailsDropdown key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
