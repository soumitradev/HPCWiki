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
    <header
      className={clsx("hero hero--primary home__image", styles.heroBanner)}
    >
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
          content="Sharanga is the high performance computing cluster at the BITS Pilani - Hyderabad Campus. It provides computational resources to cater the needs of faculty and research students in several areas of engineering and science. The major research areas that would be making extensive use of Sharanga's computational resources are in the field of biology, chemistry, pharmaceutics, data sciences, machine learning, micromagnetics, and fluid and structural dynamics."
        />
        <Highlight
          title=""
          content="It is a heterogeneous system consisting of AMD EPYC processors and NVIDIA's Data Center GPUs supporting CPU and GPU parallel computations. There are 25 compute nodes and 4 accelerator nodes with a total computing power of 220 Teraflops. All the nodes in the cluster are connected with an InfiniBand fabric supporting high bandwidth and very low latency. A common parallel file system, Lustre is mounted across the cluster providing around 4 GB/s of read and 2.5 GB/s of write throughput. The total useable storage space is 264 TiB while the archival storage space is 22 TiB."
        />
        <Highlight
          title=""
          content="Access to the cluster is granted to all the faculty of the institute. Students who wish to use the facilty may contact their faculty advisors. Users can login to Sharanga using a valid account by connecting to any of the login nodes (hpc01.hpc.bits-hyderabad.ac.in, hpc02.hpc.bits-hyderabad.ac.in) or login.hpc.bits-hyderabad.ac.in."
        />
        <Highlight title="" content="" />
      </main>
    </Layout>
  );
}
