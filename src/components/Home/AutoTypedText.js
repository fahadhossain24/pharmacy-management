import React from 'react';
import Typed from 'typed.js';

const AutoTypedText = () => {
    const el = React.useRef(null);

    React.useEffect(() => {
      const typed = new Typed(el.current, {
        strings: ['Get <span style="color: yellow">medicine</span> just one second - <span style="color: yellow">Medicine Park</span>', 'Your wanted <span style="color: yellow">medicine</span> here - <span style="color: yellow">Medicine Park</span>'],
        typeSpeed: 100,
        backSpeed: 40,
        loop:true,
      });
      return () => {
        typed.destroy();
      };
    }, []);

    return (
        <div>
            <span ref={el} />
        </div>
    );
};

export default AutoTypedText;