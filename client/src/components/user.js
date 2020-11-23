import React, { useState, useEffect } from "react";
import { Table, Button, Form, FormControl } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css";   
import { toast } from "react-toastify";
import { userInstance } from "../config/axios";

function user() {
  const [items, setItems] = useState([]);
  const [username, setUserName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [dob, setDob] = useState("");

  useEffect(() => {
    async function fetchData() {
      const getData = await userInstance.get("/userList");
      setItems(getData.data);
    }
    fetchData();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      username: username,
      dob: dob,
    };
      let saveData = await userInstance.post("/register", payload);
      if (saveData) {
        toast.success("Data Saved", { containerId: "B" });
      } else {
        toast.error("Error...", { containerId: "B" });
      }
    setUserName("");
    setDob("");
    let getData = await userInstance.get("/getuser");
    setItems(getData.data);
  };

  const deleteItems = async (e) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            let deleteData = await userInstance.delete(`/:${e}`);
            if (deleteData) {
              toast.success("Data Deleted Successfully", {
                containerId: "B",
              });
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  };

  const updateItems = async (id) => {
    //const item = items.find((element) => element.user_id === id);
    const finddata =await userInstance.findById(id)
    setUserName(finddata.username)
    setDob(finddata.dob)
    const updateObjects = {
      username:username,
      dob:dob
    }
    const updationList = await userInstance.patch(`/${id}`,updateObjects)
  };

  const search = async (e) => {
  e.preventDefault()
  let searchData = await userInstance.get(`/search?search=${searchValue}`);
  setItems(searchData.data)
  };  



  return (
    <div className="user-list">
      <h1>Simple Crud Form</h1>

      <Form onSubmit={submit}>
        <Form.Group controlId="formBasicloginone">
          <Form.Label>User Name </Form.Label>
          <FormControl
            type="text"
            placeholder="User Name"
            name="cname"
            autoComplete="off"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Form.Group controlId="formBasicloginone">
          <Form.Label>User DOB </Form.Label>
          <FormControl
            type="date"
            placeholder="User DOB "
            name="cname"
            autoComplete="off"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Button type="submit" className="btn save-btn">
          Save
        </Button>
      </Form>

      <h1> Render Data</h1>
      <input type="text" onChange={(e) => setSearchValue(e.target.value)}/>
      <Button  onClick={search} >Search</Button>

      <Table className="crud-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {console.log(items)}
          {items.map((item, index) => (
            <tr key={item._id+index}>
              <td>{item.username}</td>
              <td>{item.dob}</td>
              <td>
                <Button onClick={(e) => updateItems(item._id)}>
                  Update
                </Button>
                <Button
                  className="btn del-btn"
                  onClick={(e) => deleteItems(item.user_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default user;
