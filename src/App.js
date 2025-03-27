import React from "react";

function App() {
    return (
        <div className="App">
            <header className="App_header">
                <div className="inner">
                    <h1 className="logo"><a href="/">OhSeat</a></h1>
                    <nav className="menu_wrap">
                        <ul>
                            <li><a href="/">좌석추천</a></li>
                            <li><a href="/">채팅</a></li>
                            <li><a href="/">로그인버튼</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main className="App_main">
                <div>안녕하시개</div>
            </main>
            <footer className="App_footer">
                <div className="inner">
                    <nav className="footer-credits">
                        <ul>
                            <li>Copyright © OhSeat Corp. All rights Reserved.</li>
                            <li>Made by 김민정 이효원</li>
                        </ul>
                    </nav>
                </div>
            </footer>
        </div>
    );
}

export default App;
