import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { DeleteButton } from '@refinedev/antd';
import axios from "axios";
import { useUpdate } from '@refinedev/core';


const CreateVariableModal = ({ visible, setVisible,onCreate, onCancel ,scenarioid,variabledata}) => {
  // console.log("variabledata",variabledata)
  const { mutate } = useUpdate();

  
 
    const [form] = Form.useForm();
    const [variables, setVariables] = useState(variabledata??[]);
    form.setFieldsValue({ variables: variabledata });

    const handleAddVariable = () => {
        setVariables([...variables, { name: '', value: '' }]);
      };
    
    const handleRemoveVariable = index => {
        const updatedVariables = [...variables];
        updatedVariables.splice(index, 1);
        setVariables(updatedVariables);
      };
    
    const onFinish = values => {
      console.log("OnFinishvalues",values)
      console.log("ddd");
      mutate(
        {
            resource: "scenarios",
            id: scenarioid,
            
            values: {
                ...values,
            },
        },
        {
            onSuccess: () => {
                //Ned to 
                //We need to call some stuff on Success and failure
            },
        },
    );
      //updateScenarioField(scenarioid,values.variables);
      form.resetFields();
     
      setVariables([]);
      setVisible(false);
    };
    return (
      <Modal
        visible={visible}
        title="Create Variable"
        okText="Create"
        cancelText="Cancel"
        onCancel={()=>{setVisible(false)}}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              console.log("OnOKvalues",values)
              onFinish(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="create_request_form">
       
        <Form.Item label="Variable">
  {variables.map((variable, index) => (
    <div key={index} style={{ marginBottom: 8 }}>
      <Form.Item
        name={['variables', index, 'name']}
        style={{ display: 'inline-block', width: 'calc(30% - 16px)', marginRight: 8 }}
      >
        <Input placeholder="Variable Name" />
      </Form.Item>
      <Form.Item
        name={['variables', index, 'value']}
        style={{ display: 'inline-block', width: 'calc(55% - 16px)', marginRight: 8 }}
      >
        <Input placeholder="Variable Value" />
      </Form.Item>
      <Button type="dashed" danger onClick={() => handleRemoveVariable(index)}>
        X
      </Button>
    </div>
  ))}
  <Button type="dashed" onClick={handleAddVariable} style={{ width: '100%' }}>
    Add Variable
  </Button>
</Form.Item>


         
         
        </Form>
      </Modal>
    );
  };

export default CreateVariableModal;
