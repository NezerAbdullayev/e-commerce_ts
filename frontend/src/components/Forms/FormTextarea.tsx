import { Form, Input } from "antd";
import { Control, Controller, FieldValues, Path, PathValue } from "react-hook-form";

const { TextArea } = Input;

interface FormTextareaProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    defaultValue?: PathValue<T, Path<T>>;
    error?: string;
}

const FormTextarea = <T extends FieldValues>({ name, control, error, defaultValue }: FormTextareaProps<T>) => {
    return (
        <Form.Item validateStatus={error ? "error" : ""} help={error ? error.toString() : null}>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextArea
                        autoSize={{ minRows: 3, maxRows: 4 }}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder={name}
                        ref={ref}
                        className={`block w-full rounded-md border px-4 transition-all focus:outline-none ${
                            error ? "border-red-500" : "border-gray-300"
                        }`}
                        style={{
                            backgroundColor: "lightyellow",
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
