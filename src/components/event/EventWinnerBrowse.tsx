import { useState } from "react";
import { Link } from "react-router-dom";

export default function EventWinnerBrowse () {
    const [category, setCategory] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        if (!searchValue.trim()) return; // 빈값 방지
        // 실제 검색 로직 (API 호출 등)을 여기에 추가
        console.log('검색 실행:', searchValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    
    return (
        <div className="os_sub_contents">
            <div className="os_sub_navigation clear">
                <h1>이벤트 당첨발표</h1>

                <ul className="breadcrumbs_list clear">
                    <li className="home"><Link to="/"><i className="blind">홈</i></Link></li>
                    <li><Link to="/event/browse">이벤트</Link></li>
                    <li><Link to={`/event/winner/browse`}>이벤트 당첨발표</Link></li>
                </ul>
            </div>

            {/* 카테고리영역 */}
            <section className="os_category_wrap">
                <div className="os_area">
                    <ul className="os_area_list clear">
                        <li className={category === '' ? 'on' : ''}>
                            <a href="#" onClick={() => setCategory('')}>전체</a>
                        </li>
                        <li className={category === '1' ? 'on' : ''}>
                            <a href="#" onClick={() => setCategory('1')}>시사회</a>
                        </li>
                        <li className={category === '2' ? 'on' : ''}>
                            <a href="#" onClick={() => setCategory('2')}>예매권</a>
                        </li>
                    </ul>
                </div>
            </section>
            {/* 카테고리영역 */}
            
            {/* 검색영역 */}
            <div className="flex gap-3">
                <select >
                    <option onClick={() =>setSearchType('')}>전체</option>
                    <option onClick={() =>setSearchType('1')}>시사회</option>
                    <option onClick={() =>setSearchType('2')}>예매권</option>
                </select>
                <input 
                    type="text" value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="검색어를 입력하세요"/>
                <button onClick={handleSearch}>검색</button>
                <button><Link to="/event/winner/reg">등록</Link></button>
            </div>
            {/* 검색영역 */}
            
            {/* 리스트영역 */}
            <div>
                <table className="basic_board1">
                    <colgroup>
                        <col style={{ width: '50%' }}/>
                        <col style={{ width: '50%' }}/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>작성일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>테스트용</td>
                            <td>2025.11.16</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}