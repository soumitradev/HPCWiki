import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Highlight from "@site/src/components/Highlight";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary home__image", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <Highlight
          title=""
          content="Sharanga is the high performance computing cluster at the BITS Pilani - Hyderabad Campus. This facility is meant for research purposes. It is a heterogeneous system consisting of 22 compute nodes and 4 accelerator nodes, supporting CPU and GPU parallel computations. The total computing power in terms of Rpeak is around 200 Teraflops."
        />
        <Highlight
          title=""
          content=""
        />
      </main>
    </Layout>
  );
}
