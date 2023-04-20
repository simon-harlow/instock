import axios from 'axios';

const API_PORT = 8080;
const API_ADDRESS = `http://localhost:${API_PORT}`;
const newHeader = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const getInventories = async () => {
    try {
        const inventories = await axios.get(`${API_ADDRESS}/api/inventories`);
        return inventories;
    } catch (err) {}
};

const deleteInventory = async id => {
    try {
        const inventory = await axios.delete(`${API_ADDRESS}/api/inventories/${id}`);
        return inventory;
    } catch (err) {}
};

const getWarehouseDetails = async id => {
    try {
        const warehouseDetails = await axios.get(`${API_ADDRESS}/api/warehouses/${id}`);
        return warehouseDetails;
    } catch (err) {}
};

export { getInventories, deleteInventory, getWarehouseDetails };
