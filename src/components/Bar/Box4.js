import React from "react";

class Box4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      baseURL: "http://NavBuild-env.jc2sppyffu.us-east-1.elasticbeanstalk.com/"
    };
  }

  render() {
    const { baseURL, hover } = this.state;
    const props = this.props;
    if (props.data === "fb.jpg") {
      return (
        <div className={"navigation-box4"}>
          <figure
            className={"navigation-modalFigure"}
            onMouseEnter={() => {
              this.setState({ hover: true });
            }}
            onMouseLeave={() => {
              this.setState({ hover: false });
            }}
          >
            <img
              src={
                hover ? `${baseURL}invisible.jpg` : `${baseURL}${props.data}`
              }
              className={"navigation-modalImage"}
            />
            <figcaption>
              Professor's Picks <br />
              <span className={"navigation-profPick"}>{props.caption}</span>
            </figcaption>
          </figure>
        </div>
      );
    } else {
      return (
        <div className={"navigation-box4"}>
          <figure className={"navigation-modalFigure"}>
            <img
              src={`${baseURL}${props.data}`}
              className={"navigation-modalImage"}
            />
            <figcaption>
              Professor's Picks <br />
              <span className={"navigation-profPick"}>{props.caption}</span>
            </figcaption>
          </figure>
        </div>
      );
    }
  }
}

export default Box4;
