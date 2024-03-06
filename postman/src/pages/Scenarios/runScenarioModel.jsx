import { Form, InputNumber, Modal } from 'antd';
import axios from 'axios';
import React from 'react';

const ORCHESTRATOR_URI = import.meta.env.VITE_ORCHESTRATOR_URI;

const RunScenarioModel = ({ runModalOpen, setRunModalOpen,scenarioid }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const { duration, un } = values;

        // Set headers for the Axios request
         

        // Make an Axios POST request with the specified headers
        axios.post(`${ORCHESTRATOR_URI}/runstep`, {
            duration: duration,
            un: un,
            scenarioid: scenarioid
        })
        .then(response => {
            console.log('Post request successful:', response);
            // Handle response if needed
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error if needed
        });

        // Reset the form and close the modal
        form.resetFields();
        setRunModalOpen(false);
    };

    return (
        <div>
            <Modal
                visible={runModalOpen}
                onCancel={() => { setRunModalOpen(false) }}
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            onFinish(values);
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="User number"
                        name="un"
                        style={{ marginBottom: 0, width: '70%' }}
                        rules={[{ required: false, message: 'Please enter user number' }]}
                    >
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Duration (seconds)"
                        name="duration"
                        style={{ marginBottom: 0, width: '70%' }}
                        rules={[{ required: false, message: 'Please enter duration in seconds' }]}
                    >
                        <InputNumber min={1} step={1} style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default RunScenarioModel;
