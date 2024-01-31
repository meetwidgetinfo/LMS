import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import {
  fetchUserData,
  login,
} from "../../../../Redux/Features/AuthSlice/AuthSlice";
import { Center } from "@chakra-ui/react";
import "./SignUp.css";

function SignUp() {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "",
    thumbnail: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerHandler = () => {
    axios({
      method: "post",
      url: "http://localhost:8000/user/register",
      data: userData,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        dispatch(login(res.data));
        navigate("/showall");
      })
      .catch((err) => console.log("err", err?.message));
  };

  return (
    <div className="login-signup grid place-content-center min-h-screen bg-[#EBF3FC] main-signup">
      <Container>
        <div className="px-[90px] py-[30px] bg-white shadow-md rounded-md signup ">
          <div className="pb-10">
            <Center className="logo-img">
              <img src="/logo.png" alt="" />
            </Center>
            <Center className="text1">Welcome to</Center>
            <Center className="text2">Leave Management System</Center>
          </div>
          <Form className="mb-4">
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="firstname">Firstname</Label>
                  <Input
                    id="firstname"
                    name="firstname"
                    placeholder="Firstname"
                    type="text"
                    value={userData?.firstname}
                    onChange={(e) =>
                      setUserData({ ...userData, firstname: e?.target?.value })
                    }
                    className="w-[247px] h-[50px]"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="lastname">Lastname</Label>
                  <Input
                    id="lastname"
                    name="lastname"
                    placeholder="Lastname"
                    type="text"
                    value={userData?.lastname}
                    onChange={(e) =>
                      setUserData({ ...userData, lastname: e?.target?.value })
                    }
                    className="w-[247px] h-[50px]"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter Your Email Address"
                    type="email"
                    value={userData?.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e?.target?.value })
                    }
                    className="w-[518px] h-[50px]"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="password">Create Password</Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="********"
                    type="password"
                    value={userData?.password}
                    onChange={(e) =>
                      setUserData({ ...userData, password: e?.target?.value })
                    }
                    className="w-[247px] h-[50px]"
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="Phone">Mobile Number</Label>
                  <Input
                    id="Phone"
                    name="phone"
                    placeholder="Enter Your Phone Number"
                    type="number"
                    value={userData?.phone}
                    onChange={(e) =>
                      setUserData({ ...userData, phone: e?.target?.value })
                    }
                    className="w-[247px] h-[50px]"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col>
                <FormGroup>
                  <Label for="role">role</Label>
                  <Input
                    id="role"
                    name="role"
                    placeholder="Enter Your Role"
                    type="text"
                    value={userData?.role}
                    onChange={(e) =>
                      setUserData({ ...userData, role: e?.target?.value })
                    }
                    className="w-[518px] h-[50px]"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col>
                <FormGroup>
                  <Label for="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Enter Your Address"
                    type="text"
                    value={userData?.address}
                    onChange={(e) =>
                      setUserData({ ...userData, address: e?.target?.value })
                    }
                    className="w-[518px] h-[50px]"
                  />
                </FormGroup>
              </Col>
            </Row>

            <div
              className="button w-full text-center text-white mt-2"
              onClick={() => registerHandler()}
            >
              Create Account
            </div>
          </Form>
          <Link to={"/"}>
            <Center>
              <div>
                <span className="link1 pr-2">Already have an accout..? </span>
                <span className="link2">Login</span>
              </div>
            </Center>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default SignUp;
