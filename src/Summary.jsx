import { Card, Col, DatePicker, Row } from "antd";
import dayjs from "dayjs";
import { categories, handleDateChange } from "./common/Data.jsx";

export const Summary = () => {
  return (
    <>
      <Row gutter={12} justify="center" align="top">
        <DatePicker
          style={{ width: "100%" }}
          size={"large"}
          defaultValue={dayjs(new Date())}
          bordered={true}
          onChange={(value) => {
            handleDateChange(value);
          }}
        />
      </Row>
      <br />
      {categories.map((value, index) => {
        return (
          <div key={index}>
            <Row gutter={18} justify="center" align="top">
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
