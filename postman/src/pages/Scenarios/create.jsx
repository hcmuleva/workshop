import { Create, useForm } from "@refinedev/antd";

import { Col, Form, Input, Row } from "antd";

export const ScenarioCreate = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
                
            >
                <Row>
                    <Col span={10}>
                        <Form.Item
                            label="Scenario Name"
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
            </Form>
        </Create>
    );
};
