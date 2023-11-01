import styled from 'styled-components';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'Aasianninja';
    src: url('/fonts/aasianninja.woff2') format('woff2'),
         url('/fonts/aasianninja.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Albertson';
    src: url('/fonts/albertson.woff2') format('woff2'),
         url('/fonts/albertson.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Redfighter';
    src: url('/fonts/redfighter.woff2') format('woff2'),
         url('/fonts/redfighter.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Yoster';
    src: url('/fonts/yoster.woff2') format('woff2'),
         url('/fonts/yoster.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'HalyardBold';
    src: url('/fonts/halyard-display-bold-webfont.woff2') format('woff2'),
          url('/fonts/halyard-display-bold-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'HalyardBoldItalic';
      src: url('/fonts/halyard-display-bold-italic-webfont.woff2') format('woff2'),
            url('/fonts/halyard-display-bold-italic-webfont.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }

  @font-face {
    font-family: 'HalyardDisplay';
    src: url('/fonts/halyard-display-medium-webfont.woff2') format('woff2'),
          url('/fonts/halyard-display-medium-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
  font-family: 'InknutAntiqua';
  src: url('/fonts/inknutantiqua-extrabold-webfont.woff2') format('woff2'),
       url('/fonts/inknutantiqua-extrabold-webfont.woff') format('woff');
  font-weight: 800;
  font-style: normal;
}

@font-face {
  font-family: 'InknutAntiqua';
  src: url('/fonts/inknutantiqua-regular-webfont.woff2') format('woff2'),
       url('/fonts/inknutantiqua-regular-webfont.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'InknutAntiqua';
  src: url('/fonts/inknutantiqua-bold-webfont.woff2') format('woff2'),
       url('/fonts/inknutantiqua-bold-webfont.woff') format('woff');
  font-weight: 700;
  font-style: normal;
}
      `;


export const NoiseEffect = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('/images/noise.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  opacity: 0.1;
`;

const originalWarn = console.warn.bind(console.warn);
console.warn = (text: string, ...args: any[]) => {
  if (/Function copy already exists on CSM, renaming to base_copy/.test(text)) return;
  originalWarn(text, ...args);
};

export const DustEffect = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('/images/dust.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  opacity: 1;
  mix-blend-mode: color-dodge ;
`;

export const PixelCorners3x3 = styled.div`
  clip-path: polygon(
    0px 6px,
    2px 6px,
    2px 4px,
    4px 4px,
    4px 2px,
    6px 2px,
    6px 0px,
    calc(100% - 6px) 0px,
    calc(100% - 6px) 2px,
    calc(100% - 4px) 2px,
    calc(100% - 4px) 4px,
    calc(100% - 2px) 4px,
    calc(100% - 2px) 6px,
    100% 6px,
    100% calc(100% - 6px),
    calc(100% - 2px) calc(100% - 6px),
    calc(100% - 2px) calc(100% - 4px),
    calc(100% - 4px) calc(100% - 4px),
    calc(100% - 4px) calc(100% - 2px),
    calc(100% - 6px) calc(100% - 2px),
    calc(100% - 6px) 100%,
    6px 100%,
    6px calc(100% - 2px),
    4px calc(100% - 2px),
    4px calc(100% - 4px),
    2px calc(100% - 4px),
    2px calc(100% - 6px),
    0px calc(100% - 6px)
  );
`;


export const PixelCorners2x2 = styled.div`
  clip-path: polygon(
    0px 4px,
    2px 4px,
    2px 2px,
    4px 2px,
    4px 0px,
    calc(100% - 4px) 0px,
    calc(100% - 4px) 2px,
    calc(100% - 2px) 2px,
    calc(100% - 2px) 4px,
    100% 4px,
    100% calc(100% - 4px),
    calc(100% - 2px) calc(100% - 4px),
    calc(100% - 2px) calc(100% - 2px),
    calc(100% - 4px) calc(100% - 2px),
    calc(100% - 4px) 100%,
    4px 100%,
    4px calc(100% - 2px),
    2px calc(100% - 2px),
    2px calc(100% - 4px),
    0px calc(100% - 4px)
  );
`;

export const PixelCorners1x1 = styled.div`
clip-path: polygon(
  0px 2px, 
  2px 2px, 
  2px 0px, 

  calc(100% - 2px) 0px,  /* Haut droit */
  calc(100% - 2px) 2px,
  100% 2px,

  100% calc(100% - 2px),  /* Bas droit */
  calc(100% - 2px) calc(100% - 2px),
  calc(100% - 2px) 100%,
  
  2px 100%,  /* Bas gauche */
  2px calc(100% - 2px),
  0px calc(100% - 2px)
);
`;