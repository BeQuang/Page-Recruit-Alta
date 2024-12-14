/* eslint-disable react-hooks/exhaustive-deps */
import Form from "react-bootstrap/Form";
import Dropdown from "../Dropdown/Dropdown";
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState, useRef } from "react";
import { CgDanger } from "react-icons/cg";
import { Option } from "../../Types/login";
import { validLogin } from "../Validate/Validate";
import {
  createOrUpdateUser,
  getUserInformation,
} from "../../firebase/userController";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ModalSuccess from "./ModalSuccess";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/user.slice";
import { preProcessingImage } from "../PreProcessingImage/PreProcessingImage";
import { fetchAllTitles } from "../../firebase/contestController";
import { setTitleContest } from "../../redux/slices/titleContest.slice";

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const [captchaValue, setCaptchaValue] = useState<boolean>(false);
  const [errorInput, setErrorInput] = useState<boolean>(false);
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
    setCaptchaValue(false);
    setErrorInput(false);

    recaptchaRef.current?.reset();
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const checkValidInput = await validLogin({ email, password });

    if (checkValidInput && captchaValue) {
      setErrorInput(false);

      const res = await createOrUpdateUser({
        email,
        password,
        option: type,
        remember: rememberPass,
        captcha: captchaValue,
      });

      if (res.EM === "CREATE") {
        setIsModalSuccess(true);
        resetData();
      } else if (res.EM === "UPDATE") {
        const userInfo = await getUserInformation(res.DT);

        const linkImageConvert = preProcessingImage(userInfo?.avatarUrl);

        const dataRedux = { ...userInfo, avatarUrl: linkImageConvert };
        if (dataRedux) {
          dispatch(setUser(dataRedux));
        }

        const titleContest = await fetchAllTitles();
        if (titleContest) {
          dispatch(setTitleContest(titleContest));
        }

        navigate("/user");
      } else if (res.EM === "ERROR") {
        setErrorInput(true);
      }
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
              setType={setType}
            />
          </Form.Group>
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
              checked={rememberPass}
              onChange={() => setRememberPass(!rememberPass)}
            />
            <Link to="/forgot-pass" className="forgot-pass">
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
