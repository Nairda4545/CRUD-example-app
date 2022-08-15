import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import flv from 'flv.js'

import { fetchStream } from "../../actions";

const StreamShow = (props) => {
    const videoRef = useRef()
    let player = null

    useEffect(() => {
        props.fetchStream(props.match.params.id)

        return () => {
            if(player){
                player.destroy()
            }
        }
    }, [])

    useEffect(() => {
        buildPlayer()
    })

    const buildPlayer = () => {
        if(player || !props.stream){
            console.log('nothing')
            return
        }

        player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${props.match.params.id}.flv`
        })
        player.attachMediaElement(videoRef.current)
        player.load()
    }

    if(!props.stream){
        return <div>Loading...</div>
    }

    return <div className="ui content">
        <video ref={videoRef} style={{ width: '100%'}} controls/>
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