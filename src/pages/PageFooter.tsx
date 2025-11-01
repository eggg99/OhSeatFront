import React from 'react';

const Footer = () => {
    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // 부드럽게 스크롤
        });
    };
        
    return (
        <footer className="os_footer">
            <div className="os_corp">
                <div className="inner">
                    <ul className="os_corp_list clear">
                        <li><a href="#">개인정보처리방침</a></li>
                        <li><a href="#">이메일무단수집거부</a></li>
                        <li><a href="#">윤리경영</a></li>
                    </ul>
                </div>
            </div>
            <div className="os_address">
                <div className="inner clear">
                    <p className="os_bottom_logo">Oh Seat!</p>

                    <ul className="address_list">
                        <li>서울특별시 가온구 미래대로 123, 4층 (가온타워)</li>
                        <li>TEL 02-1234-5678 / E-MAIL contact@ohseat.co.kr</li>
                        <li>© 2025 Oh Seat!. All rights reserved. Made by 김민정 이미경 이효원</li>                            
                    </ul>
                    
                    <a href="#" className="go_to_top_button" onClick={handleScrollTop}>
                        <i className="blind">위로 가기</i>
                    </a>
                </div>
            </div>         
        </footer>
    );
};

export default Footer;