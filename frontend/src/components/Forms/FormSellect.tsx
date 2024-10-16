import { Form, Select } from "antd";
import { Controller, FieldValues } from "react-hook-form";
import { SelectProps } from "./types";

const { Option } = Select;

const FormSelect = <T extends FieldValues>({ name, control, error, options, multiple, defaultValue, ...rest }: SelectProps<T>) => {
    return (
        <Form.Item validateStatus={error ? "error" : ""} help={error ? String(error) : null}>
            <label className="mb-1 ml-2 block text-start text-sm font-bold text-gray-700">
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select
                        style={{ width: "100%" }}
                        mode={multiple ? "multiple" : undefined}
                        maxTagCount={1}
                        defaultValue={defaultValue}
                        placeholder={"sellect " + name}
                        className={`placeholder-left block h-[48px] w-full rounded-[16px] transition-all focus:outline-none ${
                            error ? "border-red-500" : "border-gray-300"
                        }`}
                        {...field}
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
