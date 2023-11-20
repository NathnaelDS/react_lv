import React, { useState } from "react";

export function MyComponent(props) {
  const { pushEvent, pushEventTo, handleEvent } = props;

  const [score, setScore] = useState({ user: "josé", points: 0 });

  function handleClick() {
    pushEvent("react_button_click");
    // pushEvent("myevent", { var: "value" });
    // pushEventTo("#component-1", "do_something");
  }

  if (handleEvent) {
    handleEvent("scores", (payload) =>
      setScore({ user: payload.user, points: payload.points })
    );
  }

  return (
    <div className="border-2 border-blue-500 p-4 mt-4">
      <p className="text-xs italic text-blue-500 pb-4">React</p>
      <div>
        <h1 className="text-2xl">✨✨✨ My React Component ✨✨✨</h1>
        <button className="border-2 px-2" onClick={handleClick}>
          Send event to Liveview
        </button>
      </div>

      <div className="border mt-10 p-4">
        <p className="pb-4">
          <i>React getting its values from liveview</i>
        </p>
        <h1>Scores</h1>
        <p>User: {score.user}</p>
        <p>Points: {score.points}</p>
      </div>
    </div>
  );
}
