import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Form } from "antd";
import { Signup } from "../../types/globalTypes";
import AccountInput from "../../components/AccountInput";
import AuthContainer from "../../components/AuthContainer";
// api
import { useSignupMutation } from "../../redux/services/userApi";
import { formItemLayout } from "../../utils/formLayoutsize";
import { signupSchema } from "../../validations/authform.validation";

const formArr: Array<keyof Signup> = ["name", "email", "password"];

// Form layout

const SignupPage: FC = () => {
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
            await signup(data);
            reset();
        },
        [signup, reset]
    );

    return (
        <AuthContainer>
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
        </AuthContainer>
    );
};

export default SignupPage;
