import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import img1 from '@/styles/img/89676_320.png';
import img2 from '@/styles/img/89701_320.png';
import img3 from '@/styles/img/89706_320.png';
import img4 from '@/styles/img/89847_320.png';

/*const backgroundColor = '#eeeae6';
const lightShadow = '#ffffff';
const darkShadow = '#e9dbcdde';*/

const backgroundColor = '#fef6ef';
const lightShadow = '#ffffff';
const darkShadow = '#e9dbcdde';

export default function PageTest() {
  const square_background: React.CSSProperties = {
    width: '100%',
    height: '500px',
    backgroundColor: backgroundColor,
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap:'100px',
  };
  const neu_1: React.CSSProperties = {
    background: backgroundColor,
    boxShadow: `-28px -28px 30px ${lightShadow},
    28px 28px 30px ${darkShadow}`,
  };

  const neu_1_1: React.CSSProperties = {
    width: '290px',
    height: '180px',
    background: backgroundColor,
    border:'1px solid #EFF1F4',
    boxShadow: `-28px -28px 30px ${lightShadow},
    28px 28px 30px ${darkShadow}`,
  };

  const neu_2: React.CSSProperties = {
    width: '300px',
    height: '130px',
    background: backgroundColor,
    boxShadow: `inset 18px 18px 30px ${darkShadow}, inset -18px -18px 30px ${lightShadow}`,
  };

  const outer: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '32px',
    background: backgroundColor,
    padding: '10px',
    boxShadow: `
      8px 8px 18px ${darkShadow},
      -6px -6px 14px ${lightShadow}
    `,
  };

  const inner: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: '24px',
    background: backgroundColor,
    border: '1px solid rgba(255,255,255,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `
      inset 3px 3px 6px ${darkShadow},
      inset -3px -3px 6px ${lightShadow},
      inset 10px 10px 18px ${darkShadow},
      inset -10px -10px 18px ${lightShadow}
    `,
  };

  const iconStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 700,
    color: '#F27D7D',
    lineHeight: 1,
  };


  return (
    <div className="os_main_contents">
      <div style={square_background}>
        <div style={neu_1}></div>
        <div style={neu_2}></div>
        <div style={outer}>
          <div style={inner}>
            <div style={iconStyle}>F</div>
          </div>
        </div>
      </div>
    </div>
  );
}
