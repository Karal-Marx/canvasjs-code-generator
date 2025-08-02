import { useState } from "react";
import Header from "./components/Header";
import FileHandler from "./components/FileHandler";
import ImagePreview from "./components/ImagePreview";
import CodeArea from "./components/CodeArea";

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [generatedCode, setGeneratedCode] = useState(null);

  const handleFileSelection = (file) => {
    setSelectedFile(file);
  };

  const onGenerate = (file) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvasCode = `
  const canvas = document.createElement('canvas');
  canvas.width = ${img.width};
  canvas.height = ${img.height};
  const ctx = canvas.getContext('2d');

  const img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
  img.src = "${img.src}";
  document.body.appendChild(canvas);
        `.trim();

        setGeneratedCode(canvasCode);
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <Header/>
      <div className="main-container">
        <div className="file-handler-container">
          <FileHandler onFileLoad={handleFileSelection} onGenerate={onGenerate}/>
        </div>
        <ImagePreview filePreview={selectedFile}/>
      </div>
      <div>
        <CodeArea generatedCode={generatedCode}/>
      </div>
      
    </>
  );
}
