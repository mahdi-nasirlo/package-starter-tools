import React from 'react';
import { FormElementInstance } from "../../FormsBuilder/DefaultFormElements";
import { Form, Input } from 'antd';


export function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  // const schema = elementInstance as TextFieldInstance;

  return (
    <Input placeholder={elementInstance.extraAttributes?.placeholder} />
  );
}
