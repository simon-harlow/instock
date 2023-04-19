import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Add_black, Add_white, Arrow_back, Arrow_drop, Chevron_right, Close } from './assets/modifiedIcons';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Warehouses from './components/Warehouses/Warehouses';
import WarehouseDetail from './components/WarehouseDetails/WarehouseDetails';
import WarehousesForm from './components/WarehouseForm/WarehouseForm';
import Inventories from './components/Inventories/Inventories';
import Item from './components/Item/Item';
import ItemForm from './components/ItemForm/ItemForm';
import Error from './components/Error/Error';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Warehouses />} />
                    <Route path="/warehouses" element={<Warehouses />} />
                    <Route path="/warehouses/:warehouseId/inventories" element={<Inventories />} />
                    <Route path="/warehouses/new" element={<WarehousesForm />} />
                    <Route path="/warehouses/edit/:warehouseId" element={<WarehousesForm />} />
                    <Route path="/inventories" element={<Inventories />} />
                    <Route path="/inventories/:inventoryId" element={<Item />} />
                    <Route path="/inventories/new" element={<ItemForm />} />
                    <Route path="/inventories/edit/:inventoryId" element={<ItemForm />} />
                    <Route path="/*" element={<Error />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
