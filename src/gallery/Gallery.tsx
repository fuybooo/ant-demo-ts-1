import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ImgFigures from "./ImgFigures";
import './Gallery.css';
import ControllerUnit from "./ControllerUnit";
let imageData = require('./imageDatas.json');
export interface GalleryProps {

}
export interface GalleryState {
    imgArrangeArr: ImgState[];
}
export interface ImgState {
    pos: {
        top: number,
        left: number
    };
    rotate: number;
    isCenter: boolean;
    isInverse?: boolean;
}
export function getRangeRandom(low: number, high: number) {
    return Math.ceil(Math.random() * (high - low) + low);
}
export function get30DegRandom(): number {
    return +((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}
export default class Gallery extends React.Component<GalleryProps, GalleryState> {
    constant = {
        centerPos: {
            left: 0,
            top: 0
        },
        hPosRange: {
            leftSecX: [0, 0],
            rightSecX: [0, 0],
            y: [0, 0]
        },
        vPosRange: {
            x: [0, 0],
            topY: [0, 0]
        }
    };
    constructor(props: GalleryProps) {
        super(props);
        this.state = {
            imgArrangeArr: []
        };
    }
    inverse(index: number) {
        return () => {
            this.state.imgArrangeArr[index].isInverse = !this.state.imgArrangeArr[index].isInverse;
            this.setState({imgArrangeArr: this.state.imgArrangeArr});
        };
    }
    center(index: number) {
        return () => {
            this.rearrange(index);
        };
    }
    rearrange(index: number) {
        let imgTopArr: ImgState[] = [];
        let topImgSpliceIndex = 0;
        let topImgNum = Math.floor(Math.random() * 2);
        let imgCenter: ImgState = this.state.imgArrangeArr.splice(index, 1)[0];
        imgCenter = {
            pos: this.constant.centerPos,
            rotate: 0,
            isCenter: true
        };
        topImgSpliceIndex = Math.ceil(Math.random() * this.state.imgArrangeArr.length - topImgNum);
        imgTopArr = this.state.imgArrangeArr.splice(topImgSpliceIndex, topImgNum);
        imgTopArr.forEach((value, i) => {
            imgTopArr[i] = {
                pos: {
                    top: getRangeRandom(this.constant.vPosRange.topY[0], this.constant.vPosRange.topY[1]),
                    left: getRangeRandom(this.constant.vPosRange.x[0], this.constant.vPosRange.x[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            };
        });
        for (let i = 0, j = this.state.imgArrangeArr.length, k = j / 2; i < j; i ++) {
            let hPosRangeLORX = null;
            if (i < k) {
                hPosRangeLORX = this.constant.hPosRange.leftSecX;
            } else {
                hPosRangeLORX = this.constant.hPosRange.rightSecX;
            }
            this.state.imgArrangeArr[i] = {
                pos: {
                    top: getRangeRandom(this.constant.hPosRange.y[0], this.constant.hPosRange.y[1]),
                    left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            };
        }
        if (imgTopArr && imgTopArr[0]) {
            this.state.imgArrangeArr.splice(topImgSpliceIndex, 0, imgTopArr[0]);
        }
        this.state.imgArrangeArr.splice(index, 0, imgCenter);
        this.setState({
            imgArrangeArr: this.state.imgArrangeArr
        });

    }
    componentDidMount() {
        let stageDOM = ReactDOM.findDOMNode(this.refs.stage);
        let stageWidth = stageDOM.scrollWidth;
        // let stageHeight = stageDOM.scrollHeight;
        let stageHeight = document.body.scrollHeight;
        let halfStageWidth = Math.ceil(stageWidth / 2);
        let halfStageHeight = Math.ceil(stageHeight / 2);
        
        let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0);
        let imgFigureWidth = imgFigureDOM.scrollWidth;
        let imgFigureHeight = imgFigureDOM.scrollHeight;
        let halfImgFigureWidth = Math.ceil(imgFigureWidth / 2);
        let halfImgFigureHeight = Math.ceil(imgFigureHeight / 2);
        
        this.constant = {
            centerPos: {
                left: halfStageWidth - halfImgFigureWidth,
                top: halfStageHeight - halfImgFigureHeight
            },
            hPosRange: {
                leftSecX: [-halfStageWidth, halfStageWidth - halfImgFigureWidth * 3],
                rightSecX: [halfStageWidth + halfImgFigureWidth, stageWidth - halfImgFigureWidth],
                y: [-halfImgFigureHeight, stageHeight - halfImgFigureHeight]
            },
            vPosRange: {
                x: [-halfImgFigureHeight, halfStageHeight - halfImgFigureHeight * 3],
                topY: [halfStageWidth - imgFigureWidth, halfStageWidth]
            }
        };
        this.rearrange(0);
    }
    render () {
        let imgFigures: any = [];
        let controllerUnits: any = [];
        imageData.forEach((item: any, index: number) => {
            if (!this.state.imgArrangeArr[index]) {
                this.state.imgArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    },
                    rotate: 0,
                    isInverse: false,
                    isCenter: false
                };
            }
            imgFigures.push(<ImgFigures ref={'imgFigure' + index} key={index} data={item} arrange={this.state.imgArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)} />);
            controllerUnits.push(<ControllerUnit key={index} data={item} arrange={this.state.imgArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)} />);
        });
        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        );
    }
}