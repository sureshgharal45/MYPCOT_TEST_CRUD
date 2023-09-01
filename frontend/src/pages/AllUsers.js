import React, { useEffect, useState } from "react";
import "./AllUsers.css";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Tables from "../components/Tables/Tables";
import Spiner from "../components/spinner/Spiner";
import { clearErrors, getAllRecords } from "../actions/userAction";
import { useAlert } from "react-alert";

const AllUsers = () => {
  const [showSpinnner, setShowSpinner] = useState(true);
  const [status, setStatus] = useState(true);
  const { error, allrecords } = useSelector((state) => state.allrecords);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    setTimeout(() => {
      setShowSpinner(false);
    }, 1200);

    dispatch(getAllRecords(search, status));

  }, [dispatch, error, search, status]);

  return (
    <>
      <div className="container">
        <div className="main_div">
          {/* search add btn */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="success" className="search_btn">
                  Search
                </Button>
              </Form>
            </div>
            {/* add user btn */}
            <div className="add_btn">
              <Link to="/create">
                <Button variant="success" className="search_btn">
                  <i class="fa-solid fa-plus"></i>&nbsp; Add User
                </Button>
              </Link>
            </div>
          </div>
          {/* filter */}
          <div className="filter_div mt-5 d-flex justify-content-center flex-wrap">
            <div className="filter_status">
              <div className="status">
                <h3 style={{}}>Filter By Status</h3>
                {status === true ? <span>Records being fetched Active by default</span> : ""}
                <div className="status_radio d-flex justify-content-around flex-wrap">
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={true}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={false}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showSpinnner ? <Spiner /> : <Tables allrecords={allrecords}/>}
      </div>
    </>
  );
};

export default AllUsers;
