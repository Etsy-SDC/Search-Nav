import React, { Component } from "react";
import SearchModal from "./SearchModal";
import axios from "axios";
import DeleteQuery from "./DeleteQuery.js";
import CartCounter from "./CartCounter.js";

const baseURL =
  "http://localhost:3030/";

class Search extends Component {
  constructor(props) {
    super(props);
    this.mainRef = React.createRef();
    this.state = {
      array: [],
      current: [],
      currentHighlighted: "",
      popular: [],
      query: "",
      show: false,
      searchActive: false,
      listingId: ""
    };
    this.myRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener("itemChanged", event => {
      this.setState({ listingId: Number(event.detail.listingId) });
    });
    this.getSearchItems();
  }

  getSearchItems() {
    axios
      .get("/api/searchItems", {
        baseURL
      })
      .then(results => {
        this.setState({ array: results.data });
      })
      .then(results => {
        this.setState({ popular: this.getTopTenQueries(this.state.array) });
      })
      .catch(error => {
        console.error(error);
      });
  }

  onSubmit(event) {
    const compare = this.state.query;
    let id = 0;
    const array = this.state.array;
    for (let i = 0; i < this.state.array.length; i++) {
      if (compare.toLowerCase() === array[i].title.toLowerCase()) {
        id = array[i].listing_id;
        break;
      }
    }

    if (id !== 0) {
      this.setState({ show: false, searchActive: false });
      this.onListingId(event, id);
    } else {
      this.setState({ query: "", show: false, seachActive: false });
    }
  }

  onHoverSubmit(event, id, title) {
    this.setState({ query: title, show: false, searchActive: false }, () => {
      this.onListingId(event, id);
    });
  }

  onListingId(e, listingId) {
    const event = new CustomEvent("itemChanged", {
      detail: {
        listingId
      }
    });
    window.dispatchEvent(event);
  }

  getTopTenQueries(array) {
    let top = array.sort((a, b) => {
      if (a.views < b.views) {
        return -1;
      }
      if (a.views > b.views) {
        return 1;
      }
      return 0;
    });
    let result = [];
    for (let i = top.length - 10; i < top.length; i++) {
      result.push(top[i]);
    }
    return result;
  }

  onSearchChange() {
    if (this.state.query.length <= 75) {
      Promise.resolve(this.setState({ query: event.target.value })).then(x => {
        if (this.state.query.length) {
          let temp = [];
          for (let i = 0; i < this.state.array.length; i++) {
            let title = this.state.array[i].title;
            if (
              title.toLowerCase().startsWith(this.state.query.toLowerCase())
            ) {
              temp.push(this.state.array[i]);
            }
          }
          this.setState({ current: temp });
        }
      });
    } else if (event.target.value.length < this.state.query.length) {
      Promise.resolve(this.setState({ query: event.target.value })).then(x => {
        if (this.state.query.length) {
          let temp = [];
          for (let i = 0; i < this.state.array.length; i++) {
            let title = this.state.array[i].title;
            if (
              title.toLowerCase().startsWith(this.state.query.toLowerCase())
            ) {
              temp.push(this.state.array[i]);
            }
          }
          this.setState({ current: temp });
        }
      });
    }
  }

  toggleShow() {
    event.preventDefault();
    this.setState({ show: !this.state.show });
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ searchActive: true });
    if (this.state.show === false) {
      document.addEventListener("click", this.handleOutsideClick, false);
      this.setState({ show: true });
    } else if (
      this.state.show === true &&
      this.myRef.current.contains(e.target) === false
    ) {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
  }

  handleOutsideClick(e) {
    if (this.myRef.current.contains(e.target)) {
      return;
    }
    this.setState({ show: false, searchActive: false });
  }

  resetQuery() {
    this.setState({ query: "" });
  }

  render() {
    return (
      <header ref={this.myRef} className={"navigation-searchBarFull"}>
        <div className={"navigation-searchBarButton"}>
          <img
            className={"navigation-websiteLogo"}
            src={`${baseURL}sitelogo.png`}
          />
          <div className={"navigation-searchBoth"}>
            <div className="test">
              <input
                className={"navigation-searchBar"}
                type="text"
                value={this.state.query}
                placeholder="Search for items or shops"
                onChange={this.onSearchChange.bind(this)}
                onClick={this.handleClick.bind(this)}
              />
              <DeleteQuery
                query={this.state.query}
                resetQuery={this.resetQuery.bind(this)}
              />
              <input
                type="image"
                className={
                  this.state.searchActive
                    ? "navigation-searchActive"
                    : "navigation-searchButton"
                }
                src={
                  this.state.searchActive
                    ? `${baseURL}whitemg.png`
                    : `${baseURL}mg.png`
                }
                onClick={this.onSubmit.bind(this, event)}
              ></input>
            </div>
            <SearchModal
              show={this.state.show}
              query={this.state.query}
              current={this.state.current}
              popular={this.state.popular}
              onHoverSubmit={this.onHoverSubmit.bind(this)}
            />
          </div>
          <h4 className={"navigation-signIn"}>Sign in</h4>
          <div className="navigation-fullCart">
            <input
              type="image"
              src={`${baseURL}broom.png`}
              className={"navigation-cart"}
            />
            <CartCounter />
          </div>
        </div>
      </header>
    );
  }
}

export default Search;
