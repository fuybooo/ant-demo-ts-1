import { Spin } from "antd";
import * as React from "react";

class Loading extends React.Component {
    render() {
        // let className = 'loading-wrap' + this.props.show ? '' : ' dn';
        let className = 'loading-wrap';
        return (
            <div className={className}>
                <Spin/>
            </div>
        );
    }
}
export default Loading;