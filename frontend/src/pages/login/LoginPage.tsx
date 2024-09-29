import { FC, useCallback } from "react";
// components
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Col, Form, Row } from "antd";
import { NavLink } from "react-router-dom";
import AccountInput from "../../components/AccountInput";
import AuthContainer from "../../components/AuthContainer";
import { formItemLayout } from "../../utils/formLayoutsize";

// api
import { useLoginMutation } from "../../redux/services/userApi";
// type
import { Login } from "../../types/globalTypes";
import { loginSchema } from "../../validations/authform.validation";

const formArr: Array<keyof Login> = ["email", "password"];

const LoginPage: FC = () => {
    // RHF hook
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<Login>({ resolver: yupResolver(loginSchema) });

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
