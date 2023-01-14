import React from 'react';
import classnames from 'classnames';
import { Collapse, Card } from 'react-bootstrap';

export default function CardCollapse(props) {
  // console.log(props)
  return (
    <Collapse className={classnames(props.className, "card-collapse-container")} in={props.isOpen}>
      <div>
        <Card>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div className="card-body-content">
              <Card.Text className={classnames({
                "text-success": props.textColor === 'success',
                "text-danger": props.textColor === 'danger',
              })}
              >
                {props.message}
              </Card.Text>
            </div>
            {props.closeButton && (
              <div onClick={props.onClose}>
                <i className="fa-regular fa-circle-xmark"></i>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </Collapse>
  );
}