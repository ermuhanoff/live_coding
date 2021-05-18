import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Space } from "antd";
import { Context, useAppContext } from "../App/AppContext";
import NoticeEditor from "../NoticeEditor/NoticeEditor";
import Text from "antd/lib/typography/Text";
import { Editor, Monaco } from "../Editor/Editor";
import { Emitter } from "../App/App";

interface Props {
  createNotice: (values: any) => void;
}

const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { span: 16 },
};
const editorLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

const NoticeAddComponent = ({ createNotice }: Props) => {
  const { context, setContext } = useAppContext();
  const [isOpened, setIsOpened] = useState<boolean>(false);

  useEffect(() => {
    Emitter.on("open_notice_add", () => {
      setIsOpened(Context.isNoticeAddWindowOpened);
    });
    setIsOpened(Context.isNoticeAddWindowOpened);
  });

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // console.log(context.fileManagerOpenedFile);
    setIsOpened(false);
    Context.isNoticeAddWindowOpened = false;
    createNotice(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const getValueOfSelection = (): string => {
    if (Editor === undefined || !isOpened) return "";
    let selectedLinesText: string = "";

    for (
      let i = Context.noticePos.startLineNumber;
      i < Context.noticePos.endLineNumber + 1;
      i++
    ) {
      selectedLinesText += Editor.getModel()?.getLineContent(i);
      if (i != Context.noticePos.endLineNumber) {
        selectedLinesText += "\n";
      }
    }

    return selectedLinesText;
  };

  return (
    <Drawer
      title="Create notice"
      width={500}
      placement="right"
      closable
      destroyOnClose
      onClose={() => {
        Context.isNoticeAddWindowOpened = false;
        setIsOpened(false);
        Emitter.emit("close_notice_add");
      }}
      visible={isOpened}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button
            onClick={() => {
              Context.isNoticeAddWindowOpened = false;
              setIsOpened(false);
              Emitter.emit("close_notice_add");
            }}
            style={{ marginRight: 8 }}
          >
            Cancel
          </Button>
          <Button
            htmlType="button"
            onClick={onReset}
            style={{ marginRight: 8 }}
          >
            Reset
          </Button>
          <Button
            onClick={() => {}}
            htmlType="submit"
            form="notice_add"
            type="primary"
          >
            Create
          </Button>
        </div>
      }
    >
      <Form {...layout} form={form} name="notice_add" onFinish={onFinish}>
        <Form.Item
          name="Question"
          label="Question"
          rules={[{ required: true }]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          name="Description"
          label="Description"
          rules={[{ required: true }]}
        >
          <TextArea allowClear showCount maxLength={300} rows={6} />
        </Form.Item>
        <Form.Item>
          <Text strong style={{ fontSize: "1.2em" }}>
            Lines selected:
          </Text>
        </Form.Item>
        <Form.Item {...editorLayout} style={{ minHeight: 300 }}>
          <NoticeEditor
            value={getValueOfSelection()}
            lineStart={Context.noticePos.startLineNumber}
            lineCount={
              Context.noticePos.endLineNumber -
              Context.noticePos.startLineNumber
            }
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default NoticeAddComponent;
