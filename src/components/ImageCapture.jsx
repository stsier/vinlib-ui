
import React from 'react';
import { f7, Popup } from 'framework7-react';

import Webcam from "react-webcam";

import Keystone6 from "./Keystone6";


const ImageCapture = (props, ref) => {


  const webcamRef = React.useRef();
  
  const [data, setData] = React.useState({});

  // external component API
  React.useImperativeHandle(ref, () => ({
    captureImage() {
      capture()
    },
    showLastImage() {
      show()
    }
  }), []);

  const show = () => {
    f7.popup.open("#last-photo-popup");
  }
  const hide = () => {
    f7.popup.close("#last-photo-popup");
  }
  const capture = () => {
    //console.log("Props in captureImage :", msg);
    const d = new Date();
    let textDate = d.toISOString().split(".")[0].replace(/:/g,"_");
  
    setData({ 
      image: webcamRef.current.getScreenshot({ width: 1920, height: 1080 }),
      title: textDate
    });
    show();
  }

  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "environment"
  };

  return (
    <>
      <Webcam
        audio={false}
        height={0.5625 * (window.innerWidth)}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={window.innerWidth}
        videoConstraints={videoConstraints}
      />
      <Popup id="last-photo-popup">
          <Keystone6 data = { data } type="camera" callback = { hide }> </Keystone6>
      </Popup>
    </>

  );
};
export default React.forwardRef(ImageCapture);

// <Button fill raised onClick={() => sendToAnalyse()}>Search this image</Button>