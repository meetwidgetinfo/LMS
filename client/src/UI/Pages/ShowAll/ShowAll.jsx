import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaves } from "../../../../Redux/Features/LeaveSlice/LeaveSlice";
import { Container } from "reactstrap";
import "./ShowAll.css";
import moment from "moment";
import { GrSearch } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

function ShowAll() {
  const dispatch = useDispatch();
  const { leaves } = useSelector((state) => state.leaveReducer);
  const [search, setSearch] = useState();
  const [filterleaves, setFilterLeaves] = useState([]);

  useEffect(() => {
    let leavesdata = leaves?.filter((e) => {
      const startDateMatches = moment(e.leavestart)
        .format("do-MMMM-YYYY")
        .toLowerCase()
        .includes(search?.toLowerCase?.());
      const endDateMatches = moment(e.leaveend)
        .format("do-MMMM-YYYY")
        .toLowerCase()
        .includes(search?.toLowerCase?.());
      const leaveTypeMatch = e?.leavetype
        ?.toLowerCase?.()
        ?.includes?.(search?.toLowerCase?.());
      const dateMatch = moment(e?.leavetime)
        .format("lll")
        .toLowerCase?.()
        ?.includes(search?.toLowerCase());
      const statusMatch = e?.status
        ?.toLowerCase?.()
        ?.includes?.(search?.toLowerCase?.());

      return (
        startDateMatches ||
        endDateMatches ||
        leaveTypeMatch ||
        dateMatch ||
        statusMatch
      );
    });
    setFilterLeaves(leavesdata);
  }, []);

  useEffect(() => {
    dispatch(fetchLeaves());
  }, []);

  return (
    <>
      <div className=" ms-56 py-24 bg-[#EBF3FC] min-h-screen leaves globle">
        <Container>
          <div className="pt-[45px] pb-[32px] globle-breadcum">
            <h1 className="head">All Leaves</h1>
          </div>
          <div>
            <div className="searchbar w-full flex justify-between globle-search">
              <div className="pos">
                <input
                  className="input ps-3"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setSearch(e?.target?.value)}
                />
                <GrSearch className="icon" />
              </div>

              <div>
                <NavLink to={"/apply"}>
                  <div className="head-btn m-0 cursor-pointer">Apply</div>
                </NavLink>
              </div>
            </div>
            <TableContainer>
              <Table
                hover
                variant="striped"
                colorScheme="messenger"
                className="bg-white"
              >
                <Thead>
                  <Tr>
                    <Th>Sr</Th>
                    <Th>Leave Type</Th>
                    <Th>Start Date</Th>
                    <Th>End Date</Th>
                    <Th>Leave Time</Th>
                    <Th>Leave Date</Th>
                    <Th>Reason</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {(search ? filterleaves : leaves)?.map((e, i) => {
                    return (
                      <Tr key={e._id}>
                        <Td scope="row">{i + 1}</Td>
                        <Td className="capitalize">{e.leavetype}</Td>
                        <Td>{moment(e.leavestart).format("do-MMMM-YYYY")}</Td>
                        <Td>{moment(e.leaveend).format("do-MMMM-YYYY")}</Td>
                        <Td>{e.leavetime || "Invalid Date"}</Td>
                        <Td>{moment(e.leaveDate).format("do-MMMM-YYYY")}</Td>
                        <Td className="font-medium">{e.reason}</Td>
                        <Td
                          className={`status-cell ${e?.status?.toLowerCase()} font-bold`}
                        >
                          {e.status}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </Container>
      </div>
    </>
  );
}

export default ShowAll;
