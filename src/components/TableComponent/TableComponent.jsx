import { Table } from 'antd';
import React, { useMemo, useState } from 'react'
import Loading from '../LoadingComponent/Loading';
import { Excel } from 'antd-table-saveas-excel';

const TableComponent = (props) => {
  const { selectionType = 'checkbox', data: dataSource = [], isLoading = false, columns = [], handleDeleteMany } = props;
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
  const newColumnsExport = useMemo(()=>{
    const arr = columns?.filter((col)=> col.dataIndex !=='action')
    return arr
  },[columns])

      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setRowSelectedKeys(selectedRowKeys)
        },
        // getCheckboxProps: (record) => ({
        //   disabled: record.name === 'Disabled User',
        //   // Column configuration not to be checked
        //   name: record.name,
        // }),
      };
  const handleDeleteAll =()=>{
    handleDeleteMany(rowSelectedKeys)
  }

  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnsExport)
      .addDataSource(dataSource, {
        str2Percent: true
      })
      .saveAs("Excel.xlsx");
  };
  return (
    <Loading isPending={isLoading}>
      {rowSelectedKeys.length>0 &&(
      <div style={{
        backgroundColor: "red",
        color: "white",
        fontWeight: "bold",
        padding: "10px",
        cursor: "pointer"
      }}
      onClick={handleDeleteAll}
      >
        Delete All
      </div>
      )}
      <button onClick={exportExcel}>Export excel</button>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        {...props}
      />
    </Loading>
  )
}

export default TableComponent