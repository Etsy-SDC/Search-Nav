import React from "react";

class CartCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartCount: 0
    };
  }

  componentDidMount() {
    window.addEventListener("cartCount", event => {
      this.setState({ cartCount: event.detail.cartCount });
    });
  }

  render() {
    if (this.state.cartCount > 0) {
      return (
        <div className="navigation-cartCounter">{this.state.cartCount}</div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default CartCounter;
