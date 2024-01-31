import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
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
import Select from "react-select";
import axios from "axios";
import { createLeave } from "../../../../Redux/Features/LeaveSlice/LeaveSlice";
import { toast } from "react-toastify";
import { fetchUserData } from "../../../../Redux/Features/AuthSlice/AuthSlice";
import { Center, useToast } from "@chakra-ui/react";
import "./Apply.css";

function Apply() {
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [leaveData, setLeaveData] = useState({
    leavetype: [],
    leavestart: "",
    leaveend: "",
    leavetime: "",
    leaveDate: "",
    reason: "",
    status: "Pending",
  });
  console.log("Apply ~ leaveData:", leaveData);
  const [leaveType, setLeaveType] = useState();
  const toast = useToast({ position: "bottom-right" });

  const options = [
    { value: "paid-half", label: "Paid-Half" },
    { value: "paid-leave", label: "Paid-Leave" },
    { value: "sick-leave", label: "Sick-Leave" },
  ];

  const timeOptions = [
    { value: "9:30 AM to 2:00 PM", label: "9:30 AM to 2:00 PM" },
    { value: "2:00 PM to 6:30 PM", label: "2:00 PM to 6:30 PM" },
  ];

  const levaeTypeHandler = (selectedOption) => {
    setLeaveData({ ...leaveData, leavetype: selectedOption?.value });
    setLeaveType(selectedOption?.value !== "paid-half");
  };

  const leaveHandler = () => {
    const isPaidHalf = leaveData.leavetype === "paid-half";
    const isSickLeave = leaveData.leavetype === "sick-leave";
    const isPaidLeave = leaveData.leavetype === "paid-leave";

    // Perform manual validation based on leave type
    if (
      leaveData.leavetype &&
      ((isPaidHalf && !isPaidLeave) ||
        (isSickLeave &&
          leaveData.leavestart &&
          leaveData.leaveend &&
          leaveData.reason) ||
        (isPaidLeave &&
          leaveData.leavestart &&
          leaveData.leaveend &&
          leaveData.reason))
    ) {
      // Validation passed, proceed with form submission
      axios({
        method: "post",
        url: "http://localhost:8000/leaves/applyleave",
        data: leaveData,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
        .then((res) => {
          dispatch(createLeave(res));
          toast({
            title: "Leave Sent Successfully",
            description: "Please Wait Until Boss Approved Your Leave",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Failed",
            description: "You Can Apply Paid-Leave Once Per Month",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        });

      // Reset form fields after submission
      setLeaveData({
        leavetype: "",
        leavestart: "",
        leaveend: "",
        leavetime: "",
        leaveDate: "",
        reason: "",
        status: "Pending",
      });
      setLeaveType("");
    } else {
      // Validation failed, show an error
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  return (
    <>
      <div className="bg-[#EBF3FC] grid place-content-center min-h-screen apply ms-56 relative globle">
        <Container>
          <div className="apply-head absolute left-44 top-36 ">
            <h1 className="head">Leave Application</h1>
          </div>
          <div className="px-[95px] py-[35px] bg-white apply-main">
            <div className="pb-3">
              <span className="name1">Hello,</span>{" "}
              <span className="name2">
                {user.firstname} {user.lastname}
              </span>
            </div>
            <Form>
              <Row>
                <Col>
                  <Label className="label">Leave Type :</Label>
                  <FormGroup>
                    <Select
                      options={options}
                      onChange={(selectedOption) =>
                        levaeTypeHandler(selectedOption)
                      }
                      value={options.find(
                        (option) => option.value === leaveData.leavetype
                      )}
                      required
                      className="h-[50px] input"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                {leaveType ? (
                  <Col md="12">
                    {leaveType ? (
                      <Label className="label">Start Leave</Label>
                    ) : null}
                    <FormGroup>
                      {leaveType ? (
                        <Input
                          type="date"
                          onChange={(e) =>
                            setLeaveData({
                              ...leaveData,
                              leavestart: e?.target?.value,
                            })
                          }
                          value={leaveData.leavestart}
                          className="h-[50px] input"
                          required
                        />
                      ) : null}
                    </FormGroup>
                  </Col>
                ) : (
                  <Col md="12">
                    {leaveType ? (
                      <Label className="label">Start Leave</Label>
                    ) : null}
                    <FormGroup>
                      {leaveType ? (
                        <Input
                          type="date"
                          onChange={(e) =>
                            setLeaveData({
                              ...leaveData,
                              leavestart: e?.target?.value,
                            })
                          }
                          value={leaveData.leavestart}
                          className="h-[50px]  input"
                          required
                        />
                      ) : null}
                    </FormGroup>
                  </Col>
                )}

                <Col>
                  {leaveType ? (
                    <Label className="label">End Leave</Label>
                  ) : (
                    <Label className="label">Leave Date</Label>
                  )}
                  <FormGroup>
                    {leaveType ? (
                      <Input
                        type="date"
                        onChange={(e) =>
                          setLeaveData({
                            ...leaveData,
                            leaveend: e?.target?.value,
                          })
                        }
                        value={leaveData.leaveend}
                        className="h-[50px]  input"
                        required
                      />
                    ) : (
                      <Input
                        type="date"
                        onChange={(e) =>
                          setLeaveData({
                            ...leaveData,
                            leaveDate: e?.target?.value,
                          })
                        }
                        value={leaveData.leaveDate}
                        className="h-[50px] input"
                        required
                      />
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  {leaveType ? null : (
                    <Label className="label">Leave Time</Label>
                  )}
                  {leaveType ? null : (
                    <Select
                      options={timeOptions}
                      onChange={(selectedOption) =>
                        setLeaveData({
                          ...leaveData,
                          leavetime: selectedOption?.value,
                        })
                      }
                      value={timeOptions.find(
                        (option) => option.value === leaveData?.leavetime
                      )}
                      required
                      className="h-[50px] input"
                    />
                  )}
                </Col>
              </Row>

              <Row className="py-3">
                <Col md={12}>
                  <Label className="label">Reason</Label>
                  <Input
                    type="textarea"
                    onChange={(e) =>
                      setLeaveData({
                        ...leaveData,
                        reason: e?.target?.value,
                      })
                    }
                    value={leaveData.reason}
                    className="h-[118px]  input"
                    required
                  />
                </Col>
              </Row>
              <button type="submit" className="flex justify-center">
                <Center
                  className="button editbutton"
                  onClick={() => leaveHandler()}
                >
                  Submit
                </Center>
              </button>
            </Form>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Apply;
