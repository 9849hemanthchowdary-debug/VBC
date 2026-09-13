import React from "react";

function Gallery() {
  return (
    <main className="content-page"><p className="eyebrow">OUR WORK</p><h1>Made for the places<br />that matter most.</h1><p className="page-intro">Explore the dependable building materials behind strong homes, commercial projects and communities.</p>
      <div className="photo-gallery"><figure><img src="/images/vbc-yard.jpg" alt="VBC brick kiln and production yard" /><figcaption>Our production yard</figcaption></figure><figure><img src="/images/vbc-brick-wall.png" alt="Handmade VBC bricks stacked at the yard" /><figcaption>Our signature VBC bricks</figcaption></figure><figure><img src="/images/vbc-production.jpg" alt="VBC bricks laid out for production in Warangal" /><figcaption>Production at scale</figcaption></figure><figure><img src="/images/vbc-brickfield.jpg" alt="Brick field at VBC Bricks, Warangal" /><figcaption>Made in Warangal</figcaption></figure></div>
    </main>
  );
}

export default Gallery;
