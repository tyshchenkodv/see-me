import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: Boolean(error),
            errorInfo: errorInfo,
        });
    }

    render() {
        const { hasError, errorInfo } = this.state;

        if (hasError) {
            return <div className="alert alert-danger" role="alert">
                Something went wrong! Error info: {JSON.stringify(errorInfo)}
            </div>;
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.oneOfType([ PropTypes.object, PropTypes.array, PropTypes.func ]).isRequired,
};
