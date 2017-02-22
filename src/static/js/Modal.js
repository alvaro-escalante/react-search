import React from 'react';

const Modal = ({isOpen, onClose}) => {

  const renderModal = () => {
    return (
      <div>
        <div class='modal-sharing'>
        <button class="close-share" onClick={onClose}></button>
          <div class='logo'></div>
          <div class='content'>
            <h2 class="modal-heading">
              In this website written with React.js, GTM is implemented by
            </h2>
            <ul class='track-list'>
              <li>Tracking Virtual pages: Technology and Languages</li>
              <li>Tracking Click interations</li>
              <li>Tracking Search interations</li>
            </ul>         
          </div> 
          <div class='image'>
            <img src='static/img/gtm.jpg' />
          </div>
          
         </div>
        <div class="backdrop" onClick={onClose} />
      </div>
    )
  }

  return (isOpen) ? renderModal() : null;
}



export default Modal