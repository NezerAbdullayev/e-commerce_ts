import { FC, useCallback } from "react";
// library
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { Alert, Button, Col, Form, Input, Row } from "antd";
import bgImage from "../../assets/bg-shopping.jpg";

// type
import { LoginResponce } from "../../types/globalTypes";
import { useLoginMutation } from "../../redux/services/userApi";

// shema
const schema = object().shape({
    email: string().required("Email is required").email("Invalid email format"),
    password: string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

const LoginPage: FC = () => {
    // RHF hook
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginResponce>({ resolver: yupResolver(schema) });

    // rtk hooks
    const [login, { isLoading, error }] = useLoginMutation();

    // sumbit
    const onSubmit: SubmitHandler<LoginResponce> = useCallback(
        async (data) => {
            login(data);
        },
        [login]
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
            <Col>
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

                <Form
                    onFinish={handleSubmit(onSubmit)}
                    style={{
                        maxWidth: 600,
                        border: "1px solid #9ac3b945",
                        padding: "30px 20px",
                        borderRadius: "8px",
                        background: "rgb(35 201 213)",
                    }}
                >
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

                    <Form.Item style={{ marginBottom: "0" }}>
                        <Button type="primary" htmlType="submit" disabled={isLoading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default LoginPage;
