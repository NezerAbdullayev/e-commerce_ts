import { Form, Input } from "antd";
import { Controller, FieldValues } from "react-hook-form";
import { BaseFormProps } from "./types";

const { TextArea } = Input;

const FormTextarea = <T extends FieldValues>({ name, control, error, defaultValue }: BaseFormProps<T>) => {
    return (
        <Form.Item validateStatus={error ? "error" : ""} help={error ? error.toString() : null}>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <TextArea
                        autoSize={{ minRows: 4, maxRows: 4 }}
                        placeholder={name}
                        {...field}
                        className={`block w-full rounded-md border px-4 transition-all focus:outline-none ${
                            error ? "border-red-500" : "border-gray-300"
                        }`}
                        style={{
                            borderRadius: "8px",
                            padding: "12px",
                        }}
                    />
                )}
            />
        </Form.Item>
    );
};

export default FormTextarea;
