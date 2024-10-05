import { Form, Select } from "antd";
import { Control, Controller, FieldValues, Path, PathValue } from "react-hook-form";

const { Option } = Select;

interface FormSelectProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    options: { label: string; value: string | number }[];
    multiple?: boolean;
    placeholder?: string;
    defaultValue?: PathValue<T, Path<T>>;
}

const FormSelect = <T extends FieldValues>({ name, control, options, multiple, placeholder, defaultValue }: FormSelectProps<T>) => {
    return (
        // <Form.Item label={name}>
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select
                    style={{ width: "100%" }}
                    mode={multiple ? "multiple" : undefined}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    value={value}
                >
                    {options.map((option) => (
                        <Option key={option.value} value={option.value}>
                            {option.label}
                        </Option>
                    ))}
                </Select>
            )}
        />
        // </Form.Item>
    );
};

export default FormSelect;
