# Librerie esterne (copiate qui, nessun CDN)

| File | Versione | Fonte | Licenza |
|---|---|---|---|
| `gsap.min.js` | 3.15.0 | https://github.com/greensock/GSAP (npm `gsap`) | GSAP Standard License, gratuita anche per uso commerciale |
| `ScrollTrigger.min.js` | 3.15.0 | come sopra | come sopra |
| `lenis.min.js` | 1.3.26 | https://github.com/darkroomengineering/lenis (npm `lenis`) | MIT |

Le usa `js/motion.js`. Per aggiornarle: `npm pack gsap lenis`, copiare i file da `package/dist/`
e cambiare il parametro `?v=` nelle pagine e in `scripts/genera-pagine-esami.js`.
Gli effetti ispirati a React Bits (https://github.com/DavidHDev/react-bits: BlurText, ShinyText,
SpotlightCard, Aurora) sono riscritti in JS/CSS semplice: React Bits richiede React, che il sito non usa.
