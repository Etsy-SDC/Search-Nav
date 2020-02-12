import React, { Component } from "react";

class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.mainRef = React.createRef();
  }

  render() {
    let { query, show, current, popular, onHoverSubmit } = this.props;
    if (!show) {
      return null;
    } else if (!query.length) {
      return (
        <ul className="navigation-searchBox navigation-ul">
          <p>Popular Right Now</p>
          {popular.map((x, i) => (
            <li
              onClick={onHoverSubmit.bind(null, event, x.listing_id, x.title)}
              key={i}
              className="navigation-li"
            >
              {x.title}
            </li>
          ))}
        </ul>
      );
    } else if (!current.length) {
      return (
        <ul className="navigation-searchBox navigation-ul">
          <li className="navigation-li">
            find shop names containing '{query}'
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navigation-searchBox navigation-ul">
          {current.map(x => (
            <li
              className="navigation-li"
              onClick={onHoverSubmit.bind(null, event, x.listing_id, x.title)}
            >
              {x.title}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default SearchModal;
