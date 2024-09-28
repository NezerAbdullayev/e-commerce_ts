import { FC, useCallback } from "react";
// library
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { Alert, Button, Col, Form, Input, Row } from "antd";
import bgImage from "../../assets/bg-shopping.jpg";

// type
import { Signup } from "../../types/globalTypes";
import { useSignupMutation } from "../../redux/services/userApi";

// shema
const schema = object().shape({
    name: string().required("Name is required").min(3, "Name must be at least 3 characters"),
    email: string().required("Email is required").email("Invalid email format"),
    password: string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const SignupPage: FC = () => {
    // RHF hook
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<Signup>({ resolver: yupResolver(schema) });

    // rtk hooks
    const [login, { isLoading, error }] = useSignupMutation();


    console.log(isLoading)

    // sumbit
    const onSubmit: SubmitHandler<Signup> = useCallback(
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
                        style={{ marginBottom: "10px", maxWidth: 600 }}
                        message="Hata"
                        description={"An error occurred during signup. Please check your details and try again."}
                        type="error"
                        showIcon
                        closable
                    />
                )}

                <Form onFinish={handleSubmit(onSubmit)} {...formItemLayout}>
                    <Form.Item label="Name" validateStatus={errors.name ? "error" : ""} help={errors.email?.message}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Name is required" }}
                            render={({ field }) => <Input {...field} autoComplete="name" />}
                        />
                    </Form.Item>

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

export default SignupPage;
