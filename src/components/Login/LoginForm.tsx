/* eslint-disable react-hooks/exhaustive-deps */
import Form from "react-bootstrap/Form";
import Dropdown from "../Dropdown/Dropdown";
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState, useRef } from "react";
import { CgDanger } from "react-icons/cg";
import { Option } from "../../Types/login";
import { validLogin } from "../Validate/Validate";
import {
  createOrUpdateUserWithAuth,
  fetchAllRoles,
} from "../../firebase/userController";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ModalSuccess from "./ModalSuccess";
import { useLoading } from "./ContextLoading";

function LoginForm() {
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const dataOptions = await fetchAllRoles(); // Chờ kết quả từ API
        setListOptions(dataOptions); // Cập nhật state
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const [captchaValue, setCaptchaValue] = useState<boolean>(true);
  const [errorInput, setErrorInput] = useState<boolean>(false);
  const [errorSelect, setErrorSelect] = useState<boolean>(false);
  const [textError, setTextError] = useState<string>("");
  const [listOptions, setListOptions] = useState<Option[]>([]);

  const [type, setType] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberPass, setRememberPass] = useState<boolean>(false);

  const [isModalSuccess, setIsModalSuccess] = useState<boolean>(false);

  const onChangeCaptcha = (value: string | null) => {
    if (value) {
      setCaptchaValue(true);
    }
  };

  const resetData = () => {
    setEmail("");
    setPassword("");
    setType("");
    setRememberPass(false);
    setCaptchaValue(true);
    setErrorInput(false);

    recaptchaRef.current?.reset();
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const checkValidInput = await validLogin({ email, password });

    if (checkValidInput && captchaValue) {
      setErrorInput(false);
      setLoading(true);

      const res = await createOrUpdateUserWithAuth({
        email,
        password,
        option: type,
        remember: rememberPass,
        captcha: captchaValue,
      });

      switch (res.EM) {
        case "CREATE":
          setIsModalSuccess(true);
          setErrorInput(false);
          setErrorSelect(false);
          resetData();
          break;

        case "UPDATE":
          setErrorInput(false);
          setErrorSelect(false);
          if (type === "Sinh viên") {
            navigate("/user");
          } else if (type === "Doanh nghiệp") {
            navigate("/recruit");
          } else if (type === "Quản trị viên") {
            navigate("/admin");
          }
          break;

        case "ERROR":
          setErrorInput(true);
          setTextError("ERROR");
          break;

        case "ERROR CHARACTER":
          setErrorInput(true);
          setTextError("ERROR CHARACTER");
          break;

        case "ROLE VALID":
          setErrorSelect(true);
          break;

        default:
          console.warn("Unhandled response EM:", res.EM);
          break;
      }

      setLoading(false);
    } else {
      setErrorInput(true);
    }
  };

  return (
    <>
      <div className="container-login-form">
        <h3 className="mb-3 title">Đăng nhập</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Vai trò<span className="text-danger">*</span>
            </Form.Label>
            <Dropdown
              value={type}
              listOptions={listOptions}
              setType={(value: string | string[]) => setType(value as string)}
              title="Chọn vai trò"
            />
          </Form.Group>
          {errorSelect ? (
            <div className="text-danger d-flex mb-3 error-text">
              <div className="icon-danger me-2">
                <CgDanger />
              </div>
              <span>Vai trò của tài khoản không hợp lệ</span>
            </div>
          ) : null}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Email<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Tên đăng nhập"
              className={errorInput ? "is-error" : ""}
              value={email}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {errorInput ? (
            <div className="text-danger d-flex mb-3 error-text">
              <div className="icon-danger me-2">
                <CgDanger />
              </div>
              <span>
                {textError === "ERROR"
                  ? "Sai tên đăng nhập hoặc mật khẩu."
                  : "Mật khẩu tối thiểu 6 kí tự."}
              </span>
            </div>
          ) : null}
          <Form.Group
            className="mb-3 d-flex justify-content-between"
            controlId="formBasicCheckbox"
          >
            <Form.Check
              type="checkbox"
              label="Ghi nhớ mật khẩu"
              checked={rememberPass}
              onChange={() => setRememberPass(!rememberPass)}
            />
            <Link to="/login/forgot-pass" className="forgot-pass">
              Quên mật khẩu?
            </Link>
          </Form.Group>
          <ReCAPTCHA
            ref={recaptchaRef}
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

      <ModalSuccess show={isModalSuccess} setShow={setIsModalSuccess} />
    </>
  );
}

export default LoginForm;
