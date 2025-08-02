import { useState } from 'react'

export default function FileHandler({onFileLoad, onGenerate}) {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        if (onFileLoad) {
            onFileLoad(e.target.files[0]);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onGenerate) {
            onGenerate(selectedFile);
        }
    };

    return (
    <form className="file-upload-form" onSubmit={handleSubmit}>
        <label htmlFor='fileInput'>Select file: </label>
        <input 
            type="file"
            id="fileInput"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
        />
        <input
            type="text"
            className="filename-textbox"
            value={selectedFile ? selectedFile.name : "Choose a file"}
            readOnly
            onClick={() => document.getElementById('fileInput').click()} 
            tabIndex={0}
            style={{ cursor: 'pointer' }}
        />
        <button
            className="generate-code-button"
            type='submit'
            disabled={!selectedFile}
        >
            Generate
        </button>
        </form>
    )
}