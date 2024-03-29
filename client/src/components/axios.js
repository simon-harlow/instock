import axios from 'axios';

const API_PORT = 8080;
const API_ADDRESS = `http://localhost:${API_PORT}`;
const newHeader = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const getWarehouse = async id => {
    try {
        const warehouse = await axios.get(`${API_ADDRESS}/api/warehouses/${id}`);
        return warehouse;
    } catch (err) {}
};

const getInventories = async () => {
    try {
        const inventories = await axios.get(`${API_ADDRESS}/api/inventories`);
        return inventories;
    } catch (err) {}
};

const getWarehouseInventories = async id => {
    try {
        const inventories = await axios.get(`${API_ADDRESS}/api/warehouses/${id}/inventories`);
        return inventories;
    } catch (err) {}
};

const deleteInventory = async id => {
    try {
        const inventory = await axios.delete(`${API_ADDRESS}/api/inventories/${id}`);
        return inventory;
    } catch (err) {}
};


const getInventory = async id => {
    try {
        const inventories = await axios.get(`${API_ADDRESS}/api/inventories/${id}`);
        return inventories;
    } catch (err) {}
};


const searchWarehouse = async keyWord => {
    try {
        const warehouses = await axios.get(`${API_ADDRESS}/api/warehouses?s=${keyWord}`);
        return warehouses;
    } catch (err) {}
};

const searchInventory = async keyWord => {
    try {
        const inventories = await axios.get(`${API_ADDRESS}/api/inventories?s=${keyWord}`);
        return inventories;
    } catch (err) {}
};

const deleteWarehouseData = (id) => {
    return axios
        .delete(`${API_ADDRESS}/api/warehouses/${id}`)
        .then((response) => response.data)
        .catch((error) => console.log(error));
};

export {
    getWarehouse,
    getInventories,
    deleteInventory,
    getWarehouseInventories,
    getInventory,
    searchWarehouse,
    searchInventory,
    deleteWarehouseData,
    API_ADDRESS,
};

