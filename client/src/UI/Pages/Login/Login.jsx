import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import {
  fetchUserData,
  login,
} from "../../../../Redux/Features/AuthSlice/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { Center, useToast } from "@chakra-ui/react";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast({ position: "bottom-right" });
  const { token } = useSelector((state) => state?.authReducer);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [token, dispatch]);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const loginHandler = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:8000/user/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: userData,
      });

      console.log(".then ~ res:", res);
      dispatch(login(res.data));

      if (res?.data?.user?.usertype === "admin") {
        navigate("/admin");
      } else {
        navigate("/showall");
      }

      toast({
        title: "Login Successfully",
        description: "Thank you, for visit",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Login Failed",
        description: "Invalid Email or Password",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <div
        className="login-signup grid place-content-center min-h-screen bg-[#EBF3FC]"
        style={{ marginLeft: token ? "208px" : "0px" }}
      >
        <Container>
          <div className="px-[90px] py-[56px] bg-white rounded-md shadow-md sub-login">
            <div className="pb-10">
              <Center>
                <img src="/logo.png" alt="" />
              </Center>
              <Center className="text1">Welcome to</Center>
              <Center className="text2">Leave Management System</Center>
              <Center className="text3">Please Login your account.</Center>
            </div>
            <Form className="max-w-[518px] mb-3">
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="example@mail.com"
                  type="email"
                  value={userData?.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e?.target?.value })
                  }
                  className="h-[50px] w-[500px]"
                />
              </FormGroup>{" "}
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  id="examplePassword"
                  name="password"
                  placeholder="*********"
                  type="password"
                  value={userData?.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e?.target?.value })
                  }
                  className="h-[50px] w-[500px]"
                />
              </FormGroup>{" "}
              <div
                className="button w-full text-center text-white"
                onClick={() => loginHandler()}
              >
                Log In
              </div>
            </Form>
            <Center>
              <Link to={"/signup"}>
                <span className="link1">New member here?</span>{" "}
                <span className="link2">Register Now</span>{" "}
              </Link>
            </Center>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Login;
