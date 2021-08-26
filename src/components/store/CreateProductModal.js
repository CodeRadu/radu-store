import React from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";

function CreateProductModal({
  createProductModal,
  closeCreateProductModal,
  setProductName,
  setProductDescription,
  setProductPrice,
  handleCreateProduct,
}) {
  return (
    <Modal show={createProductModal} onHide={closeCreateProductModal}>
      <Modal.Header>
        <Modal.Title>Create product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup style={{ padding: "10px" }}>
          <InputGroup.Prepend>
            <Form.Control
              placeholder="Name"
              onChange={(e) => setProductName(e.target.value)}
            />
          </InputGroup.Prepend>
        </InputGroup>
        <InputGroup style={{ padding: "10px" }}>
          <InputGroup.Prepend>
            <Form.Control
              placeholder="Description"
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </InputGroup.Prepend>
        </InputGroup>
        <InputGroup style={{ padding: "10px" }}>
          <InputGroup.Prepend>
            <Form.Control
              placeholder="Price in $"
              type="number"
              step="0.01"
              min="0"
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </InputGroup.Prepend>
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeCreateProductModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateProduct}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateProductModal;
