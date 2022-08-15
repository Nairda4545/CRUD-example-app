import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchStream } from "../../actions";

const StreamShow = (props) => {
    useEffect(() => {
        props.fetchStream(props.match.params.id)
    }, [])

    if(!props.stream){
        return <div>Loading...</div>
    }

    return <div className="ui content">
        <div>Video Here</div>
        <h1>{props.stream.title}</h1>
        <h4>{props.stream.description}</h4>
    </div>
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
        currentUserId: state.auth.userId
    }
}

export default connect( mapStateToProps, { fetchStream } )(StreamShow)