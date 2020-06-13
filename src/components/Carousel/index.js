import React from 'react';
import { Carousel, WingBlank } from 'antd-mobile';

import './index.scss';

class CarouselCom extends React.Component {
    state = {
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
        currentIndex: 0,
    }

    afterChange = (index) => {
        this.setState({
            currentIndex: index
        })
    }

    render() {
        const { currentIndex, data } = this.state;

        return (
            <WingBlank>
                <Carousel
                    autoplay={true}
                    infinite
                    afterChange={this.afterChange}
                    dots={false}
                    cellSpacing={0}
                >
                    {data.map(val => (
                        <img
                            className="carousel-item-img"
                            key={val}
                            src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                            alt=""
                        />
                    ))}
                </Carousel>
                <div className="carousel-dot">{currentIndex+1}/{data.length}</div>
            </WingBlank>
        );
    }
}

export default CarouselCom;
