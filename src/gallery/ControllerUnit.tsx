import * as React from 'react';
import { ImgFiguresProps } from "./ImgFigures";
export interface ControllerUnitProps extends ImgFiguresProps {
}
export interface ControllerUnitState {

}
export default class ControllerUnit extends React.Component<ControllerUnitProps, ControllerUnitState> {
    constructor(props: ControllerUnitProps) {
        super(props);
    }
    handleClick(e: any) {
        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }
        e.stopPropagation();
        e.preventDefault();
    }
    render() {
        let controllerUnitClassName = 'controller-unit';
        if (this.props.arrange.isCenter) {
            controllerUnitClassName += ' fa fa-refresh is-center';
            if (this.props.arrange.isInverse) {
                controllerUnitClassName += ' is-inverse';
            }
        }
        return (
            <i className={controllerUnitClassName} onClick={this.handleClick.bind(this)}/>
        );
    }
}