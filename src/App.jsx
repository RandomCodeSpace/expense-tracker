import GitLabOAuth from "./common/AppLogin.jsx";
import { Card, FloatButton, Tabs } from "antd";
import { PieChartOutlined, PlusOutlined } from "@ant-design/icons";
import { Summary } from "./Summary.jsx";

export const App = () => {
  const items = [
    {
      key: 1,
      label: (
        <span>
          <PieChartOutlined />
          Summary
        </span>
      ),
      children: <Summary />,
    },
  ];

  return (
    <>
      <Card>
        <FloatButton
          icon={<PlusOutlined />}
          description="Add"
          shape={"square"}
          type={"primary"}
        />
        <Tabs
          defaultActiveKey="2"
          type={"card"}
          centered
          items={items}
          tabBarExtraContent={<GitLabOAuth />}
        />
      </Card>
    </>
  );
};
