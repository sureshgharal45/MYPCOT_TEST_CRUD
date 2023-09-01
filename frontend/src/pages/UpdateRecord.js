import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Select from "react-select";
import Spiner from "../components/spinner/Spiner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Form";
import {
  clearErrors,
  getRecordDetails,
  updateRecord,
} from "../actions/userAction";
import { UPDATE_USER_RESET } from "../constants/userConstants";

const UpdateRecord = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singlerecord, error } = useSelector((state) => state.singlerecord);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.updaterecord
  );
  const [name, setName] = useState("");
  const [toggleActive, setToggleActive] = useState();
  const [showSpinner, setShowSpinner] = useState(true);
  const [description, setDescription] = useState("");
  const [category, setCategories] = useState("");
  const [status, setStatus] = useState();

  const options = [
    { value: "Office", label: "Office" },
    { value: "Remote", label: "Remote" },
    { value: "Hybrid", label: "Hybrid" },
  ];

  const setCategoriesValue = (e) => {
    setStatus(e.value);
  };

  const handleStatus = (e) => {
    setToggleActive(e.target.checked);
  };

  const submitUserData = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("categories", category);
    myForm.set("status", toggleActive);

    dispatch(updateRecord(id, myForm));
  };

  useEffect(() => {
    if (singlerecord && singlerecord._id !== id) {
      dispatch(getRecordDetails(id));
    } else {
      setName(singlerecord.name);
      setDescription(singlerecord.description);
      setCategories(singlerecord.categories);
      setStatus(singlerecord.status);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully");
      navigate("/users");
      dispatch({ type: UPDATE_USER_RESET });
    }

    setTimeout(() => {
      setShowSpinner(false);
    }, 1200);
  }, [
    dispatch,
    error,
    id,
    singlerecord,
    isUpdated,
    updateError,
    alert,
    navigate,
  ]);

  return (
    <>
      {showSpinner ? (
        <Spiner />
      ) : (
        <div className="container mt-3 shadow_card">
          <h2 className="text-center mt-1">Update a Record</h2>
          <Card className="mt-3 p-3 w-50">
            <Form className="form_class">
              <Row>
                <Form.Group
                  className="mb-3 col-lg-7"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    style={{ width: "170%" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter FirstName"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    placeholder="Add the description"
                    style={{ height: "100px", width: "200%" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-8"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Your Category</Form.Label>
                  <Select
                    options={options}
                    name="categories"
                    defaultInputValue={category}
                    onChange={setCategoriesValue}
                  />
                </Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Group className="m-1 d-flex align-items-center">
                  <Form.Label>InActive</Form.Label>
                  <label class="toggle">
                    <input
                      type="checkbox"
                      class="toggle-checkbox"
                      defaultChecked={status}
                      name="status"
                      onChange={handleStatus}
                    />
                    <span class="toggle-slider"></span>
                  </label>
                  <Form.Label>Active</Form.Label>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={submitUserData}
                >
                  Update
                </Button>
              </Row>
            </Form>
          </Card>
        </div>
      )}
    </>
  );
};

export default UpdateRecord;
