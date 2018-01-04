import * as React from 'react';
import { Spin } from 'antd';
import './loading.css';
interface LoadingProps {
    readonly spin: string;
}
export default class Loading extends React.Component<LoadingProps> {
    render() {
        let className = `loading-mask ${this.props.spin ? 'dn' : ''}`;
        return (
            <div className={className}>
                <Spin className="loading-spin" size="large"/>
            </div>
        );
    }
}
