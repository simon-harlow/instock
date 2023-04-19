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

export { getInventories, deleteInventory };
