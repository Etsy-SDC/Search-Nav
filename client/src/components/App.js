import React, { Component } from "react";
import Search from "./Search/Search";
import Bar from "./Bar/Bar";

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Search />
        <Bar />
      </div>
    );
  }
}
