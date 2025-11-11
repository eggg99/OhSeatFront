import '@/styles/css/main.scss'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay';

import img1 from '@/styles/img/89676_320.png';
import img2 from '@/styles/img/89701_320.png';
import img3 from '@/styles/img/89706_320.png';
import img4 from '@/styles/img/89847_320.png';

const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [
        Autoplay({
        delay: 3000,          // 슬라이드 넘어가는 시간
        stopOnInteraction: true, // 사용자가 슬라이드 건드리면 멈춤
        stopOnMouseEnter: true   // 마우스 올라가면 멈춤
        })
    ]
)

export default function PageTest () {
    return (
        <main className="os_main_contents">
            <div className="os_main_visual">
                <h1>슬라이드 테스트!!</h1>
                
                <div>
                    <h3>이미지 부분</h3>
                    <div className="embla__viewport" ref={emblaRef}>
                        <ul className="embla__container">
                            <li className='embla__slide'><img src="{img1}" alt="테스트 이미지1"/></li>
                            <li className='embla__slide'><img src="{img2}" alt="테스트 이미지2"/></li>
                            <li className='embla__slide'><img src="{img3}" alt="테스트 이미지3"/></li>
                            <li className='embla__slide'><img src="{img4}" alt="테스트 이미지4"/></li>
                        </ul>
                    </div>
                </div>

                <div>
                    <h3>영화관 부분</h3>
                    <div>

                    </div>
                </div>


            </div>
        </main>
    )
}