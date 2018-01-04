import * as React from "react";
import { Table } from 'antd';
import { TableProps, TableState } from "antd/es/table";
export interface CustomTableProps<T> extends TableProps<T> {
}
export interface CustomTableState<T> extends TableState<T> {
}
export default class CustomTable<T> extends React.Component<CustomTableProps<T>, CustomTableState<T>> {
    render() {
        let columns = this.props.columns;
        let dataSource = this.props.dataSource;
        return (
            <div>
                <Table columns={columns} dataSource={dataSource}/>
            </div>
        );
    }
}