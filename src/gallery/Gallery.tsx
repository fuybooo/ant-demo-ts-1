import * as React from 'react';
import ImgFigures from "./ImgFigures";
let imageData = require('./imageDatas.json');
// let img1 = require('./images/1.jpg');
// console.log(img1);
export interface GalleryProps {

}
export interface GalleryState {
    imgArrangeArr: any;
}
export default class Gallery extends React.Component<GalleryProps, GalleryState> {
    inverse(index: number) {
        console.log(index);
    }
    center(index: number) {
        console.log(index);
    }
    render () {
        let imgFigures: any = [];
        imageData.forEach((item: string, index: number) => {
            imgFigures.push(<ImgFigures key={index} data={item} ref={'imgFigure' + index} arrange={this.state.imgArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)} />);
        });
        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {imgFigures}
                </nav>
            </section>
        );
    }
}