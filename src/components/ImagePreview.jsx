import { useEffect, useState } from 'react';

export default function ImagePreview({ filePreview }) {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (!filePreview) {
      setImgSrc(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setImgSrc(event.target.result);
    };
    reader.readAsDataURL(filePreview);
  }, [filePreview]);

  if (!filePreview) return null; 

  return (
    <div className="preview-frame">
      {imgSrc && (
        <img
          src={imgSrc}
          alt={filePreview.name}
          className="preview-image"
        />
      )}
    </div>
  );
}