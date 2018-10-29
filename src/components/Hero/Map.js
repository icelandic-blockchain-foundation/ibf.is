import React from "react";
import world from "../../images/world.png";
import styles from "./Map.module.scss";

export const Map = ({}) => (
  <svg
    xmlns="http://wwww.w3.org/2000/svg"
    viewBox="0 0 1589.6 1150.8"
    className={styles.root}
  >
    <image xlinkHref={world} x="0" y="0" opacity="0.4"/>
    <g id="location" fill="#f61740">
      <circle cx="867.6" cy="299.2" r="43.6" opacity=".6">
        <animate
          attributeType="XML"
          attributeName="r"
          values="30;40;30"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        className={styles.location}
        cx="867.6"
        cy="299.2"
        r="12"
        stroke="#fff"
        stroke-miterlimit="10"
        stroke-width="3.5"
      />
    </g>
  </svg>
);
