import { Form, Input } from "antd";
import { Control, Controller, FieldValues, Path, PathValue } from "react-hook-form";

const { TextArea } = Input;

interface FormTextareaProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    defaultValue?: PathValue<T, Path<T>>;
}

const FormTextarea = <T extends FieldValues>({ name, control, defaultValue }: FormTextareaProps<T>) => {
    return (
        <Form.Item label={name}>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextArea rows={4} onChange={onChange} onBlur={onBlur} value={value} ref={ref} />
                )}
            />
        </Form.Item>
    );
};

export default FormTextarea;
