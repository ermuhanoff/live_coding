import React, { ReactNode } from "react";
import { Tree } from "antd";
import ContextMenu from "../ContextMenu/ContextMenu";
import Style from "./FileManager.module.css";
import { FileInfo } from "../ToolPanel/ToolPanel";
import { useAppContext } from "../App/AppContext";
import {
  DownOutlined,
  FileOutlined,
  FolderOpenOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import { DiHtml5, DiCss3, DiJavascript1 } from "react-icons/di";
import { GrDocumentTxt } from "react-icons/gr";
import { AntTreeNode } from "antd/lib/tree";
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
    this.title = (
      <ContextMenu data={["Open", "Copy", "Delete", "Rename"]} action={[]}>
        {props.title}
      </ContextMenu>
    );
    this.key = props.key;
    this.isLeaf = props.isLeaf;
    this.children = props.children;
    this.icon = props.icon;
  }
}

const FileManager = ({ data, setExpanded, expanded }: Props) => {
  const { context, setContext } = useAppContext();

  const flatDataArray = (data: FileInfo[]): FileInfo[] => {
    let flatted: FileInfo[] = [];

    data.forEach((item) => {
      if (typeof item.content === "object") {
        flatted = flatted.concat(flatDataArray(item.content));
      } else {
        flatted.push(item);
      }
    });

    return flatted;
  };

  const flatData = flatDataArray(data);

  const onSelect = (keys: React.Key[], info: any) => {
    if (info.node.isLeaf) {
      let fileInfo: FileInfo = getFileInfoByPath(keys[0].toString());

      if (fileInfo) {
        setContext({ ...context, fileManagerOpenedFile: fileInfo });
      }
    }
  };

  const onExpand = (keys: React.Key[]) => {
    let stringKeys: string[] = keys.map((item) => item.toString());
    setExpanded(stringKeys);
  };

  const getIconFromExt = (
    ext: string
  ): ReactNode | ((item: any) => ReactNode) => {
    switch (ext) {
      case "html":
        return <DiHtml5 />;
      case "css":
        return <DiCss3 />;
      case "js":
        return <DiJavascript1 />;
      case "txt":
        return <GrDocumentTxt />;
      case "":
        return (item) => {
          if (item.expanded) return <FolderOpenOutlined />;
          return <FolderOutlined />;
        };
      default:
        return <FileOutlined />;
    }
  };

  const getTreeDataFromData = (data: FileInfo[]): TreeData[] => {
    let treeData: TreeData[] = [];

    data.forEach((item) => {
      let ext = item.ext || "";
      let data: TreeData = new TreeDataItem({
        title: item.name,
        key: item.path,
        isLeaf: item.type === "file",
        icon: getIconFromExt(ext),
      });
      if (typeof item.content === "object") {
        data.children = getTreeDataFromData(item.content);
      }
      treeData.push(data);
    });

    return treeData;
  };

  const getFileInfoByPath = (path: string): FileInfo => {
    return flatData.filter((item) => item.path === path)[0];
  };

  const onRightClick = (e: any) => {
    // console.log(e);
  };

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
        defaultSelectedKeys={[context.fileManagerOpenedFile.path]}
      />
    </div>
  );
};

export default FileManager;
