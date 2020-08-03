import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import DishDetail from './DishdetailComponent';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import About from './AboutComponent';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      promotion: PROMOTIONS,
      leader: LEADERS,
      comments: COMMENTS
    };
  }
  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId),10)[0]} 
        comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId),10)}
        />        
      );
    }
    const HomePage = () => {
      return( 
      <Home
      dishs={this.state.dishes.filter((dish) => dish.featured)[0]}
      promos={this.state.promotion.filter((promo) => promo.featured)[0]}
      leaders={this.state.leader.filter((leader) => leader.featured)[0]}
      />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />}/>
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/aboutus" component={() => <About leaders={this.state.leader} />} />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
