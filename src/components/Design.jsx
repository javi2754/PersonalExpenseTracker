import React from "react";

function Design(props){


    return(<div className="clip-backround" style={{ clipPath: props.position,
                                                    background: `${props.background}`,
                                                    background: `radial-gradient(circle, ${props.color1} 0%, ${props.color2} 100%)`}}>
    </div>);

}
export default Design;