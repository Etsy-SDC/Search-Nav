import React from "react";

function Box1(props) {
  const baseURL =
    "http://NavBuild-env.jc2sppyffu.us-east-1.elasticbeanstalk.com/";
  const { data, onRowHover } = props;
  let array = [];
  for (let i = 0; i < data.categories.length; i++) {
    array.push(
      <tr onMouseEnter={onRowHover.bind(null, i)} key={i}>
        <td>{data.categories[i].title}</td>
        <td>
          <img src={`${baseURL}greaterThan.png`} />
        </td>
      </tr>
    );
  }
  if (data.footer !== undefined) {
    return (
      <div className={"navigation-box1"}>
        <div className={"navigation-headerRow"}>
          <h4>
            {data.header}
            <span>
              <img src={`${baseURL}rightArrow.png`} />
            </span>
          </h4>
        </div>
        <table className={"navigation-tableNav"}>
          <tbody>{array}</tbody>
        </table>
        <div className={"navigation-headerRow"}>
          <h4>
            {data.footer}
            <span>
              <img src={`${baseURL}rightArrow.png`} />
            </span>
          </h4>
        </div>
      </div>
    );
  } else {
    return (
      <div className={"navigation-box1"}>
        <div className={"navigation-headerRow"}>
          <h4>
            {data.header}
            <span>
              <img src={`${baseURL}rightArrow.png`} />
            </span>
          </h4>
        </div>
        <table className={"navigation-tableNav"}>
          <tbody>{array}</tbody>
        </table>
      </div>
    );
  }
}

export default Box1;
