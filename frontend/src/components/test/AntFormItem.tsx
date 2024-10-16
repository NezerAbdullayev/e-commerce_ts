// import { Button, Form, Input, Select, Upload } from "antd";
// import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form";
// import { FormItem } from "../types/globalTypes";
// import { UploadOutlined } from "@ant-design/icons";
// const { TextArea } = Input;

// const { Option } = Select;

// interface AccountInputProps<T extends FieldValues> {
//     formArr: FormItem[];
//     control: Control<T>;
//     errors: FieldErrors<T>;
// }

// const AntFormItem = <T extends FieldValues>({ formArr, control, errors }: AccountInputProps<T>) => {
//     return (
//         <>
//             {formArr.map((field) => (
//                 <Form.Item
//                     key={field.label}
//                     label={field.label.charAt(0).toUpperCase() + field.label.slice(1)}
//                     validateStatus={errors[field.label] ? "error" : ""}
//                     help={errors[field.label]?.message ? String(errors[field.label]?.message) : null}
//                 >
//                     <Controller
//                         name={field.label as Path<T>}
//                         control={control}
//                         render={({ field: { onChange, onBlur, value, ref } }) => {
//                             if (field.type === "select" || field.multiple) {
//                                 return (
//                                     <Select
//                                         onChange={onChange}
//                                         onBlur={onBlur}
//                                         ref={ref}
//                                         value={value}
//                                         style={{ width: "100%" }}
//                                         mode="multiple"
//                                         placeholder={`Select ${field.label}`}
//                                     >
//                                         {field.options?.map((option) => (
//                                             <Option key={option.value} value={option.value}>
//                                                 {option.label}
//                                             </Option>
//                                         ))}
//                                     </Select>
//                                 );
//                             }

//                             if (field.type === "select") {
//                                 return (
//                                     <Select
//                                         onChange={onChange}
//                                         onBlur={onBlur}
//                                         ref={ref}
//                                         value={value}
//                                         style={{ width: "100%" }}
//                                         placeholder={`Select ${field.label}`}
//                                     >
//                                         {field.options?.map((option) => (
//                                             <Option key={option.value} value={option.value}>
//                                                 {option.label}
//                                             </Option>
//                                         ))}
//                                     </Select>
//                                 );
//                             }

//                             if (field.type === "file") {
//                                 return (
//                                     <Upload
//                                         multiple
//                                         accept="image/*"
//                                         beforeUpload={(file) => {
//                                             onChange([...(value || []), file]);
//                                             return false;
//                                         }}
//                                         onChange={(info) => {
//                                             const { fileList } = info;
//                                             onChange(fileList);
//                                         }}
//                                         showUploadList={true}
//                                     >
//                                         <Button>
//                                             <UploadOutlined /> Download
//                                         </Button>
//                                     </Upload>
//                                 );
//                             }

//                             if (field.type === "textarea") {
//                                 return (
//                                     <TextArea
//                                         rows={4}
//                                         placeholder="Description"
//                                         onChange={onChange}
//                                         onBlur={onBlur}
//                                         value={value}
//                                         ref={ref}
//                                     />
//                                 );
//                             }

//                             return (
//                                 <Input
//                                     type={field.type}
//                                     onChange={onChange}
//                                     onBlur={onBlur}
//                                     value={value}
//                                     ref={ref}
//                                     autoComplete={field.label}
//                                 />
//                             );
//                         }}
//                     />
//                 </Form.Item>
//             ))}
//         </>
//     );
// };

// export default AntFormItem;
