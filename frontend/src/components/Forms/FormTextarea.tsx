import { Form, Input } from "antd";
import { Control, Controller, FieldErrors, FieldValues, Path, PathValue } from "react-hook-form";

const { TextArea } = Input;

interface FormTextareaProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    defaultValue?: PathValue<T, Path<T>>;
    errors: FieldErrors<T>;
}

const FormTextarea = <T extends FieldValues>({ name, control, errors, defaultValue }: FormTextareaProps<T>) => {
    return (
        <Form.Item
            label={name.charAt(0).toUpperCase() + name.slice(1)}
            validateStatus={errors[name] ? "error" : ""}
            help={errors[name]?.message ? String(errors[name]?.message) : null}
        >
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
                        ref={ref}
                        className="rounded bg-stone-50 p-2 hover:bg-stone-50"
                    />
                )}
            />
        </Form.Item>
    );
};

export default FormTextarea;
