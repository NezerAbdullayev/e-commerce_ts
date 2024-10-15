import { Form, Select } from "antd";
import { Control, Controller, FieldValues, Path, PathValue } from "react-hook-form";
import { CategoryResponse } from "../../types/globalTypes";

const { Option } = Select;

interface FormSelectProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    options: CategoryResponse[];
    multiple?: boolean;
    placeholder?: string;
    error?: string;
    defaultValue?: PathValue<T, Path<T>>;
}

const FormSelect = <T extends FieldValues>({
    name,
    control,
    error,
    options,
    multiple,
    placeholder,
    defaultValue,
    ...rest
}: FormSelectProps<T>) => {
    return (
        <Form.Item validateStatus={error ? "error" : ""} help={error ? String(error) : null}>
            <label className="mb-1 ml-2 block text-start text-sm font-bold text-gray-700">
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Select
                        style={{ width: "100%", backgroundColor: "lightyellow" }}
                        mode={multiple ? "multiple" : undefined}
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={ref}
                        value={value}
                        className={`block w-full rounded-md transition-all focus:outline-none ${
                            error ? "border-red-500" : "border-gray-300"
                        }`}
                        {...rest}
                    >
                        {options.map((option) => (
                            <Option key={option._id} value={option._id}>
                                {option.name[0] + option.name.slice(1)}
                            </Option>
                        ))}
                    </Select>
                )}
            />
        </Form.Item>
    );
};

export default FormSelect;
