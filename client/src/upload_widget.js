const cloudName = "dfe8l6xnx";
const uploadPreset = "wetravel";

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
    sources: [ "local", "url", 'instagram', 'unsplash'], // restrict the upload sources to URL, local files, instagram, and unsplash
    cropping: true //add a cropping step
    
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      document
        .getElementById("uploadedimage")
        .setAttribute("src", result.info.secure_url);
    }
  }
);

document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);