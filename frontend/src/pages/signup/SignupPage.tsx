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
import { FaRegUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import FormPasswordInput from "../../components/Forms/FormPasswordInput";
import { useTranslation } from "react-i18next";

// Form layout

const SignupPage: FC = () => {
    const { t } = useTranslation();
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
            const res = await signup(data).unwrap();
            if (res._id) {
                navigate("/login");
                toast.success(t("signupSuccessful"));
            }
        } catch (error) {
            const typedError = error as ErrorRes;
            toast.error(typedError.error ? typedError.error.error : t("signupFailed"));
        }
        reset();
    };

    return (
        <AuthContainer>
            <Form onFinish={handleSubmit(onSubmit)} className="w-full">
                <PageTitle className="text-stone-600">{t("signup")}</PageTitle>
                <FormInput error={errors.name?.message} name="name" control={control} icon={<FaRegUser />} />
                <FormInput error={errors.email?.message} name="email" control={control} icon={<MdEmail />} />
                <FormPasswordInput error={errors.password?.message} name="password" control={control} />

                <Button type="primary" htmlType="submit" disabled={isLoading} className="mt-3 h-11 w-full">
                    {t("signUp")}
                </Button>
            </Form>

            <Col className="mt-2.5 flex items-center">
                <Row>{t("alreadyHaveAccount")}</Row>
                <Button type="link" danger className="font-bold">
                    <NavLink to="/login" className="text-red-500">
                        {t("logInNow")}
                    </NavLink>
                </Button>
            </Col>
        </AuthContainer>
    );
};

export default SignupPage;
