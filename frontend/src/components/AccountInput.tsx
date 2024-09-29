import { Form, Input } from "antd";
import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form";

interface AccountInputProps<T extends FieldValues> {
    formArr: Path<T>[];
    control: Control<T>;
    errors: FieldErrors<T>;
}

const AccountInput = <T extends FieldValues>({ formArr, control, errors }: AccountInputProps<T>) => {
    return (
        <>
            {formArr.map((field) => (
                <Form.Item
                    key={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    validateStatus={errors[field] ? "error" : ""}
                    help={errors[field]?.message ? String(errors[field]?.message) : null}
                >
                    <Controller
                        name={field}
                        control={control}
                        render={({ field: { onChange, onBlur, value, ref } }) =>
                            field === "password" ? (
                                <Input.Password
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    ref={ref}
                                    autoComplete="current-password"
                                />
                            ) : (
                                <Input onChange={onChange} onBlur={onBlur} value={value} ref={ref} autoComplete={field} />
                            )
                        }
                    />
                </Form.Item>
            ))}
        </>
    );
};

export default AccountInput;
