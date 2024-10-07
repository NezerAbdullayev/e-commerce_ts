import { Form, Input } from "antd";
import { Control, Controller, FieldErrors, FieldValues, Path, PathValue } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    defaultValue?: PathValue<T, Path<T>>;
    errors: FieldErrors<T>;
    type?: string;
}

const FormInput = <T extends FieldValues>({ name, control, errors, defaultValue, type = "text", ...rest }: FormInputProps<T>) => {
    return (
        <Form.Item
            label={name.charAt(0).toUpperCase() + name.slice(1)}
            validateStatus={errors[name] ? "error" : ""}
            help={errors[name]?.message ? (errors[name]?.message as string) : null}
        >
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Input
                        type={type}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        className="rounded bg-stone-50 p-2 hover:bg-stone-50"
                        {...rest}
                    />
                )}
            />
        </Form.Item>
    );
};
export default FormInput;
