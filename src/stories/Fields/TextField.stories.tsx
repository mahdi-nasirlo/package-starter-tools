import { FormComponent } from "../../components/FormBuilderFields/TextFiled/FormComponent";
import type { StoryObj } from '@storybook/react';


type Story = StoryObj<typeof FormComponent>;

export default {
  title: "Fields/Text Field",
  component: FormComponent,
  parameters: {
    layout: "centered",
  },
  args: {
    elementInstance: {
      label: "test",
      name: "test",
      type: "TextFiled",
      icon: "a-arrow-down",
      id: "test"
    }
  },
} as Story;

export const Primary: Story = {
  args: {
    elementInstance: {
      extraAttributes: { placeholder: "لطفا مقدار را وارد کندی" },
      label: "test",
      name: "test",
      type: "TextFiled",
      icon: "a-arrow-down",
      id: "test"
    }
  },
};
