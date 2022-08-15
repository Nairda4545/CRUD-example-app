import React from "react";
import { connect } from "react-redux";

import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamCreate = (props) => {
    return <div>
        <div className="ui header">Create Stream</div>
        <StreamForm onSubmitCallback={props.createStream} />
    </div>
}

export default connect( null, { createStream } )(StreamCreate)