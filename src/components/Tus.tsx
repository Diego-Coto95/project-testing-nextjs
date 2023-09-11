"use client";
import { useState } from "react";
import * as tus from "tus-js-client";

export default function Tus() {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const selectedFiles = e.target.files;
    setFiles(selectedFiles);
  };

  const handleUpload = () => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      const upload = new tus.Upload(file, {
        endpoint: "http://localhost:18080/upload/",
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
          filename: file.name,
          filetype: file.type,
        },
        onError: function (error) {
          console.log(`Failed to upload ${file.name} because: ${error}`);
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          console.log(`${file.name} - ${bytesUploaded} / ${bytesTotal} (${percentage}%)`);
        },
        onSuccess: function () {
          console.log(`Successfully uploaded ${file.name}.`);
        },
      });

      upload.start();
    });
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
