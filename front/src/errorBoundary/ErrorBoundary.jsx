import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorInfo: null, errorEvent: null};
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: !!error,
            errorInfo,
        })
    }

    render() {
        if (this.state.hasError) {
            return <div className="alert alert-danger" role="alert">
                Something went wrong!
            </div>;
        }

        return this.props.children;
    }
}
