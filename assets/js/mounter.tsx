import React from "react";
import { Root, createRoot } from "react-dom/client";
// import { render, unmountComponentAtNode } from "react-dom";

import { Greeter, GreeterProps } from "./greeter";

export function update_mount(mountRoot: Root, opts: GreeterProps) {
  mountRoot.render(
    <React.StrictMode>
      <Greeter {...opts} />
    </React.StrictMode>
  );
}

export function mount(id: string, opts: GreeterProps) {
  const rootElement = document.getElementById(id);

  const root = createRoot(rootElement!); // createRoot(container!) if you use TypeScript
  root.render(
    <React.StrictMode>
      <Greeter {...opts} />
    </React.StrictMode>
  );

  return { root, unmount: (el: Element) => root.unmount() };
}
