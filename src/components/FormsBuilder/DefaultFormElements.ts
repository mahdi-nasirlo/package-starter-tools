import dynamicIconImports from "lucide-react/dynamicIconImports";
import TextField from "../FormBuilderFields/TextFiled";

type ElementsType = "TextFiled" | "SectionFiled";
//   | "RadioBtnField"
// | "CheckBoxField"
//   | "RadioCardField"
//   | "SelectField";

type columnSize = 1 | 2 | 3 | 4 | 5 | 6;

type FormElementInstance = {
  id: string;
  type: ElementsType;
  label: string;
  name?: string;
  icon?: keyof typeof dynamicIconImports;
  appearance?: {
    col_xs: columnSize;
    col_md: columnSize;
    col_lg: columnSize;
  };
  extraAttributes?: any;
};

type FormElement = {
  type: ElementsType;

  construct: (arg: FormElementInstance) => FormElementInstance;
};

type FormElementType = {
  [key in ElementsType]: any;
};

export const DefaultFormElements: FormElementType = {
  TextFiled: TextField,
  SectionFiled: TextField,
};

export type { FormElement, FormElementInstance };
