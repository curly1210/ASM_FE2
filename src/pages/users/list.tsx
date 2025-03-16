/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Skeleton, Table } from "antd";
import useList from "../../hooks/useList";
import { IProduct } from "../../interface/type";
import { Link } from "react-router-dom";
// import { IProduct } from "../../interface/type";

const UserListPage = () => {
  const { data, isLoading, error, isError } = useList({ resource: "users" });

  const dataSource = data?.data?.map((product: IProduct) => ({
    key: product.id,
    ...product,
  }));

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (_: any, item: IProduct) => {
        // console.log(params2);
        return <div className="flex space-x-3"></div>;
      },
    },
  ];

  if (isLoading) return <Skeleton active />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>Không có sản phẩm nào</div>;

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h2 className="text-xl font-bold">Danh sách tài khoản</h2>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};
export default UserListPage;
