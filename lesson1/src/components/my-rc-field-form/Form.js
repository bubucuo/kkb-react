import FieldContext from "./FieldContext";
import useForm from "./useForm";

export default function Form({children, form, onFinish, onFinishFailed}) {
  const [formInstance] = useForm();
  return (
    <form
      onClick={e => {
        e.preventDefault();
        console.log("submit");
      }}>
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
}
