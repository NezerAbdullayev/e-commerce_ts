import { Form, Input } from "antd";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { FormItem } from "../types/globalTypes";

interface AccountInputProps<T extends FieldValues> {
    formArr: FormItem[];
    control: Control<T>;
    errors: FieldErrors<T>;
}

const AccountInput = <T extends FieldValues>({ formArr, control, errors }: AccountInputProps<T>) => {
    return (
        <>
            {formArr.map((field) => (
                <Form.Item
                    key={field.label}
                    label={field.label.charAt(0).toUpperCase() + field.label.slice(1)}
                    validateStatus={errors[field.label] ? "error" : ""}
                    help={errors[field.label]?.message ? String(errors[field.label]?.message) : null}
                >
                    <Controller
                        name={field.label as keyof T}
                        control={control}
                        render={({ field: { onChange, onBlur, value, ref } }) => {
                            if (field.type === "select") {
                                return (
                                    <select onChange={onChange} onBlur={onBlur} ref={ref} value={value}>
                                        {field.options?.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                );
                            }

                            if (field.type === "file") {
                                return (
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            const file = e.target.files[0]; // İlk faylı əldə edin
                                            onChange(file); // Faylı göndərin
                                        }}
                                        onBlur={onBlur}
                                        ref={ref}
                                        accept="image/*"
                                    />
                                );
                            }

                            return (
                                <Input
                                    type={field.type}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    ref={ref}
                                    autoComplete={field.label}
                                />
                            );
                        }}
                    />
                </Form.Item>
            ))}
        </>
    );
};

export default AccountInput;
