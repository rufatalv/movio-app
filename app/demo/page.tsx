"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DemoPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col mt-5 p-5 gap-6">
      My content
      <Button className="w-fit" onClick={() => setIsOpen(!isOpen)}>
        Show content
      </Button>
      {isOpen && <div>This is my hidden content</div>}
    </div>
  );
}
