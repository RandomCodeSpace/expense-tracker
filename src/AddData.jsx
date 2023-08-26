import { Button, DatePicker, Input, InputNumber, Select, Space } from "antd";
import { categories, handleDateChange } from "./common/Data.jsx";
import dayjs from "dayjs";

export const AddData = () => {
  const categoryList = () => {
    let map = [];
    categories.map((value) => {
      map.push({
        value: value.title.toLowerCase(),
        label: value.title,
      });
    });
    return map;
  };
  return (
    <>
      <form>
        <Select
          size={"large"}
          defaultValue={"Miscellaneous"}
          style={{ width: "100%" }}
          options={categoryList()}
        />
        <br />
        <br />
        <Input size={"large"} placeholder={"Description"}></Input>
        <br />
        <br />
        <DatePicker
          style={{ width: "100%" }}
          size={"large"}
          defaultValue={dayjs(new Date())}
          bordered={true}
          onChange={handleDateChange}
        />
        <br />
        <br />
        <InputNumber addonBefore="₹" style={{ width: "100%" }} size={"large"} />
        <br />
        <br />
        <Space>
          <Button size={"large"}>Cancel</Button>
          <Button type={"primary"} size={"large"}>
            Add
          </Button>
        </Space>
      </form>
    </>
  );
};
