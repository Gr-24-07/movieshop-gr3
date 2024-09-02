"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function EditButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Save Changes
    </Button>
  );
}
