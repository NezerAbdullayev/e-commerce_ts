import { Button, Form, Upload } from "antd";
import { Control, Controller, FieldErrors, FieldValues, Path, PathValue } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";

interface FormInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    errors: FieldErrors<T>;
    defaultValue?: PathValue<T, Path<T>>;
}

const FormInputFile = <T extends FieldValues>({ name, control, defaultValue, errors }: FormInputProps<T>) => {
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
                render={({ field: { onChange, value } }) => (
                    <Upload
                        multiple
                        accept="image/*"
                        beforeUpload={(file) => {
                            onChange([...(value || []), file]);
                            return false;
                        }}
                        onChange={(info) => {
                            const { fileList } = info;
                            onChange(fileList);
                        }}
                        showUploadList={true}
                    >
                        <Button className="rounded bg-stone-50 p-2">
                            <UploadOutlined /> Download
                        </Button>
                    </Upload>
                )}
            />
        </Form.Item>
    );
};

export default FormInputFile;
