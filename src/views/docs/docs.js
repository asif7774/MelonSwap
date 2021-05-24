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
                        <h1>Coming Soon!</h1>
                    </div>
                    <FooterView />
                </div>
            </React.Fragment>
        )
    }
}

export default DocsView
