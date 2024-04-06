import { useCallback, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FormControl,
  FormGroup,
  FormCheck,
  FormLabel,
} from "react-bootstrap";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginAPI } from "../../utils/apiRequests";
import ParticlesBackground from "../ParticlesBackground";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = values;
    if (!email.trim() || !password.trim()) {
      console.log("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(loginAPI, {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        console.log("Failed to login");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <ParticlesBackground />
      <Container className="mt-5" style={{ position: "relative", zIndex: 2 }}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h2 className="text-white text-center">
              <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "white" }} />
              Login
            </h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup controlId="formBasicEmail" className="mt-3">
                <FormLabel className="text-white">Email address</FormLabel>
                <FormControl
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
              </FormGroup>

              <FormGroup controlId="formBasicPassword" className="mt-3">
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                />
              </FormGroup>

              <div className="mt-4 d-flex justify-content-between">
                <FormCheck
                  type="checkbox"
                  id="rememberMeCheckbox"
                  className="text-white"
                  label="Remember me"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <Link to="/forgotPassword" className="text-white">
                  Forgot Password?
                </Link>
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  className="mt-3 btnStyle "
                  disabled={loading}
                >
                  {loading ? "Signing in…" : "Login"}
                </Button>
              </div>

              <p className="mt-3 text-center" style={{ color: "#9d9494" }}>
                Don't Have an Account?
                <Link to="/register" className="text-white">
                  Register
                </Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
