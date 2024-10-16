import { FC } from "react";

// components
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Form, Row } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContainer from "../../components/AuthContainer";
import FormInput from "../../components/Forms/FormInput";
import { ErrorRes, Login } from "../../redux/services/types/auth.types";
import FormPasswordInput from "../../components/Forms/FormPasswordInput";
import PageTitle from "../../components/PageTitle";
import { toast } from "react-toastify";

// api
import { useLoginMutation } from "../../redux/services/authApi";
// schema
import { loginSchema } from "../../validations/authform.validation";
import { MdEmail } from "react-icons/md";

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
    const [login, { isLoading }] = useLoginMutation();

    // submit
    const onSubmit: SubmitHandler<Login> = async (data) => {
        try {
            const res = await login(data).unwrap();
            if (res?.role === "admin") {
                navigate("/admin");
            } else if (res?.role === "customer") {
                navigate("/");
            }
        } catch (error) {
            const typedError = error as ErrorRes;
            toast.error(typedError.error ? typedError.error.error : "An unexpected error occurred.");
        }

        reset();
    };

    return (
        <>
            <AuthContainer>
                <Form onFinish={handleSubmit(onSubmit)} className="w-full">
                    <PageTitle className="text-stone-600">Login</PageTitle>

                    <FormInput error={errors.email?.message} name="email" control={control} icon={<MdEmail />} />
                    <FormPasswordInput error={errors.password?.message} name="password" control={control} />
                    <Button type="primary" htmlType="submit" disabled={isLoading} className="mt-3 h-11 w-full">
                        Login
                    </Button>
                </Form>
                <Col className="mt-2.5 flex items-center">
                    <Row>Don't have an account? </Row>
                    <Button type="link" danger className="font-bold">
                        <NavLink to="/signup" className="text-red-500">
                            Sign up now!
                        </NavLink>
                    </Button>
                </Col>
            </AuthContainer>
        </>
    );
};

export default LoginPage;
