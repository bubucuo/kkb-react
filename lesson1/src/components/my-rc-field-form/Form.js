import FieldContext from "./Context";
import useForm from "./useForm";

export default function Form({children}) {
  const [formInstance] = useForm();

  return (
    <FieldContext.Provider value={formInstance}>
      {children}
    </FieldContext.Provider>
  );
}
