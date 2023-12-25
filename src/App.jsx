import React, { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const elts = {
    text1: useRef(null),
    text2: useRef(null),
  };

  const texts = ["Ethical Hacker", "CTF Player", "hoaxablaze77"];

  let textIndex = texts.length - 1;
  let time = new Date();
  let morph = 0;
  let cooldown = 0.25;

  const doMorph = () => {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / 1;

    if (fraction > 1) {
      cooldown = 1;
      fraction = 1;
    }

    setMorph(fraction);
  };

  const setMorph = (fraction) => {
    elts.text2.current.style.filter = `blur(${Math.min(
      8 / fraction - 8,
      100
    )}px)`;
    elts.text2.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.current.style.filter = `blur(${Math.min(
      8 / fraction - 8,
      100
    )}px)`;
    elts.text1.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.current.textContent = texts[textIndex % texts.length];
    elts.text2.current.textContent = texts[(textIndex + 1) % texts.length];
  };

  const doCooldown = () => {
    morph = 0;

    elts.text2.current.style.filter = "";
    elts.text2.current.style.opacity = "100%";

    elts.text1.current.style.filter = "";
    elts.text1.current.style.opacity = "0%";
  };

  const animate = () => {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
      if (shouldIncrementIndex) {
        textIndex++;
      }

      doMorph();
    } else {
      doCooldown();
    }
  };

  useEffect(() => {
    animate();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Hey, I'm Ravi</h1>
        <h2 className="position">
          <span id="text1" ref={elts.text1}></span>
          <span id="text2" ref={elts.text2}></span>
        </h2>

        <p>
          I'm Ravishankar, BCA graduate now pursuing MCA at SRM Institute of Science and Technology. Passionate about ethical hacking and penetration testing, actively preparing for certifications like eJPT, CEH, PNPT, CRTP, OSCP, etc. Specialized in Offensive Security, OSINT, Red Teaming, Application and Network Security, and Host Penetration Testing. Enthusiastic learner in the dynamic field of Information Security.
        </p>
        <hr />
        <div className="social-icons">
          <a target="_blank" href="https://www.linkedin.com/in/ravishankar-m-8880b7246/">
            LinkedIn
          </a>
          {/* <a target="_blank" href="">
            HackeRank
          </a> */}
          <a target="_blank" href="https://www.instagram.com/r.a.v.i18/ ">
            Instagram
          </a>
          <a target="_blank" href="mailto:ravishankarkanchi8@gmail.com">
            Contact Me
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
