import { useEffect, useState } from "react";
import { Table, message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoading } from "../redux/loadersSlice";
import { GetInventoryWithFilters } from "../apicalls/inventory";
import { getDateFormat } from "../utils/helpers";

const InventoryTable = ({ filters, userType, limit }) => {
  const [data, setData] = useState([]);
  //const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Inventory Type",
      dataIndex: "inventoryType",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      render: (text) => text.toUpperCase(),
    },
    { title: "Ouantity", dataIndex: "quantity", render: (text) => text + "ml" },
    {
      title: "Reference Email",
      dataIndex: "reference",
      render: (text, record) => {
        if (userType === "organization") {
          return record.inventoryType === "in"
            ? record.donar?.name
            : record.hospital?.hospitalName;
        } else {
          return record.organization.organizationName;
        }
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    },
  ];

  //change columns for hospital or donar
  if (userType === "hospital" || userType === "donar") {
    //remove inventory type column
    columns.splice(0, 1);

    //change reference column to organization name
    columns[2].title = "Organization Name";
    //date column should be renamed taken date
    columns[3].title =
      userType === "hospital" ? "Consumption Date" : "Donated Date";
  }

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetInventoryWithFilters(filters, limit);
      dispatch(SetLoading(false));
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={data} className="mt-3" />
    </div>
  );
};

export default InventoryTable;
