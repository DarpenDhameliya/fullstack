import React, { useEffect, useRef ,useState} from "react";
import video from "./video.mp4";
import Container from "@mui/material/Container";

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.play();
  }, []);

  const handleclick = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };

  return (
    <>
     <Container
      component="main"
      maxWidth="xl"
      className="setcontainer"
    >
      <video
        ref={videoRef}
        id="video"
        width="320"
        height="240"
        muted
        onClick={handleclick}
        autoPlay
        loop
        
      >
        <source src={video} type="video/mp4" />
      </video>
      </Container>
    </>
  );
};

export default Video;
