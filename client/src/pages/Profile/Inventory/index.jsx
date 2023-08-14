import { useEffect, useState } from "react";
import InventoryForm from "./InventoryForm";
import { Button, Table, message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { GetInventory } from "../../../apicalls/inventory";
import { getDateFormat } from "../../../utils/helpers";

const Inventory = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
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
        if (record.inventoryType === "in") {
          return record.donar.name;
        } else {
          return record.hospital.hospitalName;
        }
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    },
  ];

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetInventory();
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
      <div className="flex justify-end">
        <Button type="default" onClick={() => setOpen(true)}>
          Add Inventory
        </Button>
      </div>

      <Table columns={columns} dataSource={data} className="mt-3" />

      {open && (
        <InventoryForm open={open} setOpen={setOpen} reloadData={getData} />
      )}
    </div>
  );
};

export default Inventory;
