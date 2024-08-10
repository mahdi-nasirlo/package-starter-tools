import { FormElement, FormElementInstance } from "@/components/FormsBuilder/DefaultFormElements";


const TextField: FormElement = {
    type: "TextFiled",

    construct: ({ id, type, name, icon = "alarm-smoke", label }: FormElementInstance) => ({
        id,
        type,
        name,
        icon,
        label,
        // appearance: {
        //     col_lg: 3,
        //     col_md: 3,
        //     col_xs: 3,
        // },
        // extraAttributes: {
        //     helperText: "",
        //     require: true,
        //     placeholder: _variable.form.placeholder.input,
        // },
    }),

    // designerComponent: DesignerComponent,

    // formComponent: () => <div className="text-white">test componnent</div>,

    // propertiesComponent: PropertiesComponent,

    // propertiesFormValidation: PropertiesComponent.Validation,
};

export default TextField;