import { useState } from "react";
import json from "./data.json";
import { FaFolderOpen, FaFolderPlus } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import Style from "./FileExplorer.module.css";

const List = ({ list }) => {
  const [isExpanded, setIsExpanded] = useState({});

  return (
    <>
      {list?.map((node) => (
        <div
          key={node.id}
          className={`${Style.horizontalLine}
          ${
            node.isFolder && node.children.length > 0
              ? `${Style.verticalLine}`
              : ""
          }`}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              console.log(node);
              setIsExpanded((prev) => ({
                ...prev,
                [node.name]: !prev[node.name],
              }));
            }}
          >
            {node.isFolder ? (
              isExpanded?.[node.name] ? (
                <FaFolderOpen />
              ) : (
                <FaFolderPlus />
              )
            ) : (
              <FaFileAlt />
            )}{" "}
            {node.name}{" "}
          </div>
          {isExpanded?.[node.name] &&
            node.isFolder &&
            node.children.length > 0 && (
              <div style={{ marginLeft: "1.5rem" }}>
                <List list={node.children} />
              </div>
            )}
        </div>
      ))}
    </>
  );
};

export default function FileExplorer() {
  const [data, setData] = useState(json);
  return (
    <div>
      <h1>File/Folder Explorer</h1>
      <div style={styles.container}>
        <List list={data} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "left",
    padding: "50px",
  },
};
