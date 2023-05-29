import React , {useState} from 'react'
import Container from "@mui/material/Container";

const DregANdDrop = () => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDragEnter = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    console.log(event.dataTransfer.files[0])
    console.log(droppedFiles)
    // setFiles(droppedFiles);
  };
  return (
    <>
      <Container
      component="main"
      maxWidth="xl"
      className="setcontainer"
    >
      <div
      className={`dropzon ${dragging ? 'dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
        <span>Drag and drop files here</span>
    </div>
    </Container>
    </>
  )
}

export default DregANdDrop