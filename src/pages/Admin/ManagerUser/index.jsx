import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Form, Input } from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Sidebar from "../../../components/Sidebar";
import TableItem from "../../../components/TableItem";
import ModalItem from "../../../components/ModalItem";

const ManagerUser = () => {
  const [editRecord, setEditRecord] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formValues, setFormValues] = useState({ user: { ...selectedUser } });
  const formRef = useRef(null);

  const [isModalEdit, setIsModalEdit] = useState(false);
  useEffect(() => {
    // Update the form values when the selectedUser changes
    if (selectedUser) {
      formRef.current.setFieldsValue({ user: { ...selectedUser } });
    }
  }, [selectedUser]);

  const renderAction = (text, user) => {
    return (
      <div>
        <EditOutlined
          onClick={() => {
            setSelectedUser(user);
            handleEdit(user);
          }}
          className="text-green-600 text-lg cursor-pointer border border-gray-400 rounded-md p-1"
        />
        <DeleteOutlined className="text-[#EC6453] text-lg cursor-pointer border border-gray-400 rounded-md p-1" />
      </div>
    );
  };
  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const onFinish = (values) => {
    // Update the selected user in the data array
    const updatedData = data.map((user) => {
      if (user.key === selectedUser.key) {
        return { ...user, ...values.user };
      }
      return user;
    });

    // Update the data array directly
    data.splice(
      data.findIndex((user) => user.key === selectedUser.key),
      1,
      ...updatedData
    );

    // Close the modal
    setIsModalEdit(false);

    // Reset the form fields
    formRef.current.resetFields();
  };

  const data = [];
  for (let i = 0; i < 100; i++) {
    const id = uuidv4(); // Generate a UUID as a random ID
    data.push({
      key: id,
      fullname: `Nguyen Van ${i}`,
      email: `test@gmail${i}.com`,
      phone: `09999999${i}`,
      role: "User",
    });
  }
  // handle CRUD

  const handleEdit = (record) => {
    setEditRecord(record);
    setSelectedUser(record);
    setIsModalEdit(true);
    setFormValues({ user: { ...record } });
    console.log("user: ", record);
  };

  const handleCancel = () => {
    setIsModalEdit(false);
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4">
        <h1 className="text-gray-700 text-center">ManagerUser</h1>
        <TableItem data={data} columns={columns} />
        <ModalItem
          title="Edit User"
          isOpen={isModalEdit}
          onCancel={handleCancel}
          editRecord={editRecord}
          setEditRecord={setEditRecord}
        >
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{
              maxWidth: 600,
            }}
            validateMessages={validateMessages}
            initialValues={{
              user: {
                ...formValues.user,
                fullname: selectedUser ? selectedUser.fullname : "",
              },
            }}
            ref={formRef}
          >
            <Form.Item
              name={["user", "fullname"]} // Update the name to match the field name
              label="Họ và tên"
              rules={[
                {
                  required: true,
                  message: "Không được để trống!",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  const value = e.target.value;
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    user: {
                      ...prevValues.user,
                      fullname: value,
                    },
                  }));
                }}
              />
            </Form.Item>

            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[
                {
                  type: "email",
                  required: true,
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  const value = e.target.value;
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    user: {
                      ...prevValues.user,
                      email: value,
                    },
                  }));
                }}
              />
            </Form.Item>

            <Form.Item
              name={["user", "role"]}
              label="Vai trò"
              rules={[
                {
                  type: "role",
                  required: true,
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  const value = e.target.value;
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    user: {
                      ...prevValues.user,
                      role: value,
                    },
                  }));
                }}
              />
            </Form.Item>
          </Form>
        </ModalItem>
      </div>
    </div>
  );
};

export default ManagerUser;
