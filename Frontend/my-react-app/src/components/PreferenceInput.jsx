import { useState } from "react";

export default function PreferenceInput({ onSubmit }) {
  const [value, setValue] = useState("");

  return (
    <div style={{ margin: "20px 0" }}>
      <input
        placeholder="e.g. I want a phone under $500"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />
      <button
        onClick={() => onSubmit(value)}
        style={{ marginTop: "10px", padding: "10px", width: "100%" }}
      >
        Get Recommendations
      </button>
    </div>
  );
}
