import React from 'react';
import { Carousel, WingBlank } from 'antd-mobile';

import './index.scss';

class CarouselCom extends React.Component {
    state = {
        data: [],
        currentIndex: 0,
    }

    afterChange = (index) => {
        this.setState({
            currentIndex: index
        })
    }

    render() {
        const { currentIndex } = this.state;
        const { data = [] } = this.props;

        return (
            <WingBlank>
                <Carousel
                    autoplay={true}
                    infinite
                    afterChange={this.afterChange}
                    dots={false}
                    cellSpacing={0}
                >
                    {data && Array.isArray(data) && data.length > 0 && data.map(val => (
                        <img
                            className="carousel-item-img"
                            key={val}
                            src={val}
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
