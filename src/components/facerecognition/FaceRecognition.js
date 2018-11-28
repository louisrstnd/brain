import React, { Component } from 'react';
import './FaceRecognition.css';


class FaceRecognition extends Component {



    render() {
        const boxes = this.props.box;

        return (
            <div>

                <div className='center ma'>
                    <div className='absolute mt2'>
                        <img id='image' ref='image' src={this.props.url} alt='img' height='400px' width='auto' />
                        {boxes.map((box) => {
                                return (
                                    <div className="bounding-box"
                                    style={{
                                        top: box.topRow,
                                        right: box.rightCol,
                                        bottom: box.bottomRow,
                                        left: box.leftCol,
                                    }}>
        
                                </div>
                                )
                        })
                    }


                    </div>
                </div>
            </div>

        )
    }
}
export default FaceRecognition;