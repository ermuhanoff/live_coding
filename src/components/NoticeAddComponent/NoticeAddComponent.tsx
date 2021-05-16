import React from "react";
import { Button, Drawer, Form, Input, Space } from "antd";
import { useAppContext } from "../App/AppContext";
import NoticeEditor from "../NoticeEditor/NoticeEditor";
import Text from "antd/lib/typography/Text";
import { Doc } from "../Editor/Editor";

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

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    createNotice(values);
    setContext((prev) => ({ ...prev, isNoticeAddWindowOpened: false }));
  };

  const onReset = () => {
    form.resetFields();
  };

  const getValueOfSelection = (): string => {
    if (Doc === undefined) return "";
    let selectedLinesText: string = "";

    for (let i = context.lineRange.from; i < context.lineRange.to + 1; i++) {
      selectedLinesText += Doc.getLine(i);
      if (i != context.lineRange.to) {
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
        setContext((prev) => ({ ...prev, isNoticeAddWindowOpened: false }));
      }}
      visible={context.isNoticeAddWindowOpened}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button
            onClick={() => {
              setContext((prev) => ({
                ...prev,
                isNoticeAddWindowOpened: false,
              }));
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
        <Form.Item {...editorLayout}>
          <NoticeEditor
            value={getValueOfSelection()}
            lineStart={context.lineRange.from + 1}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default NoticeAddComponent;
