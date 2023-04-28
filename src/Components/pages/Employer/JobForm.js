import React, { useState, useMemo } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./JobForm.scss";

import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { yoeOptions, tags } from "../../../Constants/JobsConstants";
import { generateFileUploadUrl } from "../../../Utils/AppUtils";

const { TextArea } = Input;

const JobForm = (props) => {
  const {onNewJob, onOpenJobCreationModal} = props;
  const [formError, setFormError] = useState(true);
  const [form] = Form.useForm();
  const [fileSizeError, setFileSizeError] = useState(false);
  const [fileList, setFileList] = useState([])
  const uploadProps = useMemo(() => {
    return {
      name: "file",
      action: generateFileUploadUrl(),
      headers: {
        authorization: "authorization-text",
      },
      maxCount: 1,
      beforeUpload(info) {
        setFileSizeError(false);
        if (info.size > 16384) {
          setFileSizeError(true);
          return Upload.LIST_IGNORE;
        }
      },
      onChange(info) {
        setFileList(info.fileList);
        if (info.file.status !== "uploading") {
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
          
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
  }, []);

  const onValuesChange = (changedValues, allValues) => {
    const tags = !Array.isArray(allValues.tags)
      ? undefined
      : !allValues.tags.length
      ? undefined
      : allValues.tags;
    const regex = "^[0-9]{10}$";
    const found = allValues.contactInfo
      ? allValues.contactInfo.match(regex)
      : null;
    if (
      found !== null &&
      allValues.company !== undefined &&
      allValues.designation !== undefined &&
      allValues.requirements !== undefined &&
      allValues.minYOE !== undefined &&
      tags !== undefined &&
      allValues.poc !== undefined
    ) {
      setFormError(false);
    } else {
      setFormError(true);
    }
  };
  const onClickHandler = () => {
    const values = {...form.getFieldValue()};
    onNewJob({
        ...values,
        jobId: uuidv4(),
        applicants: 0
    })
    onOpenJobCreationModal(false);
    const newJobObject = {
        tags: [],
        contactInfo: undefined,
        company: undefined,
        designation: undefined,
        requirements: undefined,
        minYOE: [],
        poc: undefined,
        jobDescription: undefined
      };
      form.setFieldsValue(newJobObject);
      setFileList([]);
      setFormError(true);
  }
  

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ offset: 1, span: 14 }}
      style={{ width: "100%" }}
      onValuesChange={onValuesChange}
      autoComplete="off"
      form={form}
    >
      <Form.Item
        label="Company Name"
        name="company"
        rules={[{ required: true, message: "Please enter the Company Name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Designation"
        name="designation"
        rules={[{ required: true, message: "Please enter the designation!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Requirements"
        name="requirements"
        rules={[{ required: true, message: "Please enter the requirements!" }]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        label="Tags"
        name="tags"
        rules={[
          {
            required: true,
            message: "Please select the tags for the job from the given lsit!",
          },
        ]}
      >
        <Select
          placeholder="select one or more tags"
          mode="multiple"
          style={{ width: "100%", cursor: "pointer" }}
          options={tags}
        />
      </Form.Item>
      <Form.Item
        label="Minimum YOE"
        name="minYOE"
        rules={[
          {
            required: true,
            message:
              "Please select the minimum years of experience required for the job!",
          },
        ]}
      >
        <Select style={{ width: "50%" }} allowClear options={yoeOptions} />
      </Form.Item>
      <Form.Item name="jobDescription" label="Job Description Document">
        <Upload {...uploadProps} fileList={fileList}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
      {fileSizeError ? (
        <Form.Item
          wrapperCol={{ offset: 7, span: 10 }}
          style={{ marginTop: "-30px" }}
        >
          <p className="error-message" data-testid="file-error">
            {"Please upload a file of less than 16KB size!"}
          </p>
        </Form.Item>
      ) : null}
      <Form.Item
        label="Point of Contact"
        name="poc"
        rules={[
          {
            required: true,
            message: "Please enter the POc for this position!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="POC's Contact Number"
        name="contactInfo"
        rules={[
          {
            required: true,
            message: "Please enter a valid 10 digit number!",
            pattern: new RegExp("^[0-9]{10}$"),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 10, span: 10 }}>
        {!formError && !fileSizeError ? (
          <Button
            type="primary"
            htmlType="submit"
            onClick={onClickHandler}
            style={{
              background: "#33B566",
              marginTop: 30,
            }}
          >
            Submit
          </Button>
        ) : (
          <Button
            disabled
            style={{
              marginTop: 30,
            }}
          >
            Submit
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
export default JobForm;
