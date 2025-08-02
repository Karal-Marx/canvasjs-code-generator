export default function CodeArea({ generatedCode }) {
    const handleCopy = () => {
        if (generatedCode) {
            navigator.clipboard.writeText(generatedCode)
                .then(() => {
                    alert("Code copied to clipboard!");
                })
                .catch((err) => {
                    console.error("Failed to copy:", err);
                });
        }
    };
    return (
        generatedCode && (
            <div className="code-area">
                <div className="top-bar">
                    <span>Canvas.js Code</span>
                    <button onClick={handleCopy}>copy</button>
                </div>
                <div className="text-area">
                    <pre>
                        <code>{generatedCode}</code>
                    </pre>
                </div>
            </div>
        )
    )
}