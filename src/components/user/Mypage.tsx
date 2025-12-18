import { useEffect, useState } from "react"
import { getUser, updateUser, deleteUser } from "@/apis/api/user"
import { Link, useNavigate } from 'react-router-dom';
import { userStore } from "@/store/userStore";

export default function Mypage(){
  const navigate = useNavigate(); // 이동을 위한 훅
  const { userId, clearUser } = userStore();

  const [inputValue, setInputValue] = useState({
    userId: userId,          // 유저 아이디
    name: '',               // 이름
    email: '',              // 이메일
    nickname: '',           // 닉네임
    phoneNumber: '',        // 핸드폰번호
  });

  useEffect(() => {
    getData(); // 마운트 될 때 데이터 가져오기
  }, []);

  const getData = async () => {
    try {
      const response = await getUser(inputValue);
      setInputValue(response);
    } catch (error) {
      console.error(error);
    }
  }

  // 수정 시 state 업데이트용 핸들러
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const value = e.target.value.replace(/ /g,"")

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // 수정 버튼 클릭 시 호출되는 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await updateUser(inputValue);
    if(!response){
      return;
    } else {
      alert('회원정보 수정이 완료되었습니다');
    }
  }

  // 회원 탈퇴 버튼 클릭 시 호출되는 핸들러
  const handleDelete = async() => {
    const confirmDelete = window.confirm("정말 탈퇴하시겠습니까?");
    if(!confirmDelete) return;

    const response = await deleteUser(inputValue.userId);
    if(!response){
      return;
    } else {
      alert("탈퇴가 처리되었습니다.");
      clearUser();
      navigate('/');
    }
  }

  return(
    <div className="os_mypage_form_wrap">
      <form
        onSubmit={handleSubmit}
        className='os_mypage_form'
      >
        <h3><span>{inputValue.nickname}님</span></h3>
        <h4>내 정보 수정</h4>
        <div className="edit_my_info">
          <ul className="os_join_list">
            <li>
              <span>이메일</span>
              <input
                type="text"
                placeholder="이메일"
                value={inputValue.email}
                disabled
              />
            </li>
            <li>
              <span>비밀번호</span>
              <Link to="/user/change-password">
                <button className="user_join_button">비밀번호 변경</button>
              </Link>
            </li>
            <li>
              <span>이름</span>
              <input
                type="text"
                placeholder="이름"
                value={inputValue.name}
                disabled
              />
            </li>
            <li>
              <span>닉네임</span>
              <div className="input_with_btn">
                <input
                  type="text"
                  placeholder="닉네임"
                  name="nickname"
                  value={inputValue.nickname}
                  onChange={handleInput}
                  maxLength={15}/>
                <button type="button">중복확인</button>
              </div>
            </li>
            <li>
              <span>휴대전화</span>
              <input
                type="text"
                placeholder="휴대전화번호를 입력하세요"
                name="phoneNumber"
                value={inputValue.phoneNumber}
                onChange={handleInput}
                maxLength={12}
              />
            </li>
            <li>
              <button type="submit" className="user_join_button">수정하기</button>
            </li>
          </ul>
        </div>
        <ul className="login_plus_list">
          <li><a href="#" onClick={handleDelete}>탈퇴하기</a></li>
        </ul>
      </form>
    </div>
  )
}
