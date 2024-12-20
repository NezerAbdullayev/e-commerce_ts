import { Button, Form, Upload } from "antd";
import { Controller, FieldValues } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import { BaseFormProps } from "./types";

const FormInputFile = <T extends FieldValues>({ name, control, error }: BaseFormProps<T>) => {
    return (
        <Form.Item validateStatus={error ? "error" : ""} help={error ? error.toString() : null}>
            <label className="mb-1 ml-2 block text-start text-sm font-bold text-gray-700">
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Box display={"flex"} justifyContent={"start"}>
                        <Upload
                            multiple
                            accept="image/*"
                            beforeUpload={(file) => {
                                const updatedFileList = [...(value || []), file];
                                onChange(updatedFileList);
                                return false;
                            }}
                            onChange={(info) => {
                                const { fileList } = info;
                                onChange(fileList);
                            }}
                            showUploadList={true}
                            fileList={value}
                        >
                            <Button className="rounded bg-stone-50 p-2">
                                <UploadOutlined /> Download
                            </Button>
                        </Upload>
                    </Box>
                )}
            />
        </Form.Item>
    );
};

export default FormInputFile;
