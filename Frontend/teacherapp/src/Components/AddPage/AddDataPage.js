import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const AddDataPage = ({ show, handleClose, fetchStudents }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api", {
        name,
        subject,
        marks,
      });
      if (response.data.updated) {
        alert("Student marks updated.");
        setName("");
        setSubject("");
        setMarks("");
      } else {
        alert("New student added.");
        setName("");
        setSubject("");
        setMarks("");
      }
      fetchStudents();
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Error adding/updating student.");
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Student</Modal.Title>
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
              style={{
                width: "40%",
                borderRadius: "0",
                justifyContent: "center",
              }}
            >
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddDataPage;
