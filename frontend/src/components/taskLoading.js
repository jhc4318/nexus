import React from 'react';


export default function TaskLoading(Component) {
    return function TaskLoadingCOmponent({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />;
        return (
            <p style={{ fontSize: '25px' }}>
                Waiting for data...
            </p>
        );
    };
}