import React from "react";
import { Root, createRoot } from "react-dom/client";
// import { render, unmountComponentAtNode } from "react-dom";

import { MyReactApp, MyReactAppProps } from "./MyReactApp";

export function update_mount(mountRoot: Root, opts: MyReactAppProps) {
  mountRoot.render(
    <React.StrictMode>
      <MyReactApp {...opts} />
    </React.StrictMode>
  );
}

export function mount(id: string, opts: MyReactAppProps) {
  const rootElement = document.getElementById(id);

  const root = createRoot(rootElement!); // createRoot(container!) if you use TypeScript
  root.render(
    <React.StrictMode>
      <MyReactApp {...opts} />
    </React.StrictMode>
  );

  return { root, unmount: (el: Element) => root.unmount() };
}
