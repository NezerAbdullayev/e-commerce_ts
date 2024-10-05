import { Button, Form, Upload } from "antd";
import { Control, Controller, FieldValues, Path, PathValue } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";

interface FormInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    defaultValue?: PathValue<T, Path<T>>;
}

const FormInputFile = <T extends FieldValues>({ name, control, defaultValue }: FormInputProps<T>) => {
    return (
        <Form.Item label={name}>
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
                        <Button>
                            <UploadOutlined /> download
                        </Button>
                    </Upload>
                )}
            />
        </Form.Item>
    );
};

export default FormInputFile;
