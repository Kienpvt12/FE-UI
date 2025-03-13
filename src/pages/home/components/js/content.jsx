import React from "react";
import "../css/content.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Slider from "./slider";
import Siderbar from "./siderbar";
import Product from "./product";

function Content() {
    return (
        <div className="all-content container mt-4">
            <div className="row">
                <div className="row-left col-lg-8">
                    <Slider></Slider>
                    <Product></Product>
                </div>
                <div className="row-right all-sidebar col-lg-3">
                    <div>
                    <Siderbar></Siderbar>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content;