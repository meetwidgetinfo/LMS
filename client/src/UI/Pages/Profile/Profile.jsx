import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
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
  logout,
  userUpdate,
} from "../../../../Redux/Features/AuthSlice/AuthSlice";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { Button, Center, useToast } from "@chakra-ui/react";
import { GrSearch } from "react-icons/gr";
import axios from "axios";

function Profile() {
  const disaptch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast({
    position: "bottom-right",
  });
  const { user } = useSelector((state) => state.authReducer);
  // console.log("Profile ~ user:", user);

  const [userdata, setUserData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    address: user.address,
    role: user.role,
    phone: user.phone,
  });

  const logoutHandler = () => {
    disaptch(logout());
    navigate("/");
    toast({
      title: "Logout Successfully",
      description: "Thank You, Visit Again",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  useEffect(() => {
    disaptch(fetchUserData());
  }, []);

  const editHandler = () => {
    axios({
      method: "put",
      url: `http://localhost:8000/user/update/${user?._id}`,
      data: userdata,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        disaptch(userUpdate(res?.data?.data));
        setUserData({
          firstname: res?.data?.data?.firstname,
          lastname: res?.data?.data?.lastname,
          email: res?.data?.data?.email,
          address: res?.data?.data?.address,
          role: res?.data?.data?.role,
          phone: res?.data?.data?.phone,
        });
        toast({
          title: "Success",
          description: "Update Data Successfully",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log("err", err);
        toast({
          title: "Failed",
          description: "Failed To Update Data",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  };

  return (
    <div className="py-24 min-h-screen attendance ms-56 bg-[#EBF3FC] globle">
      <Container>
        <div className="pt-[45px] pb-[48px] flex justify-between globle-breadcum">
          <h1 className="head">Profile</h1>
          <Button colorScheme="red" onClick={() => logoutHandler()}>
            Logout
          </Button>
        </div>

        <div className="px-[125px] py-[48px] bg-white profile">
          <Form>
            <Row className="pb-[22px]">
              <Col md={"6"}>
                <FormGroup>
                  <Label className="label">First Name</Label>
                  <Input
                    value={userdata?.firstname}
                    className="h-[50px] w-[500px] capitalize userinput"
                    onChange={(e) =>
                      setUserData({ ...userdata, firstname: e?.target?.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={"6"}>
                <FormGroup>
                  <Label className="label">Last Name</Label>
                  <Input
                    value={userdata?.lastname}
                    className="h-[50px] w-[500px] capitalize userinput"
                    onChange={(e) =>
                      setUserData({ ...userdata, lastname: e?.target?.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row className="pb-[22px]">
              <Col md={"6"}>
                <FormGroup>
                  <Label className="label">Email Address</Label>
                  <Input
                    value={userdata?.email}
                    className="h-[50px] w-[500px]  userinput"
                    onChange={(e) =>
                      setUserData({ ...userdata, email: e?.target?.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={"6"}>
                <FormGroup>
                  <Label className="label">Address</Label>
                  <Input
                    value={userdata?.address}
                    className="h-[50px] w-[500px] capitalize userinput"
                    onChange={(e) =>
                      setUserData({ ...userdata, address: e?.target?.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row className="pb-[22px] justify-between">
              <Col md={"3"}>
                <FormGroup>
                  <Label className="label">Role</Label>
                  <Input
                    value={userdata?.role}
                    className="h-[50px] w-[500px] capitalize  userinput"
                    onChange={(e) =>
                      setUserData({ ...userdata, role: e?.target?.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={"6"}>
                <FormGroup>
                  <Label className="label">Phone Number</Label>
                  <Input
                    value={userdata?.phone}
                    className="h-[50px] w-[500px] capitalize userinput"
                    onChange={(e) =>
                      setUserData({ ...userdata, phone: e?.target?.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Center>
              <div className="editbutton" onClick={() => editHandler()}>
                Save
              </div>
            </Center>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Profile;
