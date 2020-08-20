import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Label,
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

import { Link } from 'react-router-dom';

function RenderDish({ dish }) {
  if (dish) {
    return (
      <div>
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
}
function RenderComments({ comments, addComment, dishId }) {
  if (comments != null) {
    return (
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {comments.map((d) => {
            return (
              <li key={d.id}>
                <p>{d.comment}</p>
                <p>
                  -- {d.author}, &nbsp;
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                  }).format(new Date(d.date))}
                </p>
              </li>
            );
          })}
        </ul>
        <CommentForm addComment={addComment} dishId={dishId} />
      </div>
    );
  } else {
    return <div></div>;
  }
}
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
  }
  render() {
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length >= len;
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <i class="fa fa-pencil" aria-hidden="true"></i> Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <div className="row ml-1 mr-1">
              <div className="col">
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                  <Row className="form-group">
                    <Label htmlFor="rating">Give rating out of 5</Label>

                    <Control.select
                      className="form-control"
                      validators={{ required: required }}
                      model=".rating"
                      name="rating"
                      id="rating"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                    <Errors
                      className="text-danger"
                      model=".rating"
                      show="touched"
                      messages={{ required: 'Required!. ' }}
                    />
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="name">Your Name</Label>
                    <Control.text
                      className="form-control"
                      name="author"
                      validators={{
                        required: required,
                        minLength: minLength(3),
                        maxLength: maxLength(15),
                      }}
                      model=".name"
                      row={6}
                      id="name"
                    />
                    <Errors
                      className="text-danger"
                      model=".name"
                      show="touched"
                      messages={{
                        required: 'Required! ',
                        minLength: 'Name should be at least 3 charecters',
                        maxLength: 'Name should be less then 15 charecters',
                      }}
                    />
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="comment">Comment</Label>
                    <Control.textarea
                      className="form-control"
                      model=".comment"
                      name="comment"
                      id="comment"
                    />
                  </Row>
                  <Button type="submit" value="submit" color="primary">
                    Submit
                  </Button>
                </LocalForm>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const DishDetail = (props) => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments
              comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
