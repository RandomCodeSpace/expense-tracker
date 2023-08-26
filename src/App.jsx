import GitLabOAuth from "./common/AppLogin.jsx";
import { Card, FloatButton, Modal, Tabs } from "antd";
import { PieChartOutlined, PlusOutlined } from "@ant-design/icons";
import { Summary } from "./Summary.jsx";
import { useState } from "react";
import { AddData } from "./AddData.jsx";
import { useLiveStorageState } from "./common/useLiveSessionState.jsx";

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

  const [open, setOpen] = useLiveStorageState("openAddModel", false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <>
      <Card>
        <FloatButton
          icon={<PlusOutlined />}
          description="Add"
          shape={"square"}
          type={"primary"}
          onClick={showModal}
        />
        <Tabs
          defaultActiveKey="2"
          type={"card"}
          centered
          items={items}
          tabBarExtraContent={<GitLabOAuth />}
        />
      </Card>
      <Modal
        title={<span>Add Expense</span>}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <AddData />
      </Modal>
    </>
  );
};
