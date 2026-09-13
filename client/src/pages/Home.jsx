import React from "react";

import {
  Link
} from "react-router-dom";

function Home() {
  return (
    <main className="home">

      {/* HERO SECTION */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-small-title">
            VBC BRICKS
          </p>

          <h1>
            BUILD STRONG.
            <br />
            BUILD BETTER.
          </h1>

          <p className="hero-description">
            Quality Bricks for Strong Foundations
          </p>

          <div className="hero-buttons">

            <Link
              to="/products"
              className="btn primary-btn"
            >
              Explore Products
            </Link>

            <Link
              to="/contact"
              className="btn secondary-btn"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>

      <section className="home-photo-banner">
        <img src="/images/vbc-yard.jpg" alt="VBC Bricks production yard in Telangana" />
        <div><p className="eyebrow">MADE IN WARANGAL</p><h2>Real bricks.<br />Real strength.</h2><p>Manufactured with care for the foundations that carry your future.</p><Link to="/gallery" className="photo-link">View our yard →</Link></div>
      </section>

      {/* ABOUT SECTION */}

      <section className="home-about">

        <h2>
          Quality You Can Build On
        </h2>

        <p>
          VBC Bricks provides reliable and
          quality construction bricks for
          residential and commercial projects.
        </p>

        <Link to="/about">
          Learn More
        </Link>

      </section>

    </main>
  );
}

export default Home;
