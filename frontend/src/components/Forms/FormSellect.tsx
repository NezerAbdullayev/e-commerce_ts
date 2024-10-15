import { Form, Select } from "antd";
import { Control, Controller, FieldValues, Path, PathValue } from "react-hook-form";
import { CategoryResponse } from "../../types/globalTypes";

const { Option } = Select;

interface FormSelectProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    options: CategoryResponse[];
    multiple?: boolean;
    error?: string;
    defaultValue?: PathValue<T, Path<T>>;
}

const FormSelect = <T extends FieldValues>({ name, control, error, options, multiple, defaultValue, ...rest }: FormSelectProps<T>) => {
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
                        style={{ width: "100%" }}
                        mode={multiple ? "multiple" : undefined}
                        maxTagCount={1}
                        defaultValue={defaultValue}
                        placeholder={"sellect " + name}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={ref}
                        value={value}
                        className={`placeholder-left block h-[48px] w-full rounded-[16px] transition-all focus:outline-none ${
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
