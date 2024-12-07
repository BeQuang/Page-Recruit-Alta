import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function LoginForm() {
  return (
    <div className="container-login-form">
      <h3 className="mb-3 title">Đăng nhập</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            Vai trò<span className="text-danger">*</span>
          </Form.Label>
          <Form.Select className="custom-select">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            Email<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control type="email" placeholder="Tên đăng nhập" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Mật khẩu<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control type="password" placeholder="Nhập mật khẩu" />
        </Form.Group>

        <Form.Group
          className="mb-3 d-flex justify-content-between"
          controlId="formBasicCheckbox"
        >
          <Form.Check type="checkbox" label="Ghi nhớ mật khẩu" />
          <span className="forgot-pass">Quên mật khẩu?</span>
        </Form.Group>

        <Button variant="primary" type="submit" className="btn-login">
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
