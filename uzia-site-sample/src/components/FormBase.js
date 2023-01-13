import React from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_donop5o';
const TEMPLATE_ID = 'template_ahpgmfe';
const PUBLIC_KEY = 'F1LdMvCn6OaB4rwCG';

class FormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._formRef = React.createRef();
  }

  onChangeValue = (e) => {
    console.log({e})
    // const target = e.target;
  }

  onSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this._formRef.current, PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  render() {
    return (
      <Form ref={this._formRef} onSubmit={this.onSubmit}>
        <Form.Group className="mb-3">
          <FloatingLabel
            controlId="floatingInput"
            label="お名前"
            className="mb-3"
          >
            <Form.Control onChange={this.onChangeValue} name="name" type="name" placeholder="お名前" />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel
            controlId="floatingMail"
            label="Email"
            className="mb-3"
          >
            <Form.Control onChange={this.onChangeValue} name="email" type="email" placeholder="mail@example.com" />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingTextarea" label="お問い合わせ内容">
            <Form.Control
              as="textarea"
              type="value"
              name="message"
              onChange={this.onChangeValue} 
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