import React from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_donop5o';
const TEMPLATE_ID = 'template_ahpgmfe';
const PUBLIC_KEY = 'F1LdMvCn6OaB4rwCG';

class FormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: {
        name: 'お名前',
        email: 'メールアドレス',
        subject: '件名',
        message: 'お問い合わせ内容',
        submit: '送信'
      }
    };
    this._formRef = React.createRef();
  }

  onChangeValue = (e) => {
    console.log({ e })
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
    const { label } = this.state;
    return (
      <Form ref={this._formRef} onSubmit={this.onSubmit}>
        <Form.Group className="mb-3">
          <FloatingLabel
            controlId="floatingInput"
            label={label.name}
            className="mb-3"
          >
            <Form.Control
              required
              onChange={this.onChangeValue}
              name="name"
              type="text"
              placeholder={label.name}
            />
            <Form.Control.Feedback type="invalid">{label.name}は必須項目です。</Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel
            controlId="floatingMail"
            label={label.email}
            className="mb-3"
          >
            <Form.Control
              required
              onChange={this.onChangeValue}
              name="email"
              type="email"
              placeholder="mail@example.com"
            />
            <Form.Control.Feedback type="invalid">{label.email}は必須項目です。</Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel
            controlId="floatingInput"
            label={label.subject}
            className="mb-3"
          >
            <Form.Control
              required
              onChange={this.onChangeValue}
              name="subject"
              type="text"
              placeholder="件名を入力してください。"
            />
            <Form.Control.Feedback type="invalid">{label.subject}は必須項目です。</Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel
            controlId="floatingTextarea"
            label={label.message}
          >
            <Form.Control
              required
              as="textarea"
              type="text"
              name="message"
              onChange={this.onChangeValue}
              placeholder="お問い合わせ内容を入力してください。"
              style={{ height: '100px' }}
            />
            <Form.Control.Feedback type="invalid">{label.message}は必須項目です。</Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <div className="d-grid gap-2">
            <Button type="submit" size="lg">{label.submit}</Button>
          </div>
        </Form.Group>
      </Form>
    )
  }
}

export default FormBase;