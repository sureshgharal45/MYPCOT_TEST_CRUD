import React, { useEffect } from "react";
import "./Table.css";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { NavLink } from "react-router-dom";
import {
  clearErrors,
  deleteRecord,
  getAllRecords,
} from "../../actions/userAction";
import { DELETE_RECORD_RESET } from "../../constants/userConstants";

const Tables = ({ allrecords }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error } = useSelector((state) => state.allrecords);
  const {
    error:deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.deleterecord);

  const deleteRecordHandle = (id) => {
    dispatch(deleteRecord(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      dispatch({ type: DELETE_RECORD_RESET });
    }

    dispatch(getAllRecords());
  }, [dispatch, alert, isDeleted, error, deleteError,message]);

  return (
    <>
      <div className="container">
        <Row>
          <div className="col-mt-0">
            <Card className="shadow">
              <Table className="align-align-items-center" responsive="sm">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allrecords &&
                    allrecords.map((record) => {
                      return (
                        <>
                          <tr key={record._id}>
                            <td>{record.name}</td>
                            <td>{record.description}</td>
                            <td>{record.categories}</td>
                            <td className="d-flex align-items-center">
                              <Dropdown className="text-center">
                                <Dropdown.Toggle
                                  className="dropdown_btn"
                                  id="dropdown-basic"
                                >
                                  <Badge
                                    bg={
                                      record.status === true
                                        ? "primary"
                                        : "danger"
                                    }
                                  >
                                    {record.status === true
                                      ? "Active"
                                      : "InActive"}
                                  </Badge>
                                </Dropdown.Toggle>
                              </Dropdown>
                            </td>
                            <td>
                              <NavLink to={`/update/${record._id}`}>
                                <Button
                                  variant="success"
                                  className="search_btn mx-2"
                                >
                                  Edit
                                </Button>
                              </NavLink>
                              <NavLink>
                                <Button
                                  variant="danger"
                                  onClick={() => deleteRecordHandle(record._id)}
                                >
                                  Delete
                                </Button>
                              </NavLink>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </div>
    </>
  );
};

export default Tables;
