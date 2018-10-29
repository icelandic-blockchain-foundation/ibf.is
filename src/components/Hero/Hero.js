import React from "react";
import styles from "./Hero.module.scss";
import { H1 } from "../Typography";
import SectionLegend from "../SectionLegend";
import { Map } from "./Map";

const Hero = ({ children }) => (
  <div className={styles.root}>
    <SectionLegend number="01" text="Icelandic Blockchain Foundation" />
    <H1 className={styles.heading}>
      Our mission is to make Iceland <br /> the leader in{" "}
      <strong>blockchain</strong> <br />
      and <strong>cryptocurrency</strong> innovation <br /> and adoption.
      <br />
    </H1>
    {children}
    <Map />
  </div>
);

export default Hero;
