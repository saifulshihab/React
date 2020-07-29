import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish({dish}) {
  if (dish) {
    return (
      <div className="col-md-5 col-12 m-1">
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
function RenderComments({hasComment}) {
  if (hasComment != null) {
    return (
      <div className="col-md-5 col-12 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {hasComment.map((d) => {
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
      </div>
    );
  } else {
    return <div></div>;
  }
}
const DishDetail = (props) => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments hasComment={props.dish.comments} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
