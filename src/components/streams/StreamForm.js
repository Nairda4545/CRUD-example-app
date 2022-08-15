import React from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";

const StreamForm = (props) => {
    const renderError = ({ touched, error }) => {
        if(touched && error){
            return <div className="ui error message">
                <div className="header">{error}</div>
            </div>
        }
    }

    const renderInput = ({ meta, label, input }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return <div className={className}>
            <label>{label}</label>
            <input {...input} autoComplete='off' />
            {renderError(meta)}
        </div>
    }
    
    return <div>
        <Form 
            initialValues={{
                title: `${props.initialValues ? props.initialValues.title : ''}`,
                description: `${props.initialValues ? props.initialValues.description : ''}`
            }}
            onSubmit={(formProps) => {
                props.onSubmitCallback({...formProps, id: props.streamId})
            }}
            validate={(formProps) => {
                const errors = {}
                if(!formProps.title){
                    errors.title = "Enter a title"
                }
                if(!formProps.description){
                    errors.description = "Describe the thing >:("
                }

                return errors
            }}
        >
            {(props) => {
                return <form onSubmit={props.handleSubmit} className="ui form error">
                    <Field 
                        name="title" 
                        component={renderInput} 
                        label="Enter Title"
                    />
                    <Field 
                        name="description" 
                        component={renderInput} 
                        label="Enter Description"
                    />
                    <button className="ui button primary">Submit</button>
                </form>
            }}
        </Form>
    </div>
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentUserId: state.auth.userId,
    }
}

export default connect( mapStateToProps , {} )(StreamForm)