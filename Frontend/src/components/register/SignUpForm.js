import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerAPI } from "../../utils/apiRequests";
import ParticlesBackground from "../ParticlesBackground";

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const [values, setValues] = useState({
    name: "",
    DOB: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
  };

  const validatePassword = (password) => {
    if (password === "") {
      setError("");
      return false;
    }
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const isValid = regex.test(password);
    setError(
      isValid
        ? "Correct Password"
        : "Please provide password contain at least one letter, one number, and one special character, with a minimum of 8 characters"
    );
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, DOB, email, password } = values;
    if (!name.trim() || !DOB.trim() || !email.trim() || !password.trim()) {
      console.log("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(registerAPI, {
        name,
        DOB,
        email,
        password,
      });

      if (data && data.success) {
        console.log("Successfully registered");
        navigate("/login");
      } else {
        console.log("Failed to register");
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <ParticlesBackground />

        <Container className="mt-5" style={{ position: "relative", zIndex: 2 }}>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <h2 className="text-white text-center mt-5">
                <AccountBalanceWalletIcon
                  sx={{ fontSize: 40, color: "white" }}
                />
                Registration
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName" className="mt-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mt-3" controlId="formDOB">
                  <Form.Label>Date of birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="DOB"
                    value={values.DOB}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="mt-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <Form.Text
                    className={
                      error
                        ? error === "Correct Password"
                          ? "text-success"
                          : "text-danger"
                        : "text-warning"
                    }
                  >
                    {error ||
                      "Password must contain at least one letter, one number, and one special character (minimum 8 characters require)."}
                  </Form.Text>
                </Form.Group>
                <div className="text-center">
                  <Button
                    type="submit"
                    className="mt-3 btnStyle"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Signup"}
                  </Button>
                </div>
                <p className="mt-3 text-center" style={{ color: "#9d9494" }}>
                  Already have an account?
                  <Link to="/login" className="text-white">
                    Login
                  </Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SignUpForm;
