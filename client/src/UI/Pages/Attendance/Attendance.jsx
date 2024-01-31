import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../../Redux/Features/AuthSlice/AuthSlice";
import axios from "axios";
import { Button, Container, Input } from "reactstrap";
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
  Table,
} from "@chakra-ui/react";
import { GrSearch } from "react-icons/gr";
import "./Attendance.css";

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  console.log("Attendance ~ attendanceData:", attendanceData);
  const toast = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.authReducer);
  const [search, setSearch] = useState();
  const [filtersearch, setFilterSearch] = useState();

  useEffect(() => {
    // Fetch user data first
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    // Fetch attendance data only when user data is available
    if (user?._id) {
      fetchUpdatedData();
    }
  }, [user, dispatch]);

  const checkInHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/attendance/checkin",
        {
          userId: user?._id,
        }
      );

      console.log(response.data);
      toast({
        title: "Successful",
        description: "Check In Successful",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      // Fetch updated data after check-in
      fetchUpdatedData();
    } catch (err) {
      console.log(err?.message);
      toast({
        title: "Failed",
        description: "Check-Out First or You Reached Maximum Check-in Limites",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const checkOutHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/attendance/checkout",
        {
          userId: user?._id,
        }
      );

      console.log(response.data);
      toast({
        title: "Success",
        description: "Check-Out Successful",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      // Fetch updated data after check-out
      fetchUpdatedData();
    } catch (err) {
      console.log(err?.message);
      toast({
        title: "Check-Out Failed",
        description: "Check-In First",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const fetchUpdatedData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/attendance/getAll/${user._id}`
      );
      console.log(response?.data);
      setAttendanceData(response?.data?.data);
    } catch (err) {
      console.log(err?.message);
    }
  };

  useEffect(() => {
    const searchData = attendanceData?.map?.((e, i) => {
      const filteredRecords = e?.attendanceRecords?.filter((record) => {
        return record?.date
          ?.toLowerCase?.()
          ?.includes?.(search?.toLowerCase?.());
      });

      return { ...e, attendanceRecords: filteredRecords };
    });

    setFilterSearch(searchData);
  }, [search, attendanceData]);

  return (
    <div className="py-24 min-h-screen attendance ms-56 bg-[#EBF3FC] globle">
      <Container>
        <div className="pt-[45px] pb-[32px] globle-breadcum">
          <h1 className="head">All Leaves</h1>
        </div>

        <div className="searchbar w-full flex justify-between items-center globle-search">
          <div className="pos">
            <input
              className="input ps-3"
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e?.target?.value)}
            />
            <GrSearch className="icon" />
          </div>
          <div className="flex gap-3 ">
            <div
              className="head-btn cursor-pointer"
              onClick={() => checkInHandler()}
            >
              Check-In
            </div>
            <div
              className="head-btn cursor-pointer"
              onClick={() => checkOutHandler()}
            >
              Check-Out
            </div>
          </div>
        </div>

        <TableContainer>
          <Table hover className="bg-white">
            <Thead>
              <Tr>
                <Th>Sr</Th>
                <Th>Date</Th>
                <Th>Check-In</Th>
                <Th>Check-Out</Th>
                {/* <Th>Status</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {(search ? filtersearch : attendanceData)?.map((e, i) => {
                return (
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td>
                      {e?.attendanceRecords?.map((e, i) => {
                        return <div key={i}>{e?.date}</div>;
                      })}
                    </Td>
                    <Td>
                      {e?.attendanceRecords?.map((e, i) => {
                        return (
                          <div key={i}>
                            {e?.checkIn?.map((e, i) => {
                              return (
                                <Tr key={i}>
                                  <Td className="font-medium text-green-600">
                                    {e}
                                  </Td>
                                </Tr>
                              );
                            })}
                          </div>
                        );
                      })}
                    </Td>
                    <Td>
                      {e?.attendanceRecords?.map((e, i) => {
                        return (
                          <div key={i}>
                            {e?.checkOut?.map((e, i) => {
                              return (
                                <Tr key={i}>
                                  <Td className="font-medium text-red-600">
                                    {e}
                                  </Td>
                                </Tr>
                              );
                            })}
                          </div>
                        );
                      })}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Attendance;
