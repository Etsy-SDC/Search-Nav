import React, { Component } from "react";
import HoverModal from "./HoverModal";
import NavBar from "./NavBar";
import BarData from "./BarData";

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: null,
      generate: BarData,
      insideHoverModal: false,
      insideNavBar: false,
      selected: 0
    };
  }

  onRowHover(i) {
    this.setState({ selected: i });
  }

  onSelect(i) {
    this.setState({ currentTab: this.state.generate[i] });
  }

  onOutsideHoverModal() {
    this.setState({ insideHoverModal: false, selected: 0 }, () => {
      if (!this.state.insideNavBar) {
        this.setState({ currentTab: null });
      }
    });
  }

  onOutsideNavBar(e) {
    this.setState({ insideNavBar: false, selected: 0 }, () => {
      if (!this.state.insideHoverModal) {
        this.setState({ currentTab: null });
      }
    });
  }

  onInsideHoverModal() {
    this.setState({ insideHoverModal: true });
  }

  onInsideNavBar() {
    this.setState({ insideNavBar: true });
  }

  render() {
    if (this.state.currentTab === null) {
      return (
        <div>
          <NavBar
            onSelect={this.onSelect.bind(this)}
            onOutsideNavBar={this.onOutsideNavBar.bind(this)}
            onInsideNavBar={this.onInsideNavBar.bind(this)}
          />
        </div>
      );
    } else {
      return (
        <div>
          <NavBar
            onSelect={this.onSelect.bind(this)}
            onOutsideNavBar={this.onOutsideNavBar.bind(this)}
            onInsideNavBar={this.onInsideNavBar.bind(this)}
          />

          <HoverModal
            onRowHover={this.onRowHover.bind(this)}
            data={this.state.currentTab}
            onOutsideHoverModal={this.onOutsideHoverModal.bind(this)}
            onInsideHoverModal={this.onInsideHoverModal.bind(this)}
            selected={this.state.selected}
          />
        </div>
      );
    }
  }
}

export default Bar;
