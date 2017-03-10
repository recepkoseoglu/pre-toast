import React, {Component} from "react";
import {Card, CardActions, CardMedia, CardTitle, CardText} from "material-ui/Card";
import {RadioButton, RadioButtonGroup} from "material-ui/RadioButton";
import FlatButton from "material-ui/FlatButton";
import Toast from "../lib/Toast";

export default class App extends Component {

    state = {
        value: 5,
    };

    render() {
        return (
            <div style={{maxWidth: 600, margin: "0 auto"}}>
                <Card>
                    <CardTitle title="Pre Toast" subtitle="PreSort"/>
                    <CardText>
                        Toast is a toaster message showing utility. Helps developer to show toaster messages easly and
                        in a standardized way
                    </CardText>

                    <RadioButtonGroup
                        style={{marginLeft: 15}}
                        name="shipSpeed"
                        onChange={this.onChangePosition}
                        defaultSelected="top-right">
                        <RadioButton
                            value="top-left"
                            label="Top-Left"/>
                        <RadioButton
                            value="top-right"
                            label="Top-Right"/>
                        <RadioButton
                            value="bottom-left"
                            label="Bottom-Left"/>
                        <RadioButton
                            value="bottom-right"
                            label="Bottom-Right"/>
                    </RadioButtonGroup>
                    <br />
                    <CardActions>
                        <FlatButton onClick={this.toastMessage("info")} label="Info"
                                    labelStyle={{color: "#5bc0de"}}/>
                        <FlatButton onClick={this.toastMessage("success")} label="Success"
                                    labelStyle={{color: "#5cb85c"}}/>
                        <FlatButton onClick={this.toastMessage("warning")} label="Warning"
                                    labelStyle={{color: "#f0ad4e"}}/>
                        <FlatButton onClick={this.toastMessage("error")} label="Error"
                                    labelStyle={{color: "#d9534f"}}/>
                    </CardActions>
                </Card>
            </div>);
    }

    toastMessage = (type) => {
        return () => {
            switch (type) {
                case "info":
                    Toast.info("info message D asd saD ");
                    break;
                case "success":
                    Toast.success("success message", "Success adSA asd SDsad aSD");
                    break;
                case "warning":
                    Toast.warning("warning message sad sAD asd aSD as das ", "Warning", 203000);
                    break;
                case "error":
                    Toast.error("error message", "Error", 5000, () => {
                        alert("callback");
                    });
                    break;
                default:
                    throw new Error("Unknown Message");
            }
        };
    };

    toastConfiguration = (property, value) => {
        let conf = {};
        conf[property] = value;
        Toast.configuration(conf);
    }

    onChangePosition = (event, value) => {
        this.toastConfiguration("position", value);
    };

    handleChange = (event, index, value) => {
        console.log(value)
        this.toastConfiguration("maxVisible", value);
    };


}