import { use, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { duplicateNickname, registerUser } from "@/apis/api/user";

export default function Join(){
  const navigate = useNavigate(); // 이동을 위한 훅

  const [inputValue, setInputValue] = useState({
    name: '',               // 이름
    email: '',              // 이메일
    nickname: '',           // 닉네임
    password: '',           // 비밀번호
    password2: '',          // 비밀번호 확인
    phoneNumber: '',        // 핸드폰번호

    validPassword : false,  // 비밀번호 정규식 충족 여부
    validDuplicate : false, // 닉네임 중복여부
  });

  const [errorMessages, setErrorMessages] = useState({
    password: "",
    password2: "",
  });


  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=]).{8,16}$/;

  // 입력 필드 변경 시, 상태 반영을 위한 핸들러
  // e: React.ChangeEvent<HTMLInputElement> : 이벤트 객체의 HTMLInputElement 타입 명시
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 이벤트가 발생한 <input>요소의 name, value를 꺼내기
    const { name } = e.target;
    const value = e.target.value.replace(/ /g,"") // 공백 제거된 값

    setInputValue({
      ...inputValue,                      // 기존 값을 그대로 복사하여 바꾸려는 필드만 덮어씌우도록함
      [name] : value,                     // 해당 name에 새로운 value를 할당함
    });

    switch(name) {
      case "password" :
        const isValid = passwordRegex.test(value);
        setInputValue(prev => ({
          ...prev,
          validPassword: isValid,
        }));

        setErrorMessages(prev => ({
          ...prev,
          password: isValid ? "" : "숫자+영문자+특수문자 조합으로 8자리 이상 입력",
        }));
      case "password2" :
        setErrorMessages(prev => ({
          ...prev,
          password2: inputValue.password !== value ? "비밀번호와 비밀번호확인이 같지 않아요" : "",
        }));
    }
  }

  const duplicateNick = async () => {
    const param = {}
    try{
      const response = await duplicateNickname(param);
      if (response) {
        alert('사용할 수 있습니다.');
        inputValue.validDuplicate = true;
      } else {
        alert('사용할 수 없습니다.')
        inputValue.validDuplicate = false;
      }
    } catch (error) {
      alert('에러 발생')
      console.log(error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!inputValue.validPassword){
      alert("비밀번호를 확인해주세요");
      return false;
    }
    if(!inputValue.validDuplicate){
      alert("닉네임 중복확인을 확인해주세요");
      return false;
    }
    const response = await registerUser(inputValue);
    if(!response){
      // 회원가입이 실패한 경우 : 아무 동작 안함
      return;
    } else {
      alert('회원가입이 완료되었습니다!');
      navigate('/user/login');
    }
  };

  return(
    <div className="os_join_form_wrap">
      <form
        onSubmit={handleSubmit}
        className='os_join_form'
      >
        <h3><span>오싵 회원가입</span></h3>

        <ul className="os_join_list">
          <li>
            <span>이메일</span>
            <input
              type="text"
              placeholder="example@naver.com"
              name="email"
              value={inputValue.email}
              onChange={handleInput}
              required
              maxLength={240}/>
            <p className="noti">아이디로 이메일이 사용됩니다</p>
          </li>
          <li>
            <span>비밀번호<i>숫자+영문자+특수문자 조합으로 8자리 이상</i></span>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              name="password"
              value={inputValue.password}
              onChange={handleInput}
              required/>
            {errorMessages.password &&
                <p className="alert">{errorMessages.password}</p>
            }
          </li>
          <li>
            <span>비밀번호 확인</span>
            <input
              type="password"
              placeholder="비밀번호를 다시 한번 입력하세요"
              name="password2"
              value={inputValue.password2}
              onChange={handleInput}
              required/>
            {errorMessages.password2 &&
              <p className="alert">{errorMessages.password2}</p>
            }
          </li>
          <li>
          <span>이름</span>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              name="name"
              value={inputValue.name}
              onChange={handleInput}
              required
              maxLength={30}/>
          </li>
          <li>
            <span>휴대전화<i>- 제외하고 입력</i></span>
            <input
              type="text"
              placeholder="휴대전화번호를 입력하세요"
              name="phoneNumber"
              value={inputValue.phoneNumber}
              onChange={handleInput}
              required
              maxLength={12}/>
          </li>
          <li>
            <span>닉네임<i>글자 수 15자 제한</i></span>
            <div className="input_with_btn">
              <input
                type="text"
                placeholder="사용하실 닉네임을 입력하세요"
                name="nickname"
                value={inputValue.nickname}
                onChange={handleInput}
                required
                maxLength={15}
                disabled={inputValue.validDuplicate}
              />
              <button
                type="button"
                onClick={() => duplicateNick()}
                disabled={inputValue.validDuplicate}
              >중복확인</button>
            </div>
          </li>
          <li>
            <button type="submit" className="user_join_button">가입하기</button>
          </li>
        </ul>
      </form>
    </div>
  )
}


