import React from 'react'
import {Link} from 'react-router'
import text from '../lib/text'
import config from '../lib/config'

import Cart from './cart'
import CartIndicator from './cartIndicator'

const HeadMenuItems = ({ categories, onClick, className}) => {
  let items = categories.filter(category => category.parent_id === null).map((category, index) => (
    <Link className="nav-item" activeClassName="is-active" key={index} to={category.path} onClick={onClick}>
      {category.name}
    </Link>
  ));

  return (
    <div className={className}>
      {items}
    </div>
  )
}

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMenuIsActive: false,
      cartIsActive: false
    }
  }

  menuToggle = () => this.setState({
    mobileMenuIsActive: !this.state.mobileMenuIsActive,
    cartIsActive: false
  });
  menuClose = () => this.setState({mobileMenuIsActive: false});

  cartToggle = () => this.setState({
    cartIsActive: !this.state.cartIsActive,
    mobileMenuIsActive: false
  });

  render() {
    const {categories, cart, settings} = this.props.state;
    const classMenu = this.state.mobileMenuIsActive ? 'nav-center nav-menu is-active' : 'nav-center nav-menu is-hidden-mobile';
    const classToggle = this.state.mobileMenuIsActive ? 'nav-toggle is-active' : 'nav-toggle';

    return (
      <nav className="nav has-shadow" style={{ zIndex: 100 }}>
        <div className="container">
          <span className={classToggle} onClick={this.menuToggle}>
            <span/>
            <span/>
            <span/>
          </span>
          <div className="nav-left">
            <Link className="nav-item" to="/">
              <img src={settings.logo}/>
            </Link>
          </div>

          <HeadMenuItems categories={categories} onClick={this.menuClose} className={classMenu} />

          <div className="nav-right is-flex-mobile">
            <Link className="nav-item" to="/search">
              <span className="icon">
                <img src="/assets/images/search.svg" alt={text.search} title={text.search}/>
              </span>
            </Link>
            <span className="nav-item" onClick={this.cartToggle} style={{ cursor: 'pointer' }}>
              <span className="icon">
                <img src="/assets/images/shopping-bag.svg" alt={text.cart} title={text.cart}/>
              </span>
              <CartIndicator cart={cart} />
            </span>
            <Cart cart={cart} deleteCartItem={this.props.deleteCartItem} active={this.state.cartIsActive} settings={settings} cartToggle={this.cartToggle} />
          </div>
        </div>
      </nav>
    )
  }
}
