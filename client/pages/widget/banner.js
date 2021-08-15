import React, { PureComponent } from 'react'

class Banner extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div className="m_banner" >
            <img src="/banner/offer_banner_1.png"/>
            </div>
        )
    }
}

export default Banner