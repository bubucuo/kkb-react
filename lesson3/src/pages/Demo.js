import {useMemo, useState} from "react";

export default function Demo(props) {
  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState(0);

  const expensive = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < count; i++) {
      sum += i;
    }

    console.log("sum", sum); //sy-log
    return sum;
  }, [count]);

  return (
    <div>
      <h3>Demo</h3>
      <h1>{expensive}</h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}>
        {count}
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
    </div>
  );
}
