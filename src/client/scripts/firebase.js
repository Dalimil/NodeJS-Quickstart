
const firebase = require("firebase");

// Initialize Firebase
const config = {
	apiKey: "AIzaSyDKe7rZIlN9CbvzH6Uvoo_BHavNdvLa_jg",
	authDomain: "hackathon-quickstart-4f3dd.firebaseapp.com",
	databaseURL: "https://hackathon-quickstart-4f3dd.firebaseio.com",
	storageBucket: "hackathon-quickstart-4f3dd.appspot.com"
};

firebase.initializeApp(config);

const storage = firebase.storage();

/**
 * Assume this HTML:
 * <input type="file" value="upload" id="fileButton" />
 */
function fileUploadDemo() {
  $("#fileButton").on('change', e => {
    const file = e.target.files[0];
    const uploadTask = storage.ref().child(`images/${file.name}`).put(file);
    
    uploadTask.on('state_changed',
      function progress(snapshot) {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + percent + '% done');
      },
      function error(err) {
        // Handle unsuccessful uploads
      },
      function complete() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        const downloadURL = uploadTask.snapshot.downloadURL;
      }
    );
  });
}

/**
 * File download - need to configure CORS first (for XHR):
 * https://firebase.google.com/docs/storage/web/download-files#cors_configuration
 */
function fileDownloadDemo() {
  storageRef.child('images/stars.jpg').getDownloadURL().then(function(url) {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element:
    const img = document.getElementById('myimg');
    img.src = url;
  }).catch(function(error) {
    // Handle any errors
  });
}


