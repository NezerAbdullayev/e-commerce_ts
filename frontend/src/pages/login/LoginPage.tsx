import { FC, useCallback } from "react";
// library
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { Alert, Button, Col, Form, Row } from "antd";

// type
import { Login } from "../../types/globalTypes";
import { useLoginMutation } from "../../redux/services/userApi";
import { NavLink } from "react-router-dom";
import AccountInput from "../../components/AccountInput";
import { formItemLayout } from "../../utils/formLayoutsize";
import AuthContainer from "../../components/AuthContainer";

// shema
const schema = object().shape({
    email: string().required("Email is required").email("Invalid email format"),
    password: string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

const formArr: Array<keyof Login> = ["email", "password"];

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
        <AuthContainer>
            {error && (
                <Alert
                    style={{ marginBottom: "10px" }}
                    message="Error"
                    description={"Invalid Email or Password"}
                    type="error"
                    showIcon
                    closable
                />
            )}

            <Form onFinish={handleSubmit(onSubmit)} {...formItemLayout}>
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
        </AuthContainer>
    );
};

export default LoginPage;
