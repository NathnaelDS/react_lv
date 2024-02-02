import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  NodeProps,
  Handle,
  BackgroundVariant,
  Position,
} from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "1" },
    type: "TEXT_MESSAGE",
  },
  {
    id: "2",
    position: { x: 0, y: 400 },
    data: { label: "2" },
    type: "TEXT_MESSAGE",
  },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export const TextNode = ({ id, data }: NodeProps) => {
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <div
        style={{
          background: "white",
          borderRadius: "4px",
          border: "1px solid grey",
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          width: 280,
        }}
      >
        <div
          style={{
            padding: "12px 8px",
            background: "lightgreen",
            fontWeight: "bold",
          }}
        >
          Card ID: {id}
        </div>
        <hr style={{ margin: 0, borderTop: "3px double #333" }} />
        <div style={{ padding: "8px" }}>
          <p>Count: {data.count}</p>
          <button
            style={{
              background: "lightyellow",
              border: "1px solid lavender",
              padding: "4px 12px",
              fontSize: 16,
              cursor: "pointer",
            }}
            onClick={() => data?.updateCount(data?.count + 1)}
          >
            Action
          </button>
        </div>
      </div>
    </div>
  );
};

const nodeTypes = {
  TEXT_MESSAGE: TextNode,
};

export const MyReactApp: React.FC<MyReactAppProps> = (
  props: MyReactAppProps
) => {
  const { count, name, updateCount, pushEvent, pushEventTo, handleEvent } =
    props;

  // console.log(pushEvent);

  if (handleEvent) {
    handleEvent("my_event", (payload) => console.log("Happy: ", payload));
  }

  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        count,
        updateCount: (newCount) => {
          pushEvent({ new_count: newCount });
          setNodes((nodes) =>
            nodes.map((node) => ({
              ...node,
              data: { ...node.data, count: newCount },
            }))
          );
        },
      },
    }))
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // useEffect(() => {
  //   setNodes(nodes => nodes.map)
  // }, [count]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "90vw", height: "100vh", border: "1px solid red" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export interface MyReactAppProps {
  name: string;
  count: number;
  updateCount(newCount: number): any;
  pushEventTo: (event, payload) => any;
  pushEvent: (payload) => any;
  handleEvent: (event, callback) => any;
}

// const Button = ({ increment, onClickFunction }) => {
//   const handleClick = () => {
//     onClickFunction(increment);
//   };
//   return <button onClick={handleClick}>+{increment}</button>;
// };
