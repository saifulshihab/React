import React, { Component } from 'react';
import { Media } from 'reactstrap';

class Menu extends Component {
  constructor(props) {
    super();
    this.state = {
      dishes: [
        {
          id: 0,
          name: 'Pizza',
          image: 'assets/images/uthappizza.png',
          catagory: 'mains',
          label: 'Hot',
          price: '4.99',
          description: 'A unique combination of Indian best food service.',
        },
        {
          id: 1,
          name: 'Vadonut',
          image: 'assets/images/vadonut.png',
          catagory: 'appetizer',
          label: 'New',
          price: '1.99',
          description:
            'A unique combination of Indian best food service. A unique combination of Indian best food. A unique combination of Indian best food.',
        },
        {
          id: 3,
          name: 'ElasaCheese Cake',
          image: 'assets/images/elaicheesecake.png',
          catagory: 'dessert',
          label: '',
          price: '2.99',
          description: 'A unique combination of Indian best food service.',
        },
        {
          id: 3,
          name: 'Pizza',
          image: 'assets/images/uthappizza.png',
          catagory: 'mains',
          label: 'Hot',
          price: '4.99',
          description: 'A unique combination of Indian best food service.',
        },
      ],
    };
  }
  render() {
    const menu = this.state.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 mt-5">
          <Media tag="li">
            <Media left middle>
              <Media src={dish.image} alt={dish.name} />
            </Media>
            <Media body className="ml-5">
              <Media heading>{dish.name}</Media>
              <p>{dish.description}</p>
            </Media>
          </Media>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">
          <Media list>{menu}</Media>
        </div>
      </div>
    );
  }
}

export default Menu;
