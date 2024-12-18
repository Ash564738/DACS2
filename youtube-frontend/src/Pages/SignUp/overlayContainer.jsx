import React from 'react';
import 'flatpickr/dist/flatpickr.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './signUp.css';
import 'react-toastify/dist/ReactToastify.css';
const OverlayContainer = () => {
    return (
        <div className="overlay-container w-50 h-100 justify-content-center align-items-center p-0 m-0">
        <div className="overlay">
            <div className="overlay-panel overlay-left d-flex align-items-center justify-content-center overflow-hidden">
                <div className="animate-slide slide-content active w-100 h-100 align-items-center justify-content-center flex-column position-relative" id="slide-1" style={{ height: '500px' }}>
                    <img src="https://media.giphy.com/media/fxqzWdjvacWEie6gho/giphy.gif?cid=82a1493bsfu4ketb56yjt7sm5lcsegkaktyk4i6e03dss8h7&ep=v1_stickers_trending&rid=giphy.gif&ct=s" alt="background" height="400" className="position-absolute w-100" style={{ zIndex: 0, top: 0, objectFit: 'contain' }} />
                    <img src="https://media.giphy.com/media/FjWvPN1ljbdfOXlKGJ/giphy.gif?cid=ecf05e47ddeauulejt31jekl9w17fprgxufi3bhn56snvpg5&ep=v1_gifs_related&rid=giphy.gif&ct=ts" alt="details" height="250" className="position-absolute w-80" style={{ zIndex: 0, top: '300px', objectFit: 'contain' }} />
                </div>
                <div className="animate-slide slide-content w-100 h-100 align-items-center justify-content-center flex-column position-relative" id="slide-2" style={{ height: '500px' }}>
                    <div className="d-flex w-100 align-items-center justify-content-center">
                        <img src="https://media.giphy.com/media/Stcu1RKJfvPcghYqUN/giphy.gif?cid=ecf05e47iiawtlu9nzfytre095y7jwk3mlk1b906ps4upmdq&ep=v1_gifs_related&rid=giphy.gif&ct=s" alt="background" height="350" className="position-absolute w-100" style={{ color: 'transparent', zIndex: 0, top: 0, objectFit: 'contain' }} />
                        <img src="https://media.giphy.com/media/HA0mTAyYUJthwBWKkI/giphy.gif?cid=ecf05e4747z9bfk2n7fxhrja3qh4oj6e9akd8n3g3gst5kul&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="details" height="100" className="position-absolute w-80" style={{ color: 'transparent', zIndex: 0, top: '350px', objectFit: 'contain' }} />
                    </div>
                </div>
                <div className="animate-slide slide-content w-100 h-100 align-items-center justify-content-center flex-column position-relative" id="slide-3" style={{ height: '500px' }}>
                    <div className="d-flex w-100 align-items-center justify-content-center">
                        <img src="https://media.giphy.com/media/HCwnYWnMgLZUW1BtP2/giphy.gif?cid=ecf05e47xevwfjnbf5yudikky6unae3wydl67gqqp7v9t9is&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="background" height="350" className="position-absolute w-100" style={{ color: 'transparent', zIndex: 0, top: 0, objectFit: 'contain' }} />
                        <img src="https://media.giphy.com/media/XtwvQC1cx5uuCgCsOH/giphy.gif?cid=ecf05e47fz0rh3j8owfhvpjtazezbof39bymem0972ee7ddq&ep=v1_stickers_search&rid=giphy.gif&ct=ts" alt="details" height="180" className="position-absolute w-80" style={{ color: 'transparent', zIndex: 0, top: '280px', objectFit: 'contain' }} />
                    </div>
                </div>
                <div className="animate-slide slide-content w-100 h-100 align-items-center justify-content-center flex-column position-relative" id="slide-4" style={{ height: '500px' }}>
                    <div className="d-flex w-100 align-items-center justify-content-center">
                        <img src="https://media.giphy.com/media/bUbGhADoOB4fHulPpE/giphy.gif?cid=ecf05e47ae7xh0rjskzmjbjeigfi8b9kipl9rf3dmw54ufgq&ep=v1_gifs_related&rid=giphy.gif&ct=s" alt="background" height="350" className="position-absolute w-100" style={{ color: 'transparent', zIndex: 0, top: 0, objectFit: 'contain' }} />
                        <img src="https://media.giphy.com/media/2SDGRecRVr42fIpCyT/giphy.gif?cid=790b7611j5uaetjykpuercavq5dk4zt2bjhyzq1un36d9so0&ep=v1_stickers_search&rid=giphy.gif&ct=ts" alt="details" height="100" className="position-absolute w-80" style={{ color: 'transparent', zIndex: 0, top: '320px', objectFit: 'contain' }} />
                    </div>
                </div>
                <div className="d-flex align-items-center w-100 h-100 justify-content-center position-relative animate-slide">
                    <ul className="d-flex align-items-center justify-content-around rounded-pill px-2 position-absolute custom-rounded-pill" >
                        <li className="d-flex align-items-center justify-content-center indicator clickable-text" data-target="slide-1">
                            <div className="rounded-circle" style={{ backgroundColor:"white"}}></div>
                        </li>
                        <li className="d-flex align-items-center justify-content-center indicator clickable-text" data-target="slide-2">
                            <div className="rounded-circle"></div>
                        </li>
                        <li className="d-flex align-items-center justify-content-center indicator clickable-text" data-target="slide-3">
                            <div className="rounded-circle"></div>
                        </li>
                        <li className="d-flex align-items-center justify-content-center indicator clickable-text" data-target="slide-4">
                            <div className="rounded-circle"></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="overlay-panel overlay-right d-flex align-items-center justify-content-center overflow-hidden">
                <div className="animate-slide slide-content active w-100 h-100 align-items-center justify-content-center flex-column position-relative" id="slide-5" style={{ height: '500px' }}>
                    <img src="https://media.giphy.com/media/fxqzWdjvacWEie6gho/giphy.gif?cid=82a1493bsfu4ketb56yjt7sm5lcsegkaktyk4i6e03dss8h7&ep=v1_stickers_trending&rid=giphy.gif&ct=s" alt="background" height="400" className="position-absolute w-100" style={{ zIndex: 0, top: 0, objectFit: 'contain' }} />
                    <img src="https://media.giphy.com/media/FjWvPN1ljbdfOXlKGJ/giphy.gif?cid=ecf05e47ddeauulejt31jekl9w17fprgxufi3bhn56snvpg5&ep=v1_gifs_related&rid=giphy.gif&ct=ts" alt="details" height="250" className="position-absolute w-80" style={{ zIndex: 0, top: '300px', objectFit: 'contain' }} />
                </div>
                <div className="animate-slide slide-content w-100 h-100 align-items-center justify-content-center flex-column position-relative" id="slide-6" style={{ height: '500px' }}>
                    <div className="d-flex w-100 align-items-center justify-content-center">
                        <img src="https://media.giphy.com/media/Stcu1RKJfvPcghYqUN/giphy.gif?cid=ecf05e47iiawtlu9nzfytre095y7jwk3mlk1b906ps4upmdq&ep=v1_gifs_related&rid=giphy.gif&ct=s" alt="background" height="350" className="position-absolute w-100" style={{ color: 'transparent', zIndex: 0, top: 0, objectFit: 'contain' }} />
                        <img src="https://media.giphy.com/media/HA0mTAyYUJthwBWKkI/giphy.gif?cid=ecf05e4747z9bfk2n7fxhrja3qh4oj6e9akd8n3g3gst5kul&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="details" height="100" className="position-absolute w-80" style={{ color: 'transparent', zIndex: 0, top: '350px', objectFit: 'contain' }} />
                    </div>
                </div>
                <div className="animate-slide slide-content w-100 h-100 align-items-center justify-content-center flex-column position-relative" id="slide-7" style={{ height: '500px' }}>
                    <div className="d-flex w-100 align-items-center justify-content-center">
                        <img src="https://media.giphy.com/media/HCwnYWnMgLZUW1BtP2/giphy.gif?cid=ecf05e47xevwfjnbf5yudikky6unae3wydl67gqqp7v9t9is&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="background" height="350" className="position-absolute w-100" style={{ color: 'transparent', zIndex: 0, top: 0, objectFit: 'contain' }} />
                        <img src="https://media.giphy.com/media/XtwvQC1cx5uuCgCsOH/giphy.gif?cid=ecf05e47fz0rh3j8owfhvpjtazezbof39bymem0972ee7ddq&ep=v1_stickers_search&rid=giphy.gif&ct=ts" alt="details" height="180" className="position-absolute w-80" style={{ color: 'transparent', zIndex: 0, top: '280px', objectFit: 'contain' }} />
                    </div>
                </div>
                <div className="animate-slide slide-content w-100 h-100 align-items-center justify-content-center flex-column position-relative" id="slide-8" style={{ height: '500px' }}>
                    <div className="d-flex w-100 align-items-center justify-content-center">
                        <img src="https://media.giphy.com/media/bUbGhADoOB4fHulPpE/giphy.gif?cid=ecf05e47ae7xh0rjskzmjbjeigfi8b9kipl9rf3dmw54ufgq&ep=v1_gifs_related&rid=giphy.gif&ct=s" alt="background" height="350" className="position-absolute w-100" style={{ color: 'transparent', zIndex: 0, top: 0, objectFit: 'contain' }} />
                        <img src="https://media.giphy.com/media/2SDGRecRVr42fIpCyT/giphy.gif?cid=790b7611j5uaetjykpuercavq5dk4zt2bjhyzq1un36d9so0&ep=v1_stickers_search&rid=giphy.gif&ct=ts" alt="details" height="100" className="position-absolute w-80" style={{ color: 'transparent', zIndex: 0, top: '320px', objectFit: 'contain' }} />
                    </div>
                </div>
                <div className="d-flex align-items-center w-100 h-100 justify-content-center position-relative animate-slide">
                    <ul className="d-flex align-items-center justify-content-around rounded-pill px-2 position-absolute custom-rounded-pill" >
                        <li className="d-flex align-items-center justify-content-center indicator clickable-text" data-target="slide-5">
                            <div className="rounded-circle" style={{ backgroundColor:"white"}}></div>
                        </li>
                        <li className="d-flex align-items-center justify-content-center indicator clickable-text" data-target="slide-6">
                            <div className="rounded-circle"></div>
                        </li>
                        <li className="d-flex align-items-center justify-content-center indicator clickable-text" data-target="slide-7">
                            <div className="rounded-circle"></div>
                        </li>
                        <li className="d-flex align-items-center justify-content-center indicator clickable-text" data-target="slide-8">
                            <div className="rounded-circle"></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    )
}
export default OverlayContainer