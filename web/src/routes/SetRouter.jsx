import {BrowserRouter, Route, Routes} from "react-router-dom";
import routes from "./routes";
import React from "react";
const UseRouters = () =>{
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((item,index)=>{
                    return (
                        <Route
                            key = {index}
                            exact
                            path={item.path}
                            element={<item.component/>}
                            />
                    );
                })}
            </Routes>
        </BrowserRouter>
    )
}
export default UseRouters;