import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from "react";
import { DeleteRole, GetAllRoles, RegisterRole, UpdateRole } from './service/user-helper';


export default function AdminTable() {
    const [visible, setVisible] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [roleName, setRoleName] = useState('');
    const [selectedRole, setSelectedRole] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail, life: 3000 });
    }

    useEffect(() => {
        GetAllRoles().then((data) => setCustomers(data));
    }, []);

    const handleConfirm = () => {
        if (roleName.trim() !== '') {
            const roleData = { name: roleName };

            if (selectedRole) {
                UpdateRole(roleData, selectedRole.name)
                    .then(() => {
                        showToast('success', 'Role Updated', `Role ${roleName} has been updated.`);
                        GetAllRoles().then((data) => setCustomers(data));
                        resetForm();
                    })
                    .catch((error) => {
                        console.error("Error updating role:", error);
                        showToast('error', 'Update Failed', `Failed to update role ${roleName}.`);
                    });
            } else {
                RegisterRole(roleData)
                    .then(() => {
                        showToast('success', 'Role Added', `Role ${roleName} has been added.`);
                        GetAllRoles().then((data) => setCustomers(data));
                        resetForm();
                    })
                    .catch((error) => {
                        console.error("Error registering role:", error);
                        showToast('error', 'Addition Failed', `Failed to add role ${roleName}.`);
                    });
            }
        } else {
            alert('Please enter a role name');
        }
    };

    const handleDiscard = (rowData) => {
        confirmDialog({
            message: 'Are you sure you want to delete this role?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                DeleteRole(rowData.name)
                    .then(() => {
                        showToast('success', 'Role Deleted', `Role ${rowData.name} has been deleted.`);
                        GetAllRoles().then((data) => setCustomers(data));
                    })
                    .catch((error) => {
                        console.error("Error deleting role:", error);
                        showToast('error', 'Deletion Failed', `Failed to delete role ${rowData.name}.`);
                    });
            },
            reject: () => {
                showToast('warn', 'Deletion Canceled', 'Role deletion has been canceled.');
            }
        });
    };

    const resetForm = () => {
        setRoleName('');
        setSelectedRole(null);
        setVisible(false);
    };

    const footerContent = (
        <div>
            <Button label="Cancel" className='p-button-danger' icon="pi pi-times" onClick={resetForm} />
            <Button label="Confirm" className='p-button-success' icon="pi pi-check" onClick={handleConfirm} autoFocus />
        </div>
    );

    const onGlobalFilterChange = (e) => {
        setGlobalFilter(e.target.value);
    };

    return (
        <div>
            <Toast ref={toast} />
            <ConfirmDialog />
            <Dialog header="Role" visible={visible} style={{ width: '50w' }} onHide={resetForm} footer={footerContent}>
                <div className="inline-flex flex-column gap-2">
                    <label htmlFor="rolename" className="text-secondary-50 font-semibold">
                        Role Name
                    </label>
                    <InputText
                        id="rolename"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        className="border-none p-3 text-secondary-50 bg-bluegray-200"
                    />
                </div>
            </Dialog>

            <div className="card">
                <div className="flex justify-content-between align-items-center mb-2 ">
                    <Button label="Add New" className='p-button-success' icon="pi pi-plus " onClick={() => setVisible(true)} />
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText value={globalFilter} onChange={onGlobalFilterChange} placeholder="  Search" />
                    </span>
                </div>
                <DataTable value={customers} paginator rows={5} globalFilter={globalFilter}>
                    <Column
                        header="S.N"
                        body={(rowData, options) => options.rowIndex + 1}
                    />
                    <Column field="name" header="Role"></Column>
                    <Column field="name" header="Department"></Column>
                    <Column
                        header="Action"
                        body={(rowData) => (
                            <div>
                                <Button onClick={() => { setSelectedRole(rowData); setRoleName(rowData.name); setVisible(true); }} className=" p-button p-button-success  pi pi-cog">
                                </Button>
                                <Button onClick={() => handleDiscard(rowData)} className="p-button p-button-danger pi pi-trash ">
                                </Button>
                            </div>
                        )}
                    />
                </DataTable>
            </div>
            
        
        </div>
    );
}
