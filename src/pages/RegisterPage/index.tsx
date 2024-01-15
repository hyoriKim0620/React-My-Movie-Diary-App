import { useNavigate } from "react-router";
import { Button, Container, ImageBox, Input } from "../loginRegister.styles";
import { ChangeEvent, useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  // const { name, email, password } = inputValue;

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleClick = () => {
    setIsLoading(true);
    // console.log("회원가입하기!", name, email, password);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Container>
      <ImageBox className="move_ani">
        <img src="/love_bee.png" alt="bee-image" />
      </ImageBox>
      <form>
        <Input
          type="text"
          name="name"
          onChange={(e) => handleInput(e)}
          placeholder="이름을 입력해주세요."
          disabled={isLoading}
        />
        <Input
          type="text"
          name="email"
          onChange={(e) => handleInput(e)}
          placeholder="이메일을 입력해주세요."
          disabled={isLoading}
        />
        <Input
          type="password"
          name="password"
          onChange={(e) => handleInput(e)}
          placeholder="비밀번호를 입력해주세요."
          disabled={isLoading}
        />

        <div
          onClick={() => navigate("/login")}
          style={{ textAlign: "right", padding: "15px 5px" }}
        >
          로그인
        </div>
        <Button onClick={() => handleClick()}>회원가입 하기</Button>
      </form>
    </Container>
  );
};

export default RegisterPage;
