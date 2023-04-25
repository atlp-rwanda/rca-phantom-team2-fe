import React from "react";
const Toggle = () => {
    const [on, setOn] = React.useState(false);
    return <button id="btn" onClick={() => setOn(!on)}>{on ? "ON" : "OFF"}</button>
};
export default Toggle;