import * as React from "react";
import {FormInstance} from "./interface.ts";
import Field from "./Field.tsx";
import List from "./List.tsx";
import useForm from "./useForm.ts";
import FieldForm, {FormProps} from "./Form.tsx";
import {FormProvider} from "./FormContext.tsx";

const InternalForm = React.forwardRef<FormInstance, FormProps>(FieldForm);

type InternalForm = typeof InternalForm;
interface RefForm extends InternalForm {
  FormProvider: typeof FormProvider;
  Field: typeof Field;
  List: typeof List;
  useForm: typeof useForm;
}

const RefForm: RefForm = InternalForm as RefForm;

RefForm.FormProvider = FormProvider;
RefForm.Field = Field;
RefForm.List = List;
RefForm.useForm = useForm;

export {FormInstance, Field, List, useForm, FormProvider};

export default RefForm;
