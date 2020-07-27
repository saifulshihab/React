import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }
  renderDish(dish) {
    if (dish) {
      return (
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    } else {
      return <div></div>;
    }
  }
  renderComments(hasComment) {
    const dishComment = hasComment.map((d) => {
      return (
        <li className="mb-2">
        <p>{d.comment}
          <br />
          -- {d.author}, &nbsp;
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
          }).format(new Date(d.date))}
          </p>
        </li>
      );
    });
    return <ul className="list-unstyled">{dishComment}</ul>;
  }
  render() {
    if (this.props.dishSelect) {
      return (
        <div className="row">
          <div className="col-md-5 m-1">
            {this.renderDish(this.props.dishSelect)}
          </div>
          <div className="col-md-5 m-1">
            <h4>Comments</h4>
            {this.renderComments(this.props.dishSelect.comments)}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default DishDetail;
