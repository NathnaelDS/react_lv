import React from "react";
const { useState } = React;

export interface GreeterProps {
  name: string;
  count: number;
  updateCount(newCount: number): any;
}

const Button = ({ increment, onClickFunction }) => {
  const handleClick = () => {
    onClickFunction(increment);
  };
  return <button onClick={handleClick}>+{increment}</button>;
};

export const Greeter: React.FC<GreeterProps> = (props: GreeterProps) => {
  const { name, updateCount } = props;
  const count = props.count || 0;

  const [localCount, setLocalCount] = useState(0);

  const incrementCount = (increment) => {
    updateCount(count + increment);
  };

  const incrementLocalCount = (increment) => {
    setLocalCount(localCount + increment);
  };

  return (
    <section className="phx-hero">
      <h1>Welcome to {name} with TypeScript and React!</h1>

      <Button increment={1} onClickFunction={incrementCount} />
      <br />
      <span>{count}</span>
      <br />

      <hr />

      <Button increment={1} onClickFunction={incrementLocalCount} />
      <br />
      <span>{localCount}</span>
    </section>
  );
};
