import { Create, useForm, useSelect } from "@refinedev/antd";

import { SettingOutlined } from '@ant-design/icons';
import { Cascader, Col, Form, Input, Row, Select, Space } from 'antd';
const { Option } = Select;
export const StepCreate = () => {
    const { formProps, saveButtonProps } = useForm();
    const selectBefore = (
        <Select defaultValue="http://">
          <Option value="http://">http://</Option>
          <Option value="https://">https://</Option>
        </Select>
      );
      const { selectProps:scenarioSelectProps } = useSelect({
        resource: "scenarios",        
        optionLabel: "name",
        optionValue: "id",

    });
    console.log("formProps",formProps)
    console.log("scenarioSelectProps",scenarioSelectProps)
    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
                
            >
                <Row>
                    <Col span={10}>
                        <Form.Item
                            label="Step Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={10}>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                    </Col>
                    
                </Row>
                <Row>
                <Form.Item
                    label="Scenario"
                    name={["scenario", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...scenarioSelectProps} />
                </Form.Item>
                </Row>
                <Row>
                    <Col span={10}>
                    <Space direction="vertical">
    
    <Input addonBefore={selectBefore}  defaultValue="AUT URL" />
    
    <Input
      addonBefore={
        <Cascader
          placeholder="cascader"
          style={{
            width: 150,
          }}
        />
      }
      defaultValue="mysite"
    />
  </Space>
  </Col>
  </Row>
            </Form>
        </Create>
    );
};
