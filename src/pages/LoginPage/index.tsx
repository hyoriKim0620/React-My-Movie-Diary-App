import { ChangeEvent, useEffect, useState } from "react";
import { Container, ImageBox, Input, Button } from "../loginRegister.styles";
import { EMAIL_REGEX } from "./../../constants";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const { email, password } = inputValue;

  useEffect(() => {
    window.addEventListener("focusout", (e) => checkIdValidation(e.target));
    return () => {
      window.removeEventListener("focusout", (e) =>
        checkIdValidation(e.target)
      );
    };
  }, []);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleClick = () => {
    console.log("로그인하기!", email, password);
    setIsLoading(true);

    try {
      console.log("로그인하기 try");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkIdValidation = (target: { name: string; value: string }) => {
    const { name, value } = target;

    if (name === "email") {
      const isValidId = checkIdRegex(value);
      if (isValidId === "required") {
        // console.log("이메일을 입력해주세요.");
      } else if (isValidId === "invalid") {
        // console.log("이메일을 다시 입력해주세요.");
      }
    }
  };

  const checkIdRegex = (value: string) => {
    if (value.length === 0) {
      return "required";
    } else {
      return EMAIL_REGEX.test(value) ? true : "invalid";
    }
  };

  return (
    <Container>
      <ImageBox className="move_ani">
        <img src="/love_bee.png" alt="bee-image" />
      </ImageBox>
      <form>
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
          onClick={() => navigate("/register")}
          style={{ textAlign: "right", padding: "15px 5px" }}
        >
          회원가입
        </div>
        <Button onClick={() => handleClick()}>로그인 하기</Button>
      </form>
    </Container>
  );
};

export default LoginPage;
