import { FC, useCallback } from "react";
// components
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Col, Form, Row } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import AntFormItem from "../../components/AntFormItem";
import AuthContainer from "../../components/AuthContainer";
import { formItemLayout } from "../../utils/formLayoutsize";
// api
import { useLoginMutation } from "../../redux/services/userApi";
// type
import { FormItem, Login } from "../../types/globalTypes";
import { loginSchema } from "../../validations/authform.validation";

const formArr: FormItem[] = [
    { label: "email", type: "email" },
    { label: "password", type: "password" },
];

const LoginPage: FC = () => {
    const navigate = useNavigate();
    // RHF hook
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<Login>({ resolver: yupResolver(loginSchema) });

    // rtk hooks
    const [login, { isLoading, error }] = useLoginMutation();

    // submit
    const onSubmit: SubmitHandler<Login> = useCallback(
        async (data) => {
            const res = await login(data);
            console.log(res?.data);
            if (res?.data?.role === "admin") {
                navigate("/admin");
            } else if (res?.data?.role === "customer") {
                console.log("22", res.data.role);
                navigate("/");
            }
            reset();
        },
        [login, reset, navigate]
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
                <AntFormItem formArr={formArr} control={control} errors={errors} />

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
