import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteLeaves,
  updateLeave,
} from "../../../../Redux/Features/LeaveSlice/LeaveSlice";
import "./Admin.css";
import moment from "moment";
import { Delete, Edit } from "lucide-react";
import { Container, Modal, ModalBody, ModalHeader } from "reactstrap";
import { GrSearch } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

function AdminLeaves() {
  const [leavedata, setLeaveData] = useState();
  console.log("AdminLeaves ~ leavedata:", leavedata);
  const [getdata, setGetData] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast({ position: "bottom-right" });
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [filtersearch, setFilterSearch] = useState();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/leaves/getbyadmin",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => setLeaveData(res?.data))
      .catch((err) => console.log("err", err?.message));
  }, []);

  const editHandler = (data, index) => {
    setGetData({ ...data, index });
    onOpen();
  };

  const updateHandler = (decision) => {
    axios({
      method: "put",
      url: `http://localhost:8000/leaves/update/${getdata?._id}`,
      data: { status: decision }, // Only send the updated status
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        // Assuming the response contains the updated leave data
        const updatedLeave = res.data;

        const updatedLeaveData = [...leavedata];
        updatedLeaveData[getdata?.index].status = updatedLeave.status;

        setLeaveData(updatedLeaveData);

        dispatch(
          updateLeave({
            status: updatedLeave.status,
            index: getdata?.index,
          })
        );
        toast({
          title: "Update Successful",
          description: "Leave is successfully updated",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((err) =>
        toast({
          title: "Update Failed",
          description: err?.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        })
      );

    onClose();
  };

  const deleteHandler = (data, index) => {
    dispatch(deleteLeaves({ id: data?._id, index })).then(() => {
      // State update after deletion is complete
      const updatedLeaveData = [...leavedata];
      updatedLeaveData.splice(index, 1);
      setLeaveData(updatedLeaveData);

      toast({
        title: "Successful",
        description: "Leave Deletes Successful",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    });
  };

  useEffect(() => {
    const searchData = leavedata?.filter?.((e) => {
      const firstNameFilter = e?.user?.firstname
        ?.toLowerCase?.()
        ?.includes?.(search?.toLowerCase?.());

      const lastNameFilter = e?.user?.lastname
        ?.toLowerCase?.()
        ?.includes?.(search?.toLowerCase?.());

      const leaveTypeFilter = e?.leavetype
        ?.toLowerCase?.()
        ?.includes?.(search?.toLowerCase?.());

      const startDateFiler = moment(e.leavestart)
        .format(" Do MMMM YYYY")
        ?.toLowerCase?.()
        ?.includes?.(search?.toLowerCase?.());

      const endDateFilter = moment(e.leaveend)
        .format(" Do MMMM YYYY")
        ?.toLowerCase?.()
        ?.includes(search?.toLowerCase?.());

      const leaveTimeFilter = moment(e.leavetime)
        .format("lll")
        ?.toLowerCase?.()
        ?.includes?.(search?.toLowerCase?.());

      const statusFilter = e?.status
        ?.toLowerCase?.()
        ?.includes?.(search?.toLowerCase?.());

      return (
        firstNameFilter ||
        lastNameFilter ||
        leaveTypeFilter ||
        startDateFiler ||
        endDateFilter ||
        leaveTimeFilter ||
        statusFilter
      );
    });

    setFilterSearch(searchData);
  }, [search, leavedata]);

  return (
    <>
      <div className=" ms-56 py-24 bg-[#EBF3FC] admin min-h-screen globle">
        <Container>
          <div className="pt-[45px] pb-[32px] flex justify-between items-center globle-breadcum">
            <h1 className="head ">All Leaves</h1>
            <Button colorScheme="facebook" onClick={toggle}>
              Paid Leaves Info
            </Button>
          </div>
          <div className="searchbar w-full flex justify-between globle-search">
            <div className="pos">
              <input
                className="input ps-3"
                type="text"
                value={search}
                onChange={(e) => setSearch(e?.target?.value)}
                placeholder="Search Here"
              />
              <GrSearch className="icon" />
            </div>
          </div>
          <div className="table-col rounded-md ">
            <TableContainer>
              <Table
                variant="striped"
                size={"sm"}
                style={{ backgroundColor: "white" }}
                colorScheme="messenger"
              >
                <Thead>
                  <Tr>
                    <Th>Sr</Th>
                    <Th>Name</Th>
                    <Th>Leave Type</Th>
                    <Th>Start Leaves</Th>
                    <Th>End Leaves</Th>
                    <Th>Leave Date</Th>
                    <Th>Leave Time</Th>
                    <Th>Reason</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {(search ? filtersearch : leavedata)?.map?.((e, i) => {
                    return (
                      <Tr key={e._id}>
                        <Td>{i + 1}</Td>
                        <Td className="max-w-sm capitalize">
                          {e?.user?.firstname} {e?.user?.lastname}
                        </Td>
                        <Td className="capitalize">{e?.leavetype}</Td>
                        <Td>{moment(e.leavestart).format(" Do MMMM YYYY")}</Td>
                        <Td>{moment(e.leaveend).format("Do MMMM YYYY")}</Td>
                        <Td>{moment(e.leaveDate).format("Do MMMM YYYY")}</Td>
                        <Td>{e.leavetime || "Invalid Date"}</Td>
                        <Td>{e.reason}</Td>
                        <Td
                          className={`status-cell ${e?.status?.toLowerCase()} font-bold`}
                        >
                          {e.status}
                        </Td>
                        <Td>
                          <div className="flex items-center gap-2">
                            <Button
                              colorScheme="blue"
                              onClick={() => editHandler(e, i)}
                            >
                              <Edit />
                            </Button>
                            <Button
                              colorScheme="red"
                              onClick={() => deleteHandler(e, i)}
                            >
                              <RiDeleteBin6Line />
                            </Button>
                          </div>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
          <div>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Change Status
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Hello boss, choose what you want..
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button
                      ref={cancelRef}
                      onClick={() => updateHandler("Approve")}
                      colorScheme="green"
                    >
                      Approve
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => updateHandler("Reject")}
                      ml={3}
                    >
                      Reject
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </div>
        </Container>
      </div>

      <div>
        <Modal isOpen={modal} toggle={toggle} centered={"true"} size="xl">
          <ModalHeader toggle={toggle}>Paid Leave Information</ModalHeader>
          <ModalBody>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Sr</Th>
                    <Th>Name</Th>
                    <Th>Total Paid Leaves</Th>
                    <Th>Applied Paid Leaves</Th>
                    <Th>Remaining Paid Leaves</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {/* Filter unique names from leavedata */}
                  {Array.from(
                    new Set(leavedata?.map((e) => e?.user?.firstname))
                  ).map((name, index) => {
                    const userData = leavedata.filter(
                      (e) => e?.user?.firstname === name
                    );

                    // Calculate total and remaining paid leaves
                    let totalPaidLeaves = 0;

                    userData.forEach((e) => {
                      if (
                        e?.leavetype === "paid-leave" &&
                        e?.status === "Approve"
                      ) {
                        totalPaidLeaves += 1;
                      }
                    });

                    userData.forEach((e) => {
                      if (
                        e?.leavetype === "paid-half" &&
                        e?.status === "Approve"
                      ) {
                        totalPaidLeaves += 0.5;
                      }
                    });

                    const remainingPaidLeaves = 12 - totalPaidLeaves;

                    return (
                      <Tr key={index}>
                        <Td>{index + 1}</Td>
                        <Td className="capitalize">
                          {userData[0]?.user?.firstname}{" "}
                          {userData[0]?.user?.lastname}
                        </Td>
                        <Td>12</Td>
                        <Td>{totalPaidLeaves}</Td>
                        <Td>{remainingPaidLeaves}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
}

export default AdminLeaves;
