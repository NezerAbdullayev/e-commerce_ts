import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Form } from "antd";
import { FormItem, Signup } from "../../types/globalTypes";
import AntFormItem from "../../components/AntFormItem";
import AuthContainer from "../../components/AuthContainer";
// api
import { useSignupMutation } from "../../redux/services/userApi";
import { formItemLayout } from "../../utils/formLayoutsize";
import { signupSchema } from "../../validations/authform.validation";
import { useNavigate } from "react-router";

// const formArr: Array<keyof Signup> = ["name", "email", "password"];
const formArr: FormItem[] = [
    { label: "name", type: "text" },
    { label: "email", type: "email" },
    { label: "password", type: "password" },
];

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
    const [signup, { isLoading, error }] = useSignupMutation();

    // Submit handler
    const onSubmit = useCallback(
        async (data: Signup) => {
            try {
                await signup(data);
                navigate("/login");
                console.log("basarili signup")
            } catch (error) {
                console.log(error);
            }
            reset();
        },
        [signup, reset, navigate],
    );

    return (
        <AuthContainer>
            {error && <Alert message="Error" description="An error occurred. Please try again." type="error" closable />}

            <Form onFinish={handleSubmit(onSubmit)} {...formItemLayout}>
                {/* inputs */}
                <AntFormItem formArr={formArr} control={control} errors={errors} />

                <Form.Item style={{ marginBottom: "0" }}>
                    <Button type="primary" htmlType="submit" disabled={isLoading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </AuthContainer>
    );
};

export default SignupPage;
