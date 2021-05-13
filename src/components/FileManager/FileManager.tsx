import React, { ReactNode } from "react";
import { Tree } from "antd";
import ContextMenu from "../ContextMenu/ContextMenu";
import Style from "./FileManager.module.css";
const { DirectoryTree } = Tree;
// interface Props {
//   treeData: TreeData;
// }
interface TreeData {
  title: string | ReactNode;
  key: string;
  isLeaf?: boolean;
  children?: TreeData[];
}
class TreeDataItem implements TreeData {
  title: string | ReactNode;
  key: string;
  isLeaf?: boolean;
  children?: TreeData[];

  constructor(props: TreeData) {
    this.title = <ContextMenu>{props.title}</ContextMenu>;
    this.key = props.key;
    this.isLeaf = props.isLeaf;
    this.children = props.children;
  }
}

const treeData = [
  new TreeDataItem({
    title: "Folder 1",
    key: "0-0",
    children: [
      new TreeDataItem({
        title: "Sub Folder 3",
        key: "0-0-0",
        children: [
          new TreeDataItem({ title: "file_6", key: "0-0-0-0", isLeaf: true }),
          new TreeDataItem({ title: "file_7", key: "0-0-0-1", isLeaf: true }),
        ],
      }),
      new TreeDataItem({ title: "file_2", key: "0-0-1", isLeaf: true }),
      new TreeDataItem({ title: "file_3", key: "0-0-2", isLeaf: true }),
    ],
  }),
  new TreeDataItem({
    title: "Folder 2",
    key: "0-1",
    children: [
      new TreeDataItem({ title: "file_4", key: "0-1-0", isLeaf: true }),
      new TreeDataItem({ title: "file_5", key: "0-1-1", isLeaf: true }),
    ],
  }),
  new TreeDataItem({ title: "file_1", key: "0-2", isLeaf: true }),
];

const FileManager = () => {
  const onSelect = (keys: React.Key[], info: any) => {
    console.log("Trigger Select", keys, info);
  };

  const onExpand = () => {
    console.log("Trigger Expand");
  };

  return (
    <div className={Style.FileManager}>
      <DirectoryTree
        className={Style.Tree}
        blockNode
        multiple
        treeData={treeData}
        onSelect={onSelect}
        onExpand={onExpand}
      />
    </div>
  );
};

export default FileManager;
