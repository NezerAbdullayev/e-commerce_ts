import { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { ReactNode } from "react";
import { CategoryResponse } from "../../globalTypes/globalTypes";

export interface BaseFormProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    defaultValue?: PathValue<T, Path<T>>;
    error?: string;
}

export interface InputProps<T extends FieldValues> extends BaseFormProps<T> {
    type?: string;
    icon?: ReactNode;
}

export interface SelectProps<T extends FieldValues> extends BaseFormProps<T> {
    options: CategoryResponse[];
    multiple?: boolean;
}
