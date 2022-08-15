import React, { useEffect } from "react";
import { connect } from "react-redux";
import history from "../../history";

import { deleteStream, fetchStream } from "../../actions";
import Modal from "../Modal";

const StreamDelete = (props) => {

    useEffect(() => {
        props.fetchStream(props.match.params.id)
    }, [])

    const renderActions = () => {
        return <React.Fragment>
                <button onClick={() => props.deleteStream(props.match.params.id)} className="ui negative button">Delete</button>
                <button onClick={() => history.push('/')} className="ui button">Cancel</button>
            </React.Fragment>
    }

    const renderTitle = () => {
        if(!props.stream){
            return 'Delete Stream'
        }
        return `Delete Stream ${props.stream.title}`
    }

    return <Modal 
                title={renderTitle()}
                content='Are you sure you want to delete this stream?'
                actions={renderActions()}
                onDismiss={() => history.push('/')}
            />
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
        currentUserId: state.auth.userId
    }
}

export default connect( mapStateToProps, { deleteStream, fetchStream } )(StreamDelete)