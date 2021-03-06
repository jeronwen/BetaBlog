import { IconButton } from "@mui/material";
import { LoginModal } from "../auth/login/";
import { fetchFindItems } from "../../redux/actions/items.js";
import { Input } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/globalSettings";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import "./Header.scss";

export const Header = () => {
  const login = useSelector((state) => state.globalSettings.statusLogin);
  const dispatch = useDispatch();
  const [openLogin, setOpenLogin] = React.useState(false);

  const handleOpenLogin = () => {
    setOpenLogin(!openLogin);
  };
  const [openReg, setOpenReg] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };
  const handleFindItems = () => {
    if (search !== "") {
      dispatch(fetchFindItems(search));
    } else {
      alert("Введите запрос в поле!");
    }
  };

  return (
    <div className="header">
      <h1>SEMENOV BLOG</h1>

      <div className="group-btn">
        <Input
          className="input-search"
          placeholder={"Введите запрос..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></Input>
        <IconButton onClick={() => handleFindItems()}>
          <SearchIcon></SearchIcon>
        </IconButton>
        {login ? (
          <>
            <Tooltip title="Написать" arrow>
              <Link to={"/create-post"}>
                <IconButton>
                  <CreateIcon></CreateIcon>
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Выход" arrow>
              <Link to={"/"}>
                <IconButton onClick={() => handleLogout()}>
                  <ExitToAppIcon></ExitToAppIcon>
                </IconButton>
              </Link>
            </Tooltip>
          </>
        ) : (
          <IconButton onClick={handleOpenLogin}>
            <PersonIcon></PersonIcon>
          </IconButton>
        )}

        <LoginModal open={openLogin} handleClose={handleOpenLogin}></LoginModal>
        {/* <RegistrationModal
          open={openReg}
          handleOpen={handleOpenReg}
        ></RegistrationModal> */}
      </div>
    </div>
  );
};
