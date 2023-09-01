import React, { useEffect, useState } from "react";
import "./CreateRecord.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Spiner from "../components/spinner/Spiner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useAlert } from "react-alert";
import { clearErrors, createRecord } from "../actions/userAction";
import { CREATE_RECORD_RESET } from "../constants/userConstants";

const CreateRecord = () => {
  const [showSpinner, setShowSpinner] = useState(true);
  const [categories, setCategories] = useState();
  const [toggleActive, setToggleActive] = useState();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, success } = useSelector((state) => state.record);
  const navigate = useNavigate();
  const [inputdata, setInputData] = useState({
    name: "",
    description: "",
  });

  const options = [
    { value: "Office", label: "Office" },
    { value: "Remote", label: "Remote" },
    { value: "Hybrid", label: "Hybrid" },
  ];

  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };

  const handleStatus = (e) => {
    setToggleActive(e.target.checked);
  };

  const submitUserData = (e) => {
    e.preventDefault();

    const { name, description } = inputdata;

    if (name === "") {
      alert.error("Name is Required!");
    } else if (description === "") {
      alert.error("description is Required!");
    } else if (categories === "") {
      alert.error("categories is Required!");
    } else if (toggleActive === "") {
      alert.error("Please select the status of user!");
    } else {
      alert.success("Record created successfully");
    }

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("categories", categories);
    myForm.set("status", toggleActive);

    dispatch(createRecord(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      setInputData({
        ...inputdata,
        name: "",
        description: "",
      });
      setToggleActive();
      setCategories();
      navigate("/users");
    }

    setTimeout(() => {
      setShowSpinner(false);
    }, 1200);

    dispatch({ type: CREATE_RECORD_RESET });
  }, [dispatch, alert, error, success, navigate]);

  return (
    <>
      {showSpinner ? (
        <Spiner />
      ) : (
        <div className="container mt-3 shadow_card">
          <h2 className="text-center mt-1">Create a Record</h2>
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
                    value={inputdata.name}
                    onChange={setInputValue}
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
                    value={inputdata.description}
                    onChange={setInputValue}
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
                    onChange={(e) => setCategories(e.value)}
                  />
                </Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Group className="m-1 d-flex align-items-center">
                  <Form.Label>InActive</Form.Label>
                  <label class="toggle">
                    <input
                      type="checkbox"
                      class="toggle-checkbox"
                      value={true}
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
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>
        </div>
      )}
    </>
  );
};

export default CreateRecord;
