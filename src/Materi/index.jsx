import React from "react";
import FormElement from "./Form/Pembahasan/FormElement";
import Validation from "./Form/Pembahasan/Validation";

export default class Form extends React.Component{
    render() {
        return (
            <div>
                <Validation />
            </div>
        )
    }
}