import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useToast,
  Table,
} from "@chakra-ui/react";
import { GrSearch } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

function AdminAttendance() {
  let [attendance, setAttendance] = useState();
  console.log("AdminAttendance ~ attendance:", attendance);
  let [search, setSearch] = useState();
  let [filterSearch, setFilterSearch] = useState();
  let toast = useToast({ position: "bottom-right" });

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/attendance/admin/getAll",
    }).then((res) => {
      console.log("res", res);
      setAttendance(res?.data);
    });
  }, []);

  useEffect(() => {
    const searchData = attendance?.filter((e) => {
      const firstNamefilter = e?.userId?.firstname
        ?.toLowerCase?.()
        ?.includes?.(search?.toLowerCase?.());

      const lastNameFilter = e?.userId?.lastname
        ?.toLowerCase?.()
        ?.includes?.(search?.toLowerCase?.());

      // const dateFilter = e?.attendanceRecords?.filter((e) => {
      //   return e?.date?.toLowerCase?.()?.includes?.(search?.toLowerCase?.());
      // });

      return firstNamefilter || lastNameFilter;
    });

    setFilterSearch(searchData);
  }, [search, attendance]);

  const deleteAttendanceHandler = (id, index) => {
    axios({
      method: "delete",
      url: `http://localhost:8000/attendance/admin/delete/${id}`,
    })
      .then(() => {
        // Remove the deleted item from the local state
        const updatedAttendance = [...attendance];
        updatedAttendance.splice(index, 1);
        setAttendance(updatedAttendance);

        toast({
          title: "Success",
          description: "Attendance Delete Successfully",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        toast({
          title: "Failed",
          description: "Attendance Delete Failed",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <div className="py-24 min-h-screen admin bg-[#EBF3FC] ms-52 globle">
        <Container>
          <div className="pt-[45px] pb-[32px] globle-breadcum">
            <h1 className="head">Attendence Data's</h1>
          </div>
          <div className="searchbar w-full flex justify-between globle-search">
            <div className="pos">
              <input
                className="input ps-3"
                type="text"
                value={search}
                placeholder="Search Here"
                onChange={(e) => setSearch(e?.target?.value)}
              />
              <GrSearch className="icon" />
            </div>
          </div>
          <TableContainer>
            <Table
              variant="striped"
              className="bg-white"
              colorScheme="messenger"
            >
              <Thead>
                <Tr>
                  <Th>Sr</Th>
                  <Th>Name</Th>
                  <Th>Date</Th>
                  <Th>Check In</Th>
                  <Th>Check Out</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {(search ? filterSearch : attendance)?.map((e, i) => {
                  return (
                    <Tr key={`${e?.userId?._id}-${i}`}>
                      <Td>{i + 1}</Td>
                      <Td className="capitalize font-semibold">
                        {e?.userId?.firstname} {e?.userId?.lastname}
                      </Td>
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
                                  <div key={i}>
                                    <div className="text-green-500 font-bold">
                                      {e}
                                    </div>
                                  </div>
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
                                  <div key={i}>
                                    <div className="text-red-500 font-bold">
                                      {e}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </Td>
                      <Td>
                        <Button
                          colorScheme="red"
                          onClick={() => deleteAttendanceHandler(e?._id, i)}
                        >
                          <RiDeleteBin6Line />
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    </>
  );
}

export default AdminAttendance;
