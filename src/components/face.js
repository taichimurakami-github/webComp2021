import photo from '../images/smile.jpg';
import styles from "./styles/face.scss";

const send = () => {

}


const main = async (setInfo) => {

  const msRest = require("@azure/ms-rest-js");
  const Face = require("@azure/cognitiveservices-face");
  const { v4: uuid } = require("uuid");
  const key = "a27553b0195a46239a6d129bda16169e"
  const endpoint = "https://webcomp2021-taichimurakami.cognitiveservices.azure.com/"

  const credentials = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } });
  const client = new Face.FaceClient(credentials, endpoint);

  const image_base_url = "https://csdx.blob.core.windows.net/resources/Face/Images/";
  const person_group_id = uuid();
  const image_file_names = [
    // "detection1.jpg",    // single female with glasses
    // "detection2.jpg", // (optional: single man)
    // "detection3.jpg", // (optional: single male construction worker)
    // "detection4.jpg", // (optional: 3 people at cafe, 1 is blurred)
    "detection5.jpg",    // family, woman child man
    // "detection6.jpg"     // elderly couple, male female
  ];

  const image_file_name = image_file_names[0];
  const IMAGES_URL = "https://xs12321.xsrv.jp/angry_man_01.jpg";
  const DETECT_WITH_URL_OPTIONS = {
    returnFaceAttributes: ["Accessories", "Age", "Blur", "Emotion", "Exposure", "FacialHair", "Gender", "Glasses", "Hair", "HeadPose", "Makeup", "Noise", "Occlusion", "Smile"],
    detectionModel: "detection_01"
  }
  const returnResult = {}
  const DetectFaceExtract = async () => {

    console.log("========DETECT FACES========");

    //FACE API detectWithUrl
    let detected_faces = await client.face.detectWithUrl(IMAGES_URL, DETECT_WITH_URL_OPTIONS);
    console.log(detected_faces[0]);

    //display results
    console.log(detected_faces.length + " face(s) detected from image " + image_file_name + ".");
    console.log("Face attributes for face(s) in " + image_file_name + ":");
    console.log("これは表示される");
    await new Promise(resolve => {
      const face = detected_faces[0];
      //get the bounding box of the face
      console.log("Bounding box:\n  Left: " + face.faceRectangle.left + "\n  Top: " + face.faceRectangle.top + "\n  Width: " + face.faceRectangle.width + "\n  Height: " + face.faceRectangle.height);
      returnResult.bounding = face.faceRectangle;

      // Get face other attributes
      console.log("Age: " + face.faceAttributes.age);
      returnResult.age = face.faceAttributes.age;

      // Get emotion on the face
      let emotions = "";
      let emotion_threshold = 0.0;//感情の閾値を設定する変数
      console.log("faceEmotion Attoributes: ", face.faceAttributes.emotion);
      if (face.faceAttributes.emotion.anger > emotion_threshold) { emotions += "anger, "; }
      if (face.faceAttributes.emotion.contempt > emotion_threshold) { emotions += "contempt, "; }
      if (face.faceAttributes.emotion.disgust > emotion_threshold) { emotions += "disgust, "; }
      if (face.faceAttributes.emotion.fear > emotion_threshold) { emotions += "fear, "; }
      if (face.faceAttributes.emotion.happiness > emotion_threshold) { emotions += "happiness, "; }
      if (face.faceAttributes.emotion.neutral > emotion_threshold) { emotions += "neutral, "; }
      if (face.faceAttributes.emotion.sadness > emotion_threshold) { emotions += "sadness, "; }
      if (face.faceAttributes.emotion.surprise > emotion_threshold) { emotions += "surprise, "; }

      if (emotions.length > 0) {
        console.log("Emotions: " + emotions.slice(0, -2));
        returnResult.emotion = emotions.slice(0, -2);
      }
      else {
        console.log("No emotions detected.");
      }

      resolve();
    })

  }//detectExtract

  //execute detectfunc()
  await DetectFaceExtract();
  return returnResult;

}


const Photo = (props) => {

  window.onload = () => {
    const userMediaSettings = {
      audio: false,
      video: {
        width: 500,
        height: 500,
        facingMode: "user"
      }
    }

    const start = (t) => {
      console.log(t);
      navigator.mediaDevices.getUserMedia(userMediaSettings)
        .then((stream) => {
          console.log(stream);
          t.video.srcObject = stream;
          t.video.onloadedmetadata = (e) => {
            t.video.play();
          };

          t.shutter.onclick = () => {
            const ctx = t.canvas.getContext("2d");

            t.video.pause();
            ctx.drawImage(t.video, 0, 0, t.canvas.width, t.canvas.height)
            setTimeout(() => {
              t.video.play();
            }, 500);
          }
        })
        .catch((err) => {
          console.error('mediaDevice.getUserMedia() error:', err);
          return;
        });
    }

    let v = document.querySelector("video");
    let c = document.querySelector("canvas");
    let s = document.getElementById("shutter");
    settings = {
      video: v,
      canvas: c,
      shutter: s
    }

    console.log(c);
    c.height = 500;
    c.width = 500;

    start(settings);
  }

  const backToTop = () => props.onChangeAppStatus({ onDisp: 'TOP' });


  return (
    <div className={styles['flex']}>
      <a onClick={backToTop}>TOP画面に戻る</a>
      <video></video>
      <p>テスト画像</p>
      <img src={photo} />
      <button id="shutter">撮影する</button>
    </div>
  )
}

export { main as MSfaceAPI, send as postToServer, Photo };