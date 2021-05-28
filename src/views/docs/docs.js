import React, { Component } from 'react';
import { HeaderView, FooterView } from '../../component/layouts';
import './docs.scss';

class DocsView extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="main-wrapper">
                    <HeaderView />
                    <div className="content-view text-center">
                        <div className="content-view-inner">
                            <h1 style={{ color: 'white' }}>Coming Soon!</h1>
                        </div>
                    </div>
                    <FooterView />
                </div>
            </React.Fragment>
        )
    }
}

export default DocsView
