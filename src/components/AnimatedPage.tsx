import { useEffect } from 'react';
import { ReactNode } from 'react';
import chroma from 'chroma-js';

interface AnimatedPageProps {
  endColor: string;
  children: ReactNode;
}

const AnimatedPage: React.FC<AnimatedPageProps> = ({ endColor, children }) => {
    useEffect(() => {
      let startColor = document.body.style.backgroundColor || 'white';
      let t = 0;
      const increment = 0.01;
      const scale = chroma.scale([startColor, endColor]);
  
      const animateBackgroundColor = () => {
        if (t <= 1) {
          document.body.style.backgroundColor = scale(t).hex();
          t += increment;
          requestAnimationFrame(animateBackgroundColor);
        }
      };
      animateBackgroundColor();
  
      return () => {
        document.body.style.backgroundColor = endColor;
      };
    }, [endColor]);
  
    return <>{children}</>;
  };
  
  export default AnimatedPage;
