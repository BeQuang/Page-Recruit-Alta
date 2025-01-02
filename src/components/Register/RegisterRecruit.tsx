import "./Register.scss";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { saveBusinessDataToFirestore } from "../../firebase/recruitController";
import { validateEmail, validRegisterBusiness } from "../Validate/Validate";
import { CgDanger } from "react-icons/cg";
import ModalRegisterSuccess from "../Modal/ModalRegisterSuccess";
import { ThreeCircles } from "react-loader-spinner";

function RegisterRecruit() {
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [business, setBusiness] = useState<string>("");
  const [manager, setManager] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [phoneManager, setPhoneManager] = useState<string>("");

  const [errorInput, setErrorInput] = useState<number>(0);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [isModalSuccess, setIsModalSuccess] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const resetData = () => {
    setEmail("");
    setAddress("");
    setBusiness("");
    setManager("");
    setPhone("");
    setPhoneManager("");
    setErrorInput(0);
    setErrorEmail(false);
  };

  const handleSubmit = async () => {
    const checkValidEmail = validateEmail(email);

    if (!checkValidEmail) {
      setErrorEmail(true);
      return;
    }

    const checkValidInput = validRegisterBusiness({
      email,
      address,
      business,
      manager,
      phone,
      phoneManager,
    });

    if (checkValidInput !== 0) {
      setErrorInput(checkValidInput);
      return;
    }

    setLoading(true);

    await saveBusinessDataToFirestore(
      email,
      address,
      business,
      manager,
      phone,
      phoneManager
    );

    setErrorInput(0);
    setErrorEmail(false);
    setIsModalSuccess(true);
    resetData();

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#f26d21"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <h1>Vui lòng chờ trong giây lát...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="register-recruit-container">
        <h3>Doanh nghiệp đăng ký</h3>

        {/* Phần thông tin */}
        <div className="row mb-3">
          <div className="col-12 col-md-6 mobile-pb">
            <Form.Group controlId="email">
              <Form.Label>
                Email liên hệ<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errorInput === 1 || errorEmail ? "is-error" : ""}
              />
              {errorEmail ? (
                <div className="text-danger d-flex error-text">
                  <div className="icon-danger me-2">
                    <CgDanger />
                  </div>
                  <span>Email không hợp lệ</span>
                </div>
              ) : null}
            </Form.Group>
          </div>
          <div className="col-12 col-md-6">
            <Form.Group controlId="address">
              <Form.Label>
                Địa chỉ công ty<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập địa chỉ công ty"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={errorInput === 2 ? "is-error" : ""}
              />
            </Form.Group>
          </div>
        </div>

        {/* Phần thông tin */}
        <div className="row mb-3">
          <div className="col-12 col-md-6 mobile-pb">
            <Form.Group controlId="business">
              <Form.Label>
                Tên doanh nghiệp<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên doanh nghiệp"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                className={errorInput === 3 ? "is-error" : ""}
              />
            </Form.Group>
          </div>
          <div className="col-12 col-md-6">
            <Form.Group controlId="manager">
              <Form.Label>
                Người quản lý<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên người quản lý"
                value={manager}
                onChange={(e) => setManager(e.target.value)}
                className={errorInput === 4 ? "is-error" : ""}
              />
            </Form.Group>
          </div>
        </div>

        {/* Phần thông tin */}
        <div className="row mb-3">
          <div className="col-12 col-md-6 mobile-pb">
            <Form.Group controlId="phone-company">
              <Form.Label>
                Điện thoại công ty<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={errorInput === 5 ? "is-error" : ""}
              />
            </Form.Group>
          </div>
          <div className="col-12 col-md-6">
            <Form.Group controlId="phone-manager">
              <Form.Label>
                Điện thoại người quản lý
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập số điện thoại"
                value={phoneManager}
                onChange={(e) => setPhoneManager(e.target.value)}
                className={errorInput === 6 ? "is-error" : ""}
              />
            </Form.Group>
          </div>
        </div>

        {errorInput !== 0 ? (
          <div className="notice">
            <span className="text-danger">*</span>
            <span> Là những thông tin bắt buộc</span>
          </div>
        ) : null}

        <button className="btn btn-submit" type="button" onClick={handleSubmit}>
          <span>Gửi</span>
          <FiSend className="icon" />
        </button>
      </div>

      <ModalRegisterSuccess show={isModalSuccess} setShow={setIsModalSuccess} />
    </>
  );
}

export default RegisterRecruit;
