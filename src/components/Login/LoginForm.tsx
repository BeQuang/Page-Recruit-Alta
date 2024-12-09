import Form from "react-bootstrap/Form";
import Dropdown from "../Dropdown/Dropdown";
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState } from "react";
import { CgDanger } from "react-icons/cg";
import { Option } from "../../Types/login";
import { validLogin } from "../Validate/Validate";
import { createOrUpdateUser } from "../../firebase/controller";

function LoginForm() {
  const dataOptions = [
    { text: "TP.HCM" },
    { text: "Hà Nội" },
    { text: "Đà N��ng" },
    { text: "Cần Thơ" },
    { text: "Hồ Chí Minh" },
    { text: "An Giang" },
    { text: "Bắc Giang" },
    { text: "Bắc Kạn" },
    { text: "Bắc Ninh" },
    { text: "Bến Tre" },
  ];

  useEffect(() => {
    setListOptions(dataOptions);
  }, []);

  const [captchaValue, setCaptchaValue] = useState<boolean>(false);
  const [errorInput, setErrorInput] = useState<boolean>(false);
  const [listOptions, setListOptions] = useState<Option[]>([]);

  const [type, setType] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");
  const [rememberPass, setRememberPass] = useState<boolean>(false);

  const onChangeCaptcha = (value: string | null) => {
    setCaptchaValue(true);
    console.log("Captcha value >>>> ", captchaValue);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const checkValidInput = await validLogin({ email, password });

    if (checkValidInput) {
      setErrorInput(false);

      const res = await createOrUpdateUser({
        email,
        password,
        option: type,
        remember: rememberPass,
        captcha: captchaValue,
      });

      console.log(res);
    } else {
      setErrorInput(true);
    }
  };

  return (
    <div className="container-login-form">
      <h3 className="mb-3 title">Đăng nhập</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            Vai trò<span className="text-danger">*</span>
          </Form.Label>
          <Dropdown listOptions={listOptions} setType={setType} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            Email<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Tên đăng nhập"
            className={errorInput ? "is-error" : ""}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Mật khẩu<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu"
            className={errorInput ? "is-error" : ""}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {errorInput ? (
          <div className="text-danger d-flex mb-3 error-text">
            <div className="icon-danger me-2">
              <CgDanger />
            </div>
            <span>Sai tên đăng nhập hoặc mật khẩu.</span>
          </div>
        ) : null}
        <Form.Group
          className="mb-3 d-flex justify-content-between"
          controlId="formBasicCheckbox"
        >
          <Form.Check
            type="checkbox"
            label="Ghi nhớ mật khẩu"
            onChange={() => setRememberPass(!rememberPass)}
          />
          <span className="forgot-pass">Quên mật khẩu?</span>
        </Form.Group>
        <ReCAPTCHA
          sitekey="6LfiC5YqAAAAAMXf5M7DGHZsid4HA8Fr4iFbTDVY"
          onChange={onChangeCaptcha}
        />
        ,
        <button
          className="btn btn-login"
          disabled={!captchaValue}
          onClick={(event) => handleLogin(event)}
        >
          Đăng nhập
        </button>
      </Form>
    </div>
  );
}

export default LoginForm;
