import { useState, useRef } from "react";
const WebcamCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setMediaStream(stream);
    } catch (error) {
      console.error("Error accessing webcam", error);
    }
  };

  // Function to stop the webcam
  const stopWebcam = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      setMediaStream(null);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Set canvas dimensions to match video stream
      if (context && video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw video frame onto canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get image data URL from canvas
        const imageDataUrl = canvas.toDataURL("image/jpeg");

        // Set the captured image
        setCapturedImage(imageDataUrl);

        // Stop the webcam
        stopWebcam();

        // You can do something with the captured image here, like save it to state or send it to a server
      }
    }
  };

  // Function to reset state (clear media stream and refs)
  const resetState = () => {
    stopWebcam(); // Stop the webcam if it's active
    setCapturedImage(null); // Reset captured image
  };

  return (
    <WebcamContainer>
      {capturedImage ? (
        <>
          <PreviewImg src={capturedImage} className="captured-image" />
          <WebcamButton onClick={resetState}>Reset</WebcamButton>
        </>
      ) : (
        <>
          <WebcamVideo ref={videoRef} autoPlay muted />
          <WebcamCanvas ref={canvasRef} />
          {!videoRef.current ? (
            <WebcamButton onClick={startWebcam}>Start Webcam</WebcamButton>
          ) : (
            <WebcamButton onClick={captureImage}>Capture Image</WebcamButton>
          )}
        </>
      )}
    </WebcamContainer>
  );
};

export default WebcamCapture;