import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { React, useEffect, useState } from "react";
import { GetAllUsers } from "./service/user-helper";

export default function UserPage() {
    const [users, setUsers] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    useEffect(() => {
        GetAllUsers().then((data) => setUsers(data));
    }, []);

    return (
        <div>
            <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-search"></i>
                </span>
                <InputText
                    placeholder="Search"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                />
            </div>

            <DataTable value={users} paginator rows={5} globalFilter={globalFilter}>
                <Column
                    header="S.N"
                    body={(rowData, options) => options.rowIndex + 1}
                />
                
                <Column field="fullName" header="Full Name" />
                <Column field="username" header="Username" />
                <Column field="_admin" header="Roles" body={(rowData) => rowData._admin ? 'Yes' : 'No'} />
            </DataTable>
        </div>
    );
}