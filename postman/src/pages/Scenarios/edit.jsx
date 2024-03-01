import React from "react";
import { Edit, useForm } from "@refinedev/antd";
import {  mediaUploadMapper } from "@refinedev/strapi-v4";
import { Col, Form, Input, Row, Tabs } from "antd";


export const ScenarioEdit= () => {
    
    const { formProps, saveButtonProps, queryResult } = useForm({
        metaData: { populate: ["steps", "cover"] },
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
                onFinish={(values) => {
                    formProps.onFinish?.(mediaUploadMapper(values));
                }}
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
        </Edit>
    );
};
