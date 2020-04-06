import React, { useEffect } from "react";
import { PhotoPicker } from "aws-amplify-react";
import { Auth, Storage } from "aws-amplify";

const previewStyle = {
  width: 320,
  height: 320,
  display: "flex",
  objectFit: "cover",
  borderRadius: "50%",
  marginLeft: "auto",
  marginRight: "auto",
  class: "center",
  alignItems: "center",
  justifyContent: "center"
  // center: {
  //   display: "block",
  //   marginLeft: "auto",
  //   marginRight: "auto",
  //   width: "50%"
  // }
};

function UploadPic() {
  const [fileUrl, setFileUrl] = React.useState("");
  const [file, setFile] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [previewSrc, setPreviewSrc] = React.useState(null);

  const handleChange = e => {
    const file = e.target.files[0];
    setFileUrl(URL.createObjectURL(file));
    setFile(file);
    setFileName(file.name);
  };

  const saveFile = () => {
    Storage.put(fileName, file)
      .then(() => {
        console.log("success");
        setFileUrl("");
        setFile("");
        setFileName("");
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <img src={previewSrc} style={previewStyle} />
      <PhotoPicker
        title="Hi"
        preview="hidden"
        onLoad={url => setPreviewSrc(url)}
      />
      <input type="file" onChange={handleChange} />
      <img src={fileUrl} />
      <button onClick={saveFile}>Save File</button>
    </div>
  );
}

export default UploadPic;
