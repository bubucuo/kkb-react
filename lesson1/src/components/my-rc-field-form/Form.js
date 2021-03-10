import {useImperativeHandle} from "react";
import FieldContext from "./Context";
import useForm from "./useForm";

export default function Form({form, children, onFinish, onFinishFailed}, ref) {
  const [formInstance] = useForm(form);

  useImperativeHandle(ref, () => formInstance);
  formInstance.setCallbacks({
    onFinish,
    onFinishFailed,
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formInstance.submit();
      }}>
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
}
