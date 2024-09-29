import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { Alert, Button, Col, Form, Row } from "antd";
import bgImage from "../../assets/bg-shopping.jpg";
import { Signup } from "../../types/globalTypes";
import { useSignupMutation } from "../../redux/services/userApi";
import AccountInput from "../../components/AccountInput";

const formArr: Array<keyof Signup> = ["name", "email", "password"];

// Validation schema
const schema = object().shape({
    name: string().required("Name is required").min(3, "Minimum 3 characters"),
    email: string().required("Email is required").email("Invalid email"),
    password: string().required("Password is required").min(6, "Minimum 6 characters"),
});

// Form layout
const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
};

const SignupPage: FC = () => {
    // rhf library
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<Signup>({ resolver: yupResolver(schema) });

    // query hooks
    const [signup, { isLoading, error }] = useSignupMutation();

    // Submit handler
    const onSubmit = useCallback(
        async (data: Signup) => {
            await signup(data);
            reset();
        },
        [signup, reset]
    );

    return (
        <Row justify="center" align="middle" style={{ height: "100vh", backgroundImage: `url(${bgImage})` }}>
            <Col style={{ maxWidth: 600, border: "2px solid #4f696339", padding: "30px 20px", borderRadius: "8px", background: "#ffffff" }}>
                {/* error handle */}
                {error && <Alert message="Error" description="An error occurred. Please try again." type="error" closable />}

                <Form onFinish={handleSubmit(onSubmit)} {...formItemLayout}>
                    {/* inputs */}
                    <AccountInput formArr={formArr} control={control} errors={errors} />

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
