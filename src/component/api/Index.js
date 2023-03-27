import React from "react";
import Sidebar from "../header&sidebar/Sidebar";
import Home from "../pages/home/Home";
import { Switch, Route } from "react-router-dom";
import Partylist from "../pages/party/Partylist";
import Addproduct from "../pages/product/Addproduct";
import Productlist from "../pages/product/Productlist";
import EditProduct from "../pages/product/EditProduct";
import SellProdeltails from "../pages/sell/SellProdeltails";
import Viewcart from "../pages/cart/Viewcart";

const App = () => {
  return <>
    <div className="setdisplay">
      <Sidebar />
      <Switch>
        <Route path="/app/home">
          <Home />
        </Route>
        <Route path="/app/partylist">
          <Partylist />
        </Route>
        <Route path="/app/addproduct">
          <Addproduct />
        </Route>
        <Route path="/app/product">
          <Productlist />
        </Route>
        <Route path="/app/productupdate/:id">
          <EditProduct />
        </Route>
        <Route path="/app/sellreport">
          <SellProdeltails />
        </Route>
        <Route path="/app/cart">
          <Viewcart />
        </Route>
      </Switch>
    </div>
  </>;
};

export default App;
