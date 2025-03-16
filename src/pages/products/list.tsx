/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Skeleton, Table } from "antd";
import useList from "../../hooks/useList";
import { IProduct } from "../../interface/type";
import { Link } from "react-router-dom";
// import { IProduct } from "../../interface/type";

const ProductListPage = () => {
  const { data, isLoading, error, isError } = useList({ resource: "products" });

  const dataSource = data?.data?.map((product: IProduct) => ({
    key: product.id,
    ...product,
  }));

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) => <img src={image} width={50} alt="" />,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (_: any, item: IProduct) => {
        // console.log(params2);
        return (
          <div className="flex space-x-3">
            <Button type="primary">
              <Link to={`/admin/products/update/${item.id}`}>Sửa</Link>
            </Button>
            <Button type="primary" danger>
              <Link to={`/admin/products/create`}>Xóa</Link>
            </Button>
          </div>
        );
      },
    },
  ];

  if (isLoading) return <Skeleton active />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>Không có sản phẩm nào</div>;

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h2 className="text-xl font-bold">Danh sách sản phẩm</h2>
        <Button type="primary">
          <Link to={"/admin/products/create"}>Thêm sản phẩm</Link>
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};
export default ProductListPage;
