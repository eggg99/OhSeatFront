import { ArrowBigLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import { findEmail } from "@/apis/api/user";

export default function FindId() {
  const navigate = useNavigate(); // 이동을 위한 훅

  const [inputValue, setInputValue] = useState({
    name: '',               // 이름
    phoneNumber: '',        // 핸드폰번호
  });

  // 입력 필드 변경 시, 상태 반영을 위한 핸들러
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const value = e.target.value.replace(/ /g,"") // 공백 제거된 값

    setInputValue({
      ...inputValue,                      // 기존 값을 그대로 복사하여 바꾸려는 필드만 덮어씌우도록함
      [name] : value,                     // 해당 name에 새로운 value를 할당함
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await findEmail(inputValue);
    if(!response) return;

    navigate('/user/find-result', {
      state: { email: response }
    });
  }

  return (
    <div className="os_found_form_wrap">
      <form
        onSubmit={handleSubmit}
        className='os_found_form'
      >
        <h3><span>오싵 아이디 찾기</span></h3>

        <ul className="os_join_list">
          <li>
            <span>이름</span>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              name="name"
              value={inputValue.name}
              onChange={handleInput}
              maxLength={30}
            />
          </li>
          <li>
            <span>휴대전화</span>
            <input
              type="text"
              placeholder="휴대전화번호를 입력하세요(- 제외)"
              name="phoneNumber"
              value={inputValue.phoneNumber}
              onChange={handleInput}
              maxLength={12}
            />
          </li>
          <li>
            <button type="submit" className="user_join_button">아이디 찾기</button>
          </li>
        </ul>
      </form>
    </div>
  )
}