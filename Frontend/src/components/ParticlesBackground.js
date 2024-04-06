import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#000",
          },
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 200,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#ffcc00",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
            random: true,
          },
          size: {
            value: 3,
            random: { enable: true, minimumValue: 1 },
          },
          links: {
            enable: false,
          },
          move: {
            enable: true,
            speed: 2,
          },
          life: {
            duration: {
              sync: false,
              value: 3,
            },
            count: 0,
            delay: {
              random: {
                enable: true,
                minimumValue: 0.5,
              },
              value: 1,
            },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: "absolute",
        zIndex: -1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    />
  );
};

export default ParticlesBackground;
