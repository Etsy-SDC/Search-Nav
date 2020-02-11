import React from "react";

function Box3(props) {
  const { data, footer } = props;
  const baseURL =
    "http://NavBuild-env.jc2sppyffu.us-east-1.elasticbeanstalk.com/";

  var box3 = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].main === true) {
      box3.push(
        <li className={"navigation-main navigation-li"} key={i}>
          {data[i].title}
        </li>
      );
    } else {
      box3.push(
        <li className={"sub navigation-li"} key={i}>
          {data[i].title}
        </li>
      );
    }
  }
  box3.push(
    <div className={"navigation-headerRow"} key={data.length}>
      <p className={"navigation-main"}>
        {footer}
        <span>
          <img src={`${baseURL}rightArrow.png`} />
        </span>
      </p>
    </div>
  );
  return (
    <div className={"navigation-box3"}>
      <ul className="navigation-ul">{box3}</ul>
    </div>
  );
}

export default Box3;
