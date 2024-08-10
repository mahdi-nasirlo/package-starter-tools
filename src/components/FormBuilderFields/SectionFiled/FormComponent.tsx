import React from 'react';
import { FormElementInstance } from "../../FormsBuilder/DefaultFormElements";
import { Select } from 'antd';


export function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  // const schema = elementInstance as TextFieldInstance;

  return (
    <Select className='' />
  );
}
