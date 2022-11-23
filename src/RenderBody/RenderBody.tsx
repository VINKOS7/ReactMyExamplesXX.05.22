import React, {useState} from "react";

interface Props {
    page: React.ReactNode;
}

const RenderBody = (props : Props) => {
    let {page} = props;
    return <h1>{page}</h1>;
}

export default RenderBody;