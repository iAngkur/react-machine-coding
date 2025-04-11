import { useState, useEffect, useRef, useCallback } from "react";
import json from "./data.json";
import { FaFolderOpen, FaFolderPlus } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import Style from "./FileExplorer.module.css";

const NodeInput = ({ 
  type, 
  onSubmit, 
  onCancel, 
  parentId,
  position 
}) => {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit(parentId, name, type);
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <div 
      className={Style.inputContainer}
      style={{
        position: "absolute",
        left: `${position?.x}px`,
        top: `${position?.y}px`,
      }}
    >
      {type === "folder" ? <FaFolderPlus /> : <FaFileAlt />}
      <input
        ref={inputRef}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={onCancel}
        className={Style.nodeInput}
        placeholder={`${type === "folder" ? "Folder" : "File"} name`}
      />
    </div>
  );
};

const ContextMenu = ({ points, isFolder, onClose, onAction }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleAction = useCallback(
    (action) => {
      onAction(action);
      onClose();
    },
    [onAction, onClose]
  );

  const menuItems = [
    ...(isFolder
      ? [
          { label: "New Folder", action: "createFolder" },
          { label: "New File", action: "createFile" },
        ]
      : []),
    { label: "Rename", action: "rename" },
    { label: "Delete", action: "delete" },
  ];

  return (
    <div
      ref={menuRef}
      className={Style.contextMenu}
      style={{
        position: "fixed",
        top: `${points?.y}px`,
        left: `${points?.x}px`,
      }}
    >
      <ul className={Style.menuList}>
        {menuItems.map((item) => (
          <li
            key={item.action}
            className={Style.menuItem}
            onClick={() => handleAction(item.action)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

const TreeNode = ({ 
  node, 
  isExpanded, 
  onToggle, 
  onRightClick,
  isCreating,
  onCreateNode,
  onCancelCreate
}) => {
  const nodeRef = useRef(null);

  return (
    <div
      ref={nodeRef}
      className={`${Style.treeNode} ${
        node.isFolder && node.children.length > 0 ? Style.hasChildren : ""
      }`}
      onClick={() => node.isFolder && onToggle(node.name)}
      onContextMenu={(e) => onRightClick(e, node)}
    >
      {node.isFolder ? (
        isExpanded ? (
          <FaFolderOpen />
        ) : (
          <FaFolderPlus />
        )
      ) : (
        <FaFileAlt />
      )}
      <span className={Style.nodeName}>{node.name}</span>
      
      {isCreating && (
        <NodeInput
          type={node.type === "folder" ? "folder" : "file"}
          onSubmit={onCreateNode}
          onCancel={onCancelCreate}
          parentId={node.id}
          position={{ x: 20, y: 0 }}
        />
      )}
    </div>
  );
};

const List = ({ list, onCreateNode }) => {
  const [isExpanded, setIsExpanded] = useState({});
  const [contextMenu, setContextMenu] = useState({
    position: { x: 0, y: 0 },
    toggled: false,
    node: null,
  });
  const [creatingNode, setCreatingNode] = useState({
    parentId: null,
    type: null,
    nodePosition: null
  });

  const handleRightClick = useCallback((e, node) => {
    e.preventDefault();
    e.stopPropagation();

    setContextMenu({
      position: { x: e.clientX, y: e.clientY },
      toggled: true,
      node,
    });
  }, []);

  const handleToggle = useCallback((name) => {
    setIsExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  }, []);

  const handleContextMenuAction = useCallback(
    (action) => {
      const node = contextMenu.node;
      switch (action) {
        case "createFolder":
          setCreatingNode({
            parentId: node.id,
            type: "folder",
            nodePosition: { x: 20, y: 0 }
          });
          break;
        case "createFile":
          setCreatingNode({
            parentId: node.id,
            type: "file",
            nodePosition: { x: 20, y: 0 }
          });
          break;
        default:
          break;
      }
      setContextMenu((prev) => ({ ...prev, toggled: false }));
    },
    [contextMenu.node]
  );

  const handleCreateNode = useCallback((parentId, name, type) => {
    if (!name.trim()) return;
    
    onCreateNode(parentId, name, type);
    setCreatingNode({ parentId: null, type: null, nodePosition: null });
  }, [onCreateNode]);

  const handleCancelCreate = useCallback(() => {
    setCreatingNode({ parentId: null, type: null, nodePosition: null });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu((prev) => ({ ...prev, toggled: false }));
  }, []);

  return (
    <>
      {list?.map((node) => (
        <div key={node.id} className={Style.listItem}>
          <TreeNode
            node={node}
            isExpanded={isExpanded[node.name]}
            onToggle={handleToggle}
            onRightClick={handleRightClick}
            isCreating={creatingNode.parentId === node.id && creatingNode.type === (node.isFolder ? "folder" : "file")}
            onCreateNode={handleCreateNode}
            onCancelCreate={handleCancelCreate}
          />
          {isExpanded[node.name] &&
            node.isFolder &&
            node.children.length > 0 && (
              <div className={Style.childrenContainer}>
                <List 
                  list={node.children} 
                  onCreateNode={onCreateNode}
                />
              </div>
            )}
        </div>
      ))}
      {contextMenu.toggled && (
        <ContextMenu
          points={contextMenu.position}
          isFolder={contextMenu.node?.isFolder}
          onClose={closeContextMenu}
          onAction={handleContextMenuAction}
        />
      )}
    </>
  );
};

export default function FileExplorer() {
  const [data, setData] = useState(json);

  const addNode = useCallback((parentId, name, type) => {
    setData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData));
      const findAndAddNode = (nodes) => {
        for (let node of nodes) {
          if (node.id === parentId) {
            const newNode = {
              id: Date.now().toString(),
              name,
              isFolder: type === "folder",
              children: type === "folder" ? [] : undefined,
              type
            };
            node.children = node.children || [];
            node.children.unshift(newNode);
            return true;
          }
          if (node.children && findAndAddNode(node.children)) {
            return true;
          }
        }
        return false;
      };
      findAndAddNode(newData);
      return newData;
    });
  }, []);

  return (
    <div className={Style.fileExplorer}>
      <h1>File/Folder Explorer</h1>
      <div className={Style.container}>
        <List list={data} onCreateNode={addNode} />
      </div>
    </div>
  );
}