import React from 'react';
import { Form, Button, FloatingLabel, Collapse, Card } from 'react-bootstrap';
import { CardCollapse } from '../components';
import emailjs from '@emailjs/browser';
import _set from 'lodash/set';

const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;

class FormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: {
        name: 'お名前',
        email: 'メールアドレス',
        subject: '件名',
        message: 'お問い合わせ内容',
        submit: '送信',
        submitting: '送信中...'
      },
      value: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      submitSuccess: false,
      submitFaild: false,
      successColapseOpen: false,
      faildColapseOpen: false,
      loading: false
    };
    this._formRef = React.createRef();
  }

  onChangeValue = (e) => {
    const value = this.state.value;
    const target = e.target;
    const targetName = target.name;
    const newValue = target.value;
    _set(value, targetName, newValue);
    this.setState({ value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this._formRef.current, PUBLIC_KEY)
      .then((result) => {
        console.log({ result });
        if (result.status === 200) {
          this.setState({
            submitSuccess: true,
            value: {
              name: '',
              email: '',
              subject: '',
              message: ''
            }
          });
        } else {
          this.setState({ submitFaild: true });
        }
      }).catch((e) => {
        console.log(e);
        this.setState({ submitFaild: true });
      }).finally(() => {
        // 送信可否のtipsを出すためにフラグが切り替わるまで待機する
        setTimeout(() => {
          this.openCollapse();
        }, 1000);
      });
  }

  openCollapse = (e) => {
    if (this.state.submitSuccess && !this.state.successColapseOpen) {
      this.setState({
        loading: false,
        successColapseOpen: true,
        faildColapseOpen: false
      });
    } else if (this.state.submitFaild && !this.state.faildColapseOpen) {
      this.setState({
        loading: false,
        successColapseOpen: false,
        faildColapseOpen: true
      });
    }
  }

  closeCollapse = (e, key) => {
    console.log("closeCollapse: ", e, key)

    switch (key) {
      case 'success':
        this.setState({
          successColapseOpen: false
        });
        break;
      case 'faild':
        this.setState({
          faildColapseOpen: false
        });
        break;
    }
  }

  render() {
    const { label, value, successColapseOpen, faildColapseOpen, loading } = this.state;
    return (
      <React.Fragment>
        {/* <CardCollapse className="mb-3" message="送信しました！" isOpen={successColapseOpen} closeButton={true}/> */}
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
                value={value.name}
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
                value={value.email}
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
                value={value.subject}
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
                value={value.message}
              />
              <Form.Control.Feedback type="invalid">{label.message}は必須項目です。</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <CardCollapse
            key="success"
            className="mb-3"
            message="送信しました！"
            isOpen={successColapseOpen}
            closeButton={true}
            textColor={"success"}
            onClose={(e) => this.closeCollapse(e, "success")}
          />
          <CardCollapse
            key="danger"
            className="mb-3"
            message="送信に失敗しました。時間を置いてから再度お試しください。"
            isOpen={faildColapseOpen}
            closeButton={true}
            textColor={"danger"}
            onClose={(e) => this.closeCollapse(e, "faild")}
          />

          <Form.Group className="mb-3">
            <div className="d-grid gap-2">
              <Button
                type="submit"
                size="lg"
                disabled={loading}
              >
                {loading ? label.submitting : label.submit}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </React.Fragment>
    )
  }
}

export default FormBase;