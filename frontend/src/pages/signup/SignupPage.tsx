import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Form, Row } from "antd";
import AuthContainer from "../../components/AuthContainer";
import { useSignupMutation } from "../../redux/services/authApi";
import { signupSchema } from "../../validations/authform.validation";
import { useNavigate } from "react-router";
import { ErrorRes, Signup } from "../../redux/services/types/auth.types";
import PageTitle from "../../components/PageTitle";
import FormInput from "../../components/Forms/FormInput";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

// Form layout

const SignupPage: FC = () => {
    const navigate = useNavigate();
    // rhf library
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<Signup>({ resolver: yupResolver(signupSchema) });

    // query hooks
    const [signup, { isLoading }] = useSignupMutation();

    // Submit handler
    const onSubmit = async (data: Signup) => {
        try {
            await signup(data).unwrap();
            navigate("/login");
            toast.success("Signup successful!");
        } catch (error) {
            const typedError = error as ErrorRes;
            toast.error(typedError.error ? typedError.error.error : "Signup failed! Please try again.");
        }
        reset();
    };

    return (
        <AuthContainer>
            <Form onFinish={handleSubmit(onSubmit)} className="w-full">
                <PageTitle className="text-stone-600">Signup</PageTitle>
                <FormInput error={errors.name?.message} name="name" control={control} />
                <FormInput error={errors.email?.message} name="email" control={control} />
                <FormInput error={errors.password?.message} name="password" control={control} />

                <Button type="primary" htmlType="submit" disabled={isLoading} className="mt-3 h-11 w-full">
                    Sign Up
                </Button>
            </Form>

            <Col className="mt-2.5 flex items-center">
                <Row>Already have an account? </Row>
                <Button type="link" danger className="font-bold">
                    <NavLink to="/login" className="text-red-500">
                        Log in now!
                    </NavLink>
                </Button>
            </Col>
        </AuthContainer>
    );
};

export default SignupPage;
