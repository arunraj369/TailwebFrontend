import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const EditDataPage = ({ show, handleClose, student, fetchStudents }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");

  useEffect(() => {
    if (student) {
      setName(student.name);
      setSubject(student.subject);
      setMarks(student.marks);
    }
  }, [student]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/${student._id}`, {
        name,
        subject,
        marks,
      });
      fetchStudents();
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Error updating student.");
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Marks</Form.Label>
              <Form.Control
                type="number"
                value={marks}
                onChange={(e) => setMarks(Number(e.target.value))}
                required
              />
            </Form.Group>
            <Button
              variant="dark"
              type="submit"
              style={{ borderRadius: "0", marginTop: "5%" }}
            >
              Update Student
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditDataPage;
