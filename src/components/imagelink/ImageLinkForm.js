import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonClick }) => {

    return (
        <div>
            <p className='f3'>
           {'This magic brain will detect faces in your pictures'}
            </p>
          
            <div className='form center pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonClick}>
                Detect</button>
                </div>
           
        </div>

    )
}
export default ImageLinkForm;