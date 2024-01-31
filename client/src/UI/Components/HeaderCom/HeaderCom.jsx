import { Button, Center } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsCalendarCheckFill } from "react-icons/bs";
import { GrUserManager } from "react-icons/gr";
import { SiPhpmyadmin } from "react-icons/si";
import { SlLogin } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchUserData } from "../../../../Redux/Features/AuthSlice/AuthSlice";
import { LuUserCircle } from "react-icons/lu";
import { Container } from "reactstrap";
import "./HeaderCom.css";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";

function HeaderCom() {
  const { token, user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [token, dispatch]);
  return (
    <>
      <div>
        {token ? (
          <div className="w-[260px] min-h-full fixed  bg-white z-[1500] submenu  ">
            <Center className="py-4">
              <img src="/logo.png" alt="" />
            </Center>
            <ol className="flex flex-col gap-4 my-4 text-lg font-medium ps-8">
              {token && user.usertype === "admin" ? (
                <>
                  <li>
                    <NavLink
                      to={"/admin"}
                      className={"flex gap-3 items-center"}
                    >
                      <SiPhpmyadmin className="text-2xl" /> Leaves
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/adminattendance"}
                      className={"flex gap-3 items-center"}
                    >
                      <BsCalendarCheckFill className="text-xl" /> Attendance
                    </NavLink>
                  </li>
                </>
              ) : null}
              {token && user?.usertype === "employee" ? (
                <>
                  <li>
                    <NavLink
                      to={"/showall"}
                      className={"flex gap-3 items-center"}
                    >
                      <SiPhpmyadmin className="text-2xl" /> Leaves
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/attendance"}
                      className={"flex gap-3 items-center"}
                    >
                      <BsCalendarCheckFill className="text-xl" /> Attendance
                    </NavLink>
                  </li>
                </>
              ) : null}
              {token ? (
                <li>
                  <NavLink
                    to={"/profile"}
                    className={"flex gap-3 items-center"}
                  >
                    <GrUserManager className="text-xl" /> Profile
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink to={"/login"} className={"flex gap-3 items-center"}>
                    {" "}
                    <SlLogin /> Login
                  </NavLink>
                </li>
              )}
            </ol>
          </div>
        ) : null}
      </div>

      {token ? (
        <div className="w-full navbar fixed-top">
          <Container>
            {token ? (
              <div className=" flex items-center w-full justify-between h-[60px] whole">
                <div className="dropdown w-full flex items-center justify-between">
                  <div className="py-4 sub-logo ">
                    <img src="/logo.png" alt="" />
                  </div>
                  <div>
                    <Menu placement="bottom">
                      <MenuButton as={Button}>
                        <GiHamburgerMenu />
                      </MenuButton>
                      <MenuList>
                        {token && user.usertype === "admin" ? (
                          <>
                            <MenuItem>
                              <NavLink
                                to={"/admin"}
                                className={"flex gap-3 items-center"}
                              >
                                <SiPhpmyadmin className="text-2xl" /> Leaves
                              </NavLink>
                            </MenuItem>
                            <MenuItem>
                              <NavLink
                                to={"/adminattendance"}
                                className={"flex gap-3 items-center"}
                              >
                                <BsCalendarCheckFill className="text-xl" />{" "}
                                Attendance
                              </NavLink>
                            </MenuItem>
                          </>
                        ) : null}
                        {token && user?.usertype === "employee" ? (
                          <>
                            <MenuItem>
                              <NavLink
                                to={"/showall"}
                                className={"flex gap-3 items-center"}
                              >
                                <SiPhpmyadmin className="text-2xl" /> Leaves
                              </NavLink>
                            </MenuItem>
                            <MenuItem>
                              <NavLink
                                to={"/attendance"}
                                className={"flex gap-3 items-center"}
                              >
                                <BsCalendarCheckFill className="text-xl" />{" "}
                                Attendance
                              </NavLink>
                            </MenuItem>
                          </>
                        ) : null}
                        {token ? (
                          <MenuItem>
                            <NavLink
                              to={"/profile"}
                              className={"flex gap-3 items-center"}
                            >
                              <GrUserManager className="text-xl" /> Profile
                            </NavLink>
                          </MenuItem>
                        ) : (
                          <MenuItem>
                            <NavLink
                              to={"/login"}
                              className={"flex gap-3 items-center"}
                            >
                              {" "}
                              <SlLogin /> Login
                            </NavLink>
                          </MenuItem>
                        )}
                      </MenuList>
                    </Menu>
                  </div>
                </div>

                <div className="head-profile w-full block justify-end">
                  {token ? (
                    <NavLink to={"/profile"}>
                      <div className="flex gap-3 justify-end items-center">
                        <h5 className="m-0 capitalize">
                          {user?.firstname} {user?.lastname}
                        </h5>
                        <LuUserCircle className="text-[35px] text-[#191A36]" />
                      </div>
                    </NavLink>
                  ) : (
                    <NavLink to={"/login"}>
                      <div className="flex gap-3 justify-end items-center">
                        <h5 className="m-0">Hello, User</h5>
                        <LuUserCircle className="text-[35px] text-[#191A36]" />
                      </div>
                    </NavLink>
                  )}
                </div>
              </div>
            ) : null}
          </Container>
        </div>
      ) : null}
    </>
  );
}

export default HeaderCom;
