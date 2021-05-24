import React, { Component } from 'react';
import { HeaderView, FooterView } from '../../component/layouts';
import './about.scss';

import aboutImage from "../../assets/images/about-image.png"

class AboutView extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <React.Fragment>
                <div className="main-wrapper">
                    <HeaderView />
                    <div className="content-view about-section">
                        <div className="row">
                            <div className="col-sm-12 about-image">
                                <img alt={aboutImage} src={aboutImage} />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4 about-left">
                                <div className="box-wrapper">
                                    <h1>The Melon Story</h1>
                                </div>
                            </div>
                            <div className="col-sm-8 about-right">
                                <div className="box-wrapper text-left px-3 px-4">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae orci ut velit euismod consectetur in quis odio. Integer
                                        id tincidunt urna, vel ullamcorper eros. Mauris ullamcorper eu orci sit amet ultrices. Curabitur elementum vehicula                                pulvinar. Proin a scelerisque justo. Curabitur ac ex id neque accumsan tristique varius quis mauris. Praesent convallis
                                        vel massa at convallis. Quisque rhoncus, mauris vitae posuere mattis, massa ligula rhoncus nulla, in hendrerit eros mi
                                        quis sapien. Pellentesque fringilla turpis vitae ex elementum, at cursus mi posuere. Suspendisse potenti. Duis vitae
                                        eros libero. Pellentesque sapien lectus, ultrices sed tempor vel, laoreet posuere urna. Vivamus ullamcorper tellus ut
                                        arcu tincidunt, ac volutpat urna porta. Pellentesque eget odio nec sapien auctor molestie sed cursus arcu. Mauris ut venenatis lectus, id porttitor dui. Nam ante nunc, fringilla sit amet elit tristique, semper sodales elit.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FooterView />
                </div>
            </React.Fragment>
        )
    }
}

export default AboutView
