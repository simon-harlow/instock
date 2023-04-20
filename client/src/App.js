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
import ItemFormEdit from './components/ItemForm/ItemFormEdit';
import Error from './components/Error/Error';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Warehouses />}></Route>
                    <Route path="/warehouses" element={<Warehouses />}></Route>
                    <Route path="/warehouses/:wid" element={<WarehouseDetail />}></Route>
                    <Route path="/warehouses/new" element={<WarehousesForm />}></Route>
                    <Route path="/warehouses/edit/:wid" element={<WarehousesForm />}></Route>
                    <Route path="/inventories" element={<Inventories />}></Route>
                    <Route path="/inventories/:iid" element={<Item />}></Route>
                    <Route path="/inventories/new" element={<ItemForm />}></Route>
                    <Route path="/inventories/edit/:iid" element={<ItemFormEdit />}></Route>
                    <Route path="/*" element={<Error />}></Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
