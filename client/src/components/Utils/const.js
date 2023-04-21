import axios from 'axios';

const API_URL = "http://localhost:8080/api"

const deleteWarehouseData = (id) => {
    return axios
        .delete(`${API_URL}/warehouses/${id}`)
        .then((response) => response.data)
        .catch((error) => console.log(error));
};

export { API_URL, deleteWarehouseData }