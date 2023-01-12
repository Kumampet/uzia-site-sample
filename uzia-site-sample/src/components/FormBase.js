import React from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

class FormBase extends React.Component {
  render() {
    return (
      <Form>
        <Form.Group className="mb-3">
          <FloatingLabel
            controlId="floatingInput"
            label="お名前"
            className="mb-3"
          >
            <Form.Control type="name" placeholder="お名前" />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel
            controlId="floatingMail"
            label="Email"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="mail@example.com" />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingTextarea" label="お問い合わせ内容">
            <Form.Control
              as="textarea"
              type="value"
              placeholder="お問い合わせ内容"
              style={{ height: '100px' }}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <div className="d-grid gap-2">
            <Button type="submit" size="lg">送信</Button>
          </div>
        </Form.Group>
      </Form>
    )
  }
}

export default FormBase;