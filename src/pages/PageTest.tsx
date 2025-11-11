import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import img1 from '@/styles/img/89676_320.png';
import img2 from '@/styles/img/89701_320.png';
import img3 from '@/styles/img/89706_320.png';
import img4 from '@/styles/img/89847_320.png';

export default function PageTest() {
    // 이미지용
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'start' },
        [Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })]
    );

    // 이미지 슬라이드
    const slides = [img1, img2, img3, img4];
    const [selectedIndex, setSelectedIndex] = useState(0);

    // 현재 슬라이드 인덱스 업데이트
    const onSelect = (embla: typeof emblaApi): void => {
        if (!embla) return;
        setSelectedIndex(embla.selectedScrollSnap());
    };

    // Embla가 준비되면 onSelect 이벤트 연결
    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', () => onSelect(emblaApi));
        onSelect(emblaApi);
    }, [emblaApi]);


    // 영화관용
    const [emblaRef2] = useEmblaCarousel({
        dragFree: true,     
        containScroll: 'trimSnaps',
    })
    const theaters = Array.from({ length: 100 }, (_, i) => `영화관${i + 1}`)

    // 인라인 스타일 - 이미지용
    const viewportStyle: React.CSSProperties = { overflow: 'hidden', width: '300px' };
    const containerStyle: React.CSSProperties = { display: 'flex', userSelect: 'none' };
    const slideStyle: React.CSSProperties = { minWidth: '100%', textAlign: 'center' };
    const arrowStyle: React.CSSProperties = {
        padding: '0.5rem 1rem',
        margin: '0 0.5rem',
        cursor: 'pointer',
        background: '#000',
        color: '#fff',
        border: 'none',
        borderRadius: '4px'
    };
    const indicatorStyle: React.CSSProperties = {
        display: 'inline-block',
        width: '10px',
        height: '10px',
        margin: '0 5px',
        borderRadius: '50%',
        backgroundColor: '#ccc'
    };
    const activeIndicatorStyle: React.CSSProperties = {
        ...indicatorStyle,
        backgroundColor: '#333'
    };


    // 인라인 스타일 - 영화관용
    const emblaStyle: React.CSSProperties = {
        width: '100%',
        overflow: 'hidden',
    }

    const viewportStyle2: React.CSSProperties = {
        overflow: 'hidden',
        width: '100%',
    }

    const containerStyle2: React.CSSProperties = {
        display: 'flex',
        userSelect: 'none',
        WebkitTouchCallout: 'none',
    }

    const slideStyle2: React.CSSProperties = {
        flex: '0 0 auto',
        marginRight: '12px',
    }

    const linkStyle: React.CSSProperties = {
        display: 'inline-block',
        padding: '8px 12px',
        background: '#eee',
        borderRadius: '6px',
        textDecoration: 'none',
        color: '#333',
        whiteSpace: 'nowrap',
    }


  return (
    <div className="os_main_contents">
        <div className="os_main_visual">
            <div style={viewportStyle}>
                <h2>이미지 슬라이드</h2>
                {/* 이미지들 */}
                <div ref={emblaRef}>
                    <ul style={containerStyle}>
                        {slides.map((img, idx) => (
                            <li style={slideStyle} key={idx}>
                                <img src={img} alt={`테스트 이미지${idx + 1}`} style={{ width: '100%' }} />
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 화살표 버튼 */}
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <button
                        style={arrowStyle}
                        onClick={() => emblaApi?.scrollPrev()}
                    >◀</button>
                    
                    <button
                        style={arrowStyle}
                        onClick={() => emblaApi?.scrollNext()}
                    >▶</button>
                </div>

                {/* 페이지 인디케이터 */}
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    {slides.map((_, idx) => (
                        <span
                            key={idx}
                            style={idx === selectedIndex ? activeIndicatorStyle : indicatorStyle}
                            onClick={() => emblaApi?.scrollTo(idx)}
                        />
                    ))}
                </div>
            </div>
            
            <hr/>

            <div style={viewportStyle}>
                <h2>영화관 옆으로 넘기는 부분 슬라이드</h2>
                <div style={emblaStyle}>
                    <div style={viewportStyle2} className="embla__viewport" ref={emblaRef2}>
                        <ul style={containerStyle2} className="embla__container">
                            {theaters.map((name) => (
                                <li style={slideStyle2} className="embla__slide" key={name}>
                                <a href="#" style={linkStyle}>{name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
