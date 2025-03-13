import React from "react";
import "../css/content.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Siderbar from "./siderbar";
import Video from "./video";
import Comment from "./comment";


function Content() {
    return (
        <div class="all-content container mt-4">
            <div class="row">
                <div class="row-left col-lg-8">
                    <Video></Video>
                    <Comment></Comment>
                </div>
                <div class="row-right all-sidebar col-lg-3">
                    <div>
                        <Siderbar></Siderbar>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content;