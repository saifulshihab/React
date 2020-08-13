import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    promotion: state.promotion,
    leader: state.leader,
    comments: state.comments,
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
  }
  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId),
              10
            )[0]
          }
          comments={this.props.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId),
            10
          )}
        />
      );
    };
    const HomePage = () => {
      return (
        <Home
          dishs={this.props.dishes.filter((dish) => dish.featured)[0]}
          promos={this.props.promotion.filter((promo) => promo.featured)[0]}
          leaders={this.props.leader.filter((leader) => leader.featured)[0]}
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route
            exact
            path="/aboutus"
            component={() => <About leaders={this.props.leader} />}
          />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
