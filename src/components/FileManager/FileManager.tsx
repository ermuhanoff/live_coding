import React, { ReactNode, useEffect, useState } from "react";
import { Tree } from "antd";
import ContextMenu from "../ContextMenu/ContextMenu";
import Style from "./FileManager.module.css";
import { FileInfo } from "../ToolPanel/ToolPanel";
import { Context, useAppContext } from "../App/AppContext";
import {
  DownOutlined,
  FileOutlined,
  FolderOpenOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import { DiHtml5, DiCss3, DiJavascript1 } from "react-icons/di";
import { GrDocumentTxt } from "react-icons/gr";
import { AntTreeNode } from "antd/lib/tree";
import { Emitter, VIEW_TYPE } from "../App/App";
const { DirectoryTree } = Tree;

interface Props {
  data: FileInfo[];
  expanded: string[];
  setExpanded: (keys: string[]) => void;
}
interface TreeData {
  title: string | ReactNode;
  key: string;
  isLeaf?: boolean;
  children?: TreeData[];
  icon?: ReactNode;
}
class TreeDataItem implements TreeData {
  title: string | ReactNode;
  key: string;
  isLeaf?: boolean;
  children?: TreeData[];
  icon: ReactNode;

  constructor(props: TreeData) {
    this.key = props.key;
    this.isLeaf = props.isLeaf;
    this.children = props.children;
    this.icon = props.icon;
    this.title = (
      <ContextMenu
        data={[
          { el: "Open", disabled: false, last: true, id: 0 },
          { el: "Cut", disabled: !isStreamer(), last: false, id: 1 },
          { el: "Copy", disabled: !isStreamer(), last: true, id: 2 },
          { el: "Rename", disabled: !isStreamer(), last: false, id: 3 },
          { el: "Delete", disabled: !isStreamer(), last: true, id: 4 },
        ]}
        action={[openFile, cutFile, copyFile, renameFile, deleteFile]}
        fileItem={this}
      >
        {props.title}
      </ContextMenu>
    );
  }
}

function isStreamer(): boolean {
  return VIEW_TYPE === "streamer";
}

function openFile(e: any, fileItem: TreeData) {
  console.log(fileItem);
}
function cutFile(e: any) {}
function copyFile(e: any) {}
function renameFile(e: any) {}
function deleteFile(e: any) {}

const FileManager = ({ data, setExpanded, expanded }: Props) => {
  const [openedFile, setOpened] = useState<FileInfo>(
    Context.fileManagerOpenedFile
  );

  useEffect(() => {
    Emitter.on("notice_open_file", (e) => {
      openFileByPath(e.path); 
    });
  }, []);

  const openFileByPath = (path: string) => {
    let fileInfo: FileInfo = getFileInfoByPath(path);

    if (fileInfo) {
      Context.fileManagerOpenedFile = fileInfo;
      Emitter.emit("open_file", fileInfo);
      setOpened(fileInfo);
    }
  };

  const flatDataArray = (data: FileInfo[]): FileInfo[] => {
    let flatted: FileInfo[] = [];

    data.forEach((item) => {
      if (item.isDirectory) {
        flatted = flatted.concat(flatDataArray(item.children));
      } else {
        flatted.push(item);
      }
    });

    return flatted;
  };

  const flatData = flatDataArray(data);

  const onSelect = (keys: React.Key[], info: any) => {
    if (info.node.isLeaf) {
      openFileByPath(keys[0].toString());
    }
  };

  const onExpand = (keys: React.Key[]) => {
    let stringKeys: string[] = keys.map((item) => item.toString());
    setExpanded(stringKeys);
  };

  const getIconFromExtAndType = (
    ext: string,
    isDirectory: boolean
  ): ReactNode | ((item: any) => ReactNode) => {
    if (isDirectory) {
      return (item) => {
        if (item.expanded) return <FolderOpenOutlined />;
        return <FolderOutlined />;
      };
    }
    switch (ext) {
      case ".html":
        return <DiHtml5 />;
      case ".css":
        return <DiCss3 />;
      case ".js":
        return <DiJavascript1 />;
      case ".txt":
        return <GrDocumentTxt />;
      default:
        return <FileOutlined />;
    }
  };

  const getTreeDataFromData = (data: FileInfo[]): TreeData[] => {
    let treeData: TreeData[] = [];

    data.forEach((item) => {
      let ext = item.ext || "";
      let data: TreeData = new TreeDataItem({
        title: item.name + ext,
        key: item.path,
        isLeaf: !item.isDirectory,
        icon: getIconFromExtAndType(ext, item.isDirectory),
      });
      if (item.isDirectory) {
        data.children = getTreeDataFromData(item.children);
      }
      treeData.push(data);
    });

    return treeData;
  };

  const getFileInfoByPath = (path: string): FileInfo => {
    return flatData.filter((item) => item.path === path)[0];
  };

  const onRightClick = (e: any) => {};

  return (
    <div className={Style.FileManager}>
      <DirectoryTree
        className={Style.Tree}
        // showLine
        switcherIcon={<DownOutlined />}
        showIcon={true}
        blockNode
        defaultExpandedKeys={expanded}
        treeData={getTreeDataFromData(data)}
        onSelect={onSelect}
        onExpand={onExpand}
        onRightClick={onRightClick}
        defaultSelectedKeys={[Context.fileManagerOpenedFile.path]}
      />
    </div>
  );
};

export default FileManager;
