import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { Button, Container, Table, Dropdown } from "react-bootstrap";
import AddDataPage from "../AddPage/AddDataPage";
import EditDataPage from "../EditPage/EditDataPage";
import axios from "axios";

function Homepage() {
  const [students, setStudents] = useState([]);
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api");
      setStudents(response.data);
      console.log(students);
    } catch (error) {
      console.error(error);
      alert("Error fetching students.");
    }
  };

  const handleEditShow = (student) => {
    setSelectedStudent(student);
    setEditShow(true);
  };
  const handleEditClose = () => setEditShow(false);

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`http://localhost:3001/api/${studentId}`);
      fetchStudents();
    } catch (error) {
      console.error(error);
      alert("Error deleting student.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <Button
          variant="dark"
          onClick={handleShow}
          className="mb-4"
          style={{ width: "10%", borderRadius: "0" }}
        >
          Add
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.subject}</td>
                <td>{student.marks}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="dark"
                      id="dropdown-basic"
                    ></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleEditShow(student)}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(student._id)}>
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <AddDataPage
          show={show}
          handleClose={handleClose}
          fetchStudents={fetchStudents}
        />
        <EditDataPage
          show={editShow}
          handleClose={handleEditClose}
          student={selectedStudent}
          fetchStudents={fetchStudents}
        />
      </Container>
    </div>
  );
}

export default Homepage;
