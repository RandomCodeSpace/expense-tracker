import {
  CoffeeOutlined,
  ForkOutlined,
  FunctionOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { message } from "antd";

export const GITLAB_APP_ID =
  "821d3be84f59e96edf5cc524838ffa8e692dbc3d1397ebe4745230f4b60e120e";
export const GITLAB_CALLBACK_URL = window.location.href;
export const gitlabOAuthURL = `https://gitlab.com/oauth/token?client_id=${GITLAB_APP_ID}&redirect_uri=${encodeURIComponent(
  GITLAB_CALLBACK_URL,
)}&grant_type=authorization_code&scope=api openid`;
export const categories = [
  {
    icon: <CoffeeOutlined />,
    title: "Food",
    data: <span>Summary for Food Expense</span>,
  },
  {
    icon: <ForkOutlined />,
    title: "Grocery",
    data: <span>Summary for Grocery Expense</span>,
  },
  {
    icon: <NotificationOutlined />,
    title: "Entertainment",
    data: <span>Summary for Entertainment Expense</span>,
  },
  {
    icon: <FunctionOutlined />,
    title: "Miscellaneous",
    data: <span>Summary for Food Expense</span>,
  },
];

export const handleDateChange = (value) => {
  message.destroy();
  message.info(`Selected Date: ${value ? value.format("YYYY-MM-DD") : "None"}`);
};
