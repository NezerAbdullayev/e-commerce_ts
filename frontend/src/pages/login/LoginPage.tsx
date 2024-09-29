import { FC, useCallback } from "react";
// library
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { Alert, Button, Col, Form, Input, Row } from "antd";
import bgImage from "../../assets/bg-shopping.jpg";

// type
import { Login } from "../../types/globalTypes";
import { useLoginMutation } from "../../redux/services/userApi";
import { NavLink } from "react-router-dom";
import AccountInput from "../../components/AccountInput";
import { formItemLayout } from "../../utils/formLayoutsize";

// shema
const schema = object().shape({
    email: string().required("Email is required").email("Invalid email format"),
    password: string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

const formArr:Array<keyof Login>  = ["email", "password"];

const LoginPage: FC = () => {
    // RHF hook
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<Login>({ resolver: yupResolver(schema) });

    // rtk hooks
    const [login, { isLoading, error }] = useLoginMutation();

    // sumbit
    const onSubmit: SubmitHandler<Login> = useCallback(
        async (data) => {
            login(data);
            reset();
        },
        [login, reset]
    );

    return (
        <Row
            justify="center"
            align="middle"
            style={{
                height: "100vh",
                backgroundImage: `url(${bgImage})`,
            }}
        >
            <Col
                style={{
                    maxWidth: 600,
                    border: "2px solid #4f696339",
                    padding: "30px 20px",
                    borderRadius: "8px",
                    background: "#ffffff",
                }}
            >
                {error && (
                    <Alert
                        style={{ marginBottom: "10px" }}
                        message="Hata"
                        description={"Invalid Email or Password"}
                        type="error"
                        showIcon
                        closable
                    />
                )}

                <Form onFinish={handleSubmit(onSubmit)} {...formItemLayout}>
                    <Form.Item label="Email" validateStatus={errors.email ? "error" : ""} help={errors.email?.message}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: "Email is required" }}
                            render={({ field }) => <Input {...field} autoComplete="email" />}
                        />
                    </Form.Item>

                    <Form.Item label="Password" validateStatus={errors.password ? "error" : ""} help={errors.password?.message}>
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: "Password is required", minLength: { value: 6, message: "Minimum length is 6" } }}
                            render={({ field }) => <Input.Password {...field} autoComplete="current-password" />}
                        />
                    </Form.Item>
                    {/* inputs */}
                    <AccountInput formArr={formArr} control={control} errors={errors} />

                    <Form.Item style={{ marginBottom: "0" }}>
                        <Button type="primary" htmlType="submit" disabled={isLoading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <Col style={{ marginTop: "10px" }}>
                    <Row>Don't have an account? </Row>
                    <Button type="link" danger>
                        Sign up now!
                    </Button>
                </Col>

                <NavLink to={"/admin"}>admin</NavLink>
            </Col>
        </Row>
    );
};

export default LoginPage;
