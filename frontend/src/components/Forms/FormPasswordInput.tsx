import { Form, Input } from "antd";
import { Controller, FieldValues } from "react-hook-form";
import { BaseFormProps } from "./types";

const FormPasswordInput = <T extends FieldValues>({ name, control, error, defaultValue, ...rest }: BaseFormProps<T>) => {
    return (
        <Form.Item
            className="mb-4 w-full"
            validateStatus={error ? "error" : ""}
            style={{ width: "100%" }}
            help={error ? <span className="text-xs italic text-red-500">{error}</span> : null}
        >
            <label className="ml-2 block text-start text-sm font-bold text-gray-700">{name.charAt(0).toUpperCase() + name.slice(1)}</label>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Input.Password
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        placeholder={name}
                        className={`w-full rounded-md border px-4 transition-all focus:outline-none ${
                            error ? "border-red-500" : "border-gray-300"
                        }`}
                        style={{
                            borderRadius: "8px",
                            padding: "12px",
                            width: "100%",
                        }}
                        autoComplete="off"
                        {...rest}
                    />
                )}
            />
        </Form.Item>
    );
};

export default FormPasswordInput;
