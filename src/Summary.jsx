import { Card, Col, DatePicker, message, Row } from "antd";
import {
  CoffeeOutlined,
  ForkOutlined,
  FunctionOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

export const Summary = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const items = [
    {
      icon: <CoffeeOutlined />,
      title: <span>Food</span>,
      data: <span>Summary for Food Expense</span>,
    },
    {
      icon: <ForkOutlined />,
      title: <span>Grocery</span>,
      data: <span>Summary for Grocery Expense</span>,
    },
    {
      icon: <NotificationOutlined />,
      title: <span>Entertainment</span>,
      data: <span>Summary for Entertainment Expense</span>,
    },
    {
      icon: <FunctionOutlined />,
      title: <span>Miscellaneous</span>,
      data: <span>Summary for Food Expense</span>,
    },
    {
      icon: <CoffeeOutlined />,
      title: <span>Food</span>,
      data: <span>Summary for Food Expense</span>,
    },
    {
      icon: <ForkOutlined />,
      title: <span>Grocery</span>,
      data: <span>Summary for Grocery Expense</span>,
    },
    {
      icon: <NotificationOutlined />,
      title: <span>Entertainment</span>,
      data: <span>Summary for Entertainment Expense</span>,
    },
    {
      icon: <FunctionOutlined />,
      title: <span>Miscellaneous</span>,
      data: <span>Summary for Food Expense</span>,
    },
  ];
  const handleChange = (value) => {
    messageApi.destroy();
    messageApi.info(
      `Selected Date: ${value ? value.format("YYYY-MM-DD") : "None"}`,
    );
  };

  return (
    <>
      {contextHolder}
      <Row gutter={12} justify="center" align="top">
        <DatePicker
          defaultValue={dayjs(new Date())}
          bordered={true}
          onChange={handleChange}
        />
      </Row>
      <br />
      {items.map((value, index) => {
        return (
          <div key={index}>
            <Row gutter={16} justify="center" align="top">
              <Col span={24}>
                <Card
                  title={
                    <span>
                      {value.icon} {value.title}
                    </span>
                  }
                  bordered={true}
                >
                  {value.data}
                </Card>
              </Col>
            </Row>
            <br />
          </div>
        );
      })}
    </>
  );
};
