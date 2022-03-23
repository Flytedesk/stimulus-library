import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [

  {
    title: "Vanilla",
    description: (
      <>
        Nobody likes bloat, so wherever possible Stimulus-Library ships with zero third party dependencies. You won't find controllers here that simply wrap up other JS libraries like date-pickers. There are other libraries if that's what you want.
        <br/>
        <br/>
        Stimulus-Library is just simple, vanilla controllers that do one simple thing.
      </>
    ),
  },
  {
    title: "Configurable",
    description: (
      <>
        While Stimulus Library sets sensible defaults for all controllers, not all use-cases are the same. All of our controllers are built to to be as flexible and configurable as possible to enable your application. Found a use-case we didn't consider? Open a Github issue and let us know!
      </>
    ),
  },
  {
    title: "Comprehensive",
    description: (
      <>
        Hate installing ~50 different node packages just to get ~50 different Javascript ✨Sprinkles✨? We provide you with a comprehensive set of lightweight controllers with the hope that when you find yourself needing a new behaviour, that we already have a controller that does it for you, without you having to install more packages.
        <br/>
        <br/>
        The library is fully tree-shakable, so install Stimulus-Library guilt free - only the controllers that you use are bundled into your application.
      </>
    ),
  },
  {
    title: "Fire and Forget",
    description: (
      <>
        While all controllers in Stimulus-Library are composable and provide a comprehensive set of events that you can use to wire together multiple controllers - for simple things like auto-sizing text-areas, you shouldn't have to remember to wire up the various DOM events to the corresponding Stimulus action, you should be able to just drop it in and forget about it.
        <br/>
        <br/>
        Stimulus-Library, where it seems sensible, creates controllers that you can just "Fire and Forget". If you don't like that, you can turn it off and wire things up yourself. You're the boss. </>
    ),
  },
  {
    title: "Just Works (TM)",
    description: (
      <>
        Stimulus Library aims to provide you with a toolbox of useful controllers that you can just drop into your application and they just work, seamlessly. </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title}/>
        </div>
      )}<h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`} description={siteConfig.tagline}
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>

          <div className={styles.badges}>
            <img className={styles.badge} alt={"NPM Downloads"} src={"https://img.shields.io/npm/dt/stimulus-library"}/>
            <img className={styles.badge} alt={"Minified Size"} src={"https://img.shields.io/bundlephobia/minzip/stimulus-library/latest?label=minified%20size"}/>
          </div>

          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button button--secondary button--lg",
                styles.getStarted,
              )} to={useBaseUrl("docs/")}
            > Get Started </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
