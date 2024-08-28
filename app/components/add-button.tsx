"use client";

import { useFormStatus } from "react-dom";

export default function AddButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      type="submit"
      disabled={pending}
    >
      {pending ? "Adding..." : "Add Movie"}
    </button>
  );
}

