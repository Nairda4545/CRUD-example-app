import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";
import history from "../../history";

const StreamEdit = (props) => {
    useEffect(() => {
        props.fetchStream(props.match.params.id)
    }, [])

    if(!props.stream){
        return <div>Loading...</div>
    }
    return <div>
        <div className="ui header">Edit Stream</div>
        <StreamForm onSubmitCallback={props.editStream} initialValues={props.stream} streamId={props.stream.id}/>
    </div>
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
        currentUserId: state.auth.userId
    }
}

export default connect( mapStateToProps, { fetchStream, editStream } )(StreamEdit)