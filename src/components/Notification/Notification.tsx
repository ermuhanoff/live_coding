import { notification } from "antd";
import { NotificationPlacement } from "antd/lib/notification";
import { ReactNode } from "react";

export type NotificationType =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "warn"
  | "open";

interface Args {
  message: string | ReactNode;
  description: string | ReactNode;
  type: NotificationType;
  placement?: NotificationPlacement;
}

export const openNotification = ({
  message,
  description,
  type,
  placement = "bottomLeft",
}: Args) => {
  notification[type]({
    message,
    description,
    placement,
  });
};


