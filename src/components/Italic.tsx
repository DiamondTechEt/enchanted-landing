import React from "react";

export function Italic({ children }: { children: React.ReactNode }) {
  return <span className="font-serif italic font-normal text-muted-sage">{children}</span>;
}
