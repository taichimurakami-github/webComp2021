import photo from '../images/smile.jpg';
import styles from "./styles/face.module.scss";
import { useState, useEffect, useRef } from 'react';
console.log(styles);

const send = () => {

}


const main = async (data) => {

  const msRest = require("@azure/ms-rest-js");
  const Face = require("@azure/cognitiveservices-face");
  // const { v4: uuid } = require("uuid");
  const key = "a27553b0195a46239a6d129bda16169e"
  const endpoint = "https://webcomp2021-taichimurakami.cognitiveservices.azure.com/"

  // rest api calling url
  // const uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

  const params_obj = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "false",
    "returnFaceAttributes":
      "age,gender,headPose,smile,facialHair,glasses,emotion," +
      "hair,makeup,occlusion,accessories,blur,exposure,noise"
  };

  const params =
    "returnFaceId=true" +
    "&returnFaceLandmarks=false" +
    "&returnFaceAttributes=" +
    "age,gender,headPose,smile,facialHair,glasses,emotion," +
    "hair,makeup,occlusion,accessories,blur,exposure,noise";

  const makeBlob = (d) => {
    let parts = d.split(";base64,");
    let contentType = parts[0].split(":")[1];
    let raw = window.atob(parts[1]);
    let uInt8Array = new Uint8Array(raw.length);

    for (let i = 0; i < raw.length; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  const credentials = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } });
  const client = new Face.FaceClient(credentials, endpoint);
  const DETECT_WITH_URL_OPTIONS = {
    returnFaceAttributes: ["Accessories", "Age", "Blur", "Emotion", "Exposure", "FacialHair", "Gender", "Glasses", "Hair", "HeadPose", "Makeup", "Noise", "Occlusion", "Smile"],
    detectionModel: "detection_01"
  }


  console.log("phase: DETECTING YOUR FACE...");
  let detected_faces = await client.face.detectWithStream(makeBlob(data), DETECT_WITH_URL_OPTIONS);

  //format emotions
  let emotions = "";
  let emotion_threshold = 0.0;//感情の閾値を設定する変数
  // console.log("faceEmotion Attoributes: ", detected_faces[0].faceAttributes.emotion);
  if (detected_faces[0].faceAttributes.emotion.anger > emotion_threshold) { emotions += "anger,"; }
  if (detected_faces[0].faceAttributes.emotion.contempt > emotion_threshold) { emotions += "contempt,"; }
  if (detected_faces[0].faceAttributes.emotion.disgust > emotion_threshold) { emotions += "disgust,"; }
  if (detected_faces[0].faceAttributes.emotion.fear > emotion_threshold) { emotions += "fear,"; }
  if (detected_faces[0].faceAttributes.emotion.happiness > emotion_threshold) { emotions += "happiness,"; }
  if (detected_faces[0].faceAttributes.emotion.neutral > emotion_threshold) { emotions += "neutral,"; }
  if (detected_faces[0].faceAttributes.emotion.sadness > emotion_threshold) { emotions += "sadness,"; }
  if (detected_faces[0].faceAttributes.emotion.surprise > emotion_threshold) { emotions += "surprise,"; }

  return detected_faces[0];


  // const image_base_url = "https://csdx.blob.core.windows.net/resources/Face/Images/";
  // const person_group_id = uuid();
  // const image_file_names = [
  //   // "detection1.jpg",    // single female with glasses
  //   // "detection2.jpg", // (optional: single man)
  //   // "detection3.jpg", // (optional: single male construction worker)
  //   // "detection4.jpg", // (optional: 3 people at cafe, 1 is blurred)
  //   "detection5.jpg",    // family, woman child man
  //   // "detection6.jpg"     // elderly couple, male female
  // ];

  // const image_file_name = image_file_names[0];
  // const IMAGES_URL = "https://xs12321.xsrv.jp/angry_man_01.jpg";
  // const DETECT_WITH_URL_OPTIONS = {
  //   returnFaceAttributes: ["Accessories", "Age", "Blur", "Emotion", "Exposure", "FacialHair", "Gender", "Glasses", "Hair", "HeadPose", "Makeup", "Noise", "Occlusion", "Smile"],
  //   detectionModel: "detection_01"
  // }
  // const returnResult = {}
  // const DetectFaceExtract = async () => {

  //   console.log("========DETECT FACES========");

  //   //FACE API detectWithUrl
  //   let detected_faces = await client.face.detectWithUrl(IMAGES_URL, DETECT_WITH_URL_OPTIONS);
  //   console.log(detected_faces[0]);

  //   //display results
  //   console.log(detected_faces.length + " face(s) detected from image " + image_file_name + ".");
  //   console.log("Face attributes for face(s) in " + image_file_name + ":");
  //   console.log("これは表示される");
  //   await new Promise(resolve => {
  //     const face = detected_faces[0];
  //     //get the bounding box of the face
  //     console.log("Bounding box:\n  Left: " + face.faceRectangle.left + "\n  Top: " + face.faceRectangle.top + "\n  Width: " + face.faceRectangle.width + "\n  Height: " + face.faceRectangle.height);
  //     returnResult.bounding = face.faceRectangle;

  //     // Get face other attributes
  //     console.log("Age: " + face.faceAttributes.age);
  //     returnResult.age = face.faceAttributes.age;

  //     // Get emotion on the face
  //     let emotions = "";
  //     let emotion_threshold = 0.0;//感情の閾値を設定する変数
  //     console.log("faceEmotion Attoributes: ", face.faceAttributes.emotion);
  //     if (face.faceAttributes.emotion.anger > emotion_threshold) { emotions += "anger, "; }
  //     if (face.faceAttributes.emotion.contempt > emotion_threshold) { emotions += "contempt, "; }
  //     if (face.faceAttributes.emotion.disgust > emotion_threshold) { emotions += "disgust, "; }
  //     if (face.faceAttributes.emotion.fear > emotion_threshold) { emotions += "fear, "; }
  //     if (face.faceAttributes.emotion.happiness > emotion_threshold) { emotions += "happiness, "; }
  //     if (face.faceAttributes.emotion.neutral > emotion_threshold) { emotions += "neutral, "; }
  //     if (face.faceAttributes.emotion.sadness > emotion_threshold) { emotions += "sadness, "; }
  //     if (face.faceAttributes.emotion.surprise > emotion_threshold) { emotions += "surprise, "; }

  //     if (emotions.length > 0) {
  //       console.log("Emotions: " + emotions.slice(0, -2));
  //       returnResult.emotion = emotions.slice(0, -2);
  //     }
  //     else {
  //       console.log("No emotions detected.");
  //     }

  //     resolve();
  //   })

  // }//detectExtract

  //execute detectfunc()
  // await DetectFaceExtract();
  // return returnResult;

}


const Photo = (props) => {
  const videoElement = useRef(null);
  const canvasElement = useRef(null);
  const shutterElement = useRef(null);

  const [mediaState, setmediaState] = useState(true);
  let photoDataURL = '';
  const media = navigator.mediaDevices;
  const userMediaSettings = {
    audio: false,
    video: {
      width: 500,
      height: 500,
      facingMode: "user"
    }
  }

  /**
   * VIDEO STREAMING CODE
   */


  const startMedia = (t) => {

    media.getUserMedia(userMediaSettings)
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
          }, 1000);
        }
      })
      .catch((err) => {
        console.error('mediaDevice.getUserMedia() error:', err);
        return;
      });
  }

  const stopMedia = (t) => {
    const tracks = t.video.srcObject.getTracks();
    tracks.forEach((track) => {
      track.stop();
    })

    t.video.srcObject = null;
    return;
  }

  const stop = () => {
    return setmediaState(false);
  }

  const retry = () => {
    setmediaState(true);
    return setDisplayCanvas(false);
  }

  //control media
  useEffect(() => {
    const v = videoElement.current;
    const c = canvasElement.current;
    const s = shutterElement.current;
    const settings = {
      video: v,
      canvas: c,
      shutter: s
    }

    if(mediaState){
      startMedia(settings);
    }
    else{
      stopMedia(settings);
    }

  }, [mediaState]);



  /**
   * UI AND FUNCTIONAL CODE
   */

  const backToTop = () => props.onChangeAppStatus({ onDisp: 'TOP' });
  const [displayCanvas, setDisplayCanvas] = useState(false);
  const [canvasState, setCanvasState] = useState(styles["canvas-container-unactive"]);
  const createCanvas = () => {
    return setDisplayCanvas(true);
  }

  const detect = async () => {
    photoDataURL = canvasElement.current.toDataURL();
    console.log("send data: ", photoDataURL);
    const result = await main(photoDataURL);
    console.log("detect result: ", result);
  }

  useEffect(
    () => {
      if (displayCanvas) {
        setCanvasState(styles['canvas-container-active']);
      }
      else {
        setCanvasState(styles['canvas-container-unactive']);
      }
    }
    , [displayCanvas]);

  return (
    <div className={styles.wrapper}>
      <a onClick={backToTop}>TOP画面に戻る</a>
      <div className={styles["video-container"]}>
        <video ref={videoElement}></video>
        <button onClick={createCanvas} ref={shutterElement} id="shutter">撮影する</button>
      </div>
      <div className={canvasState}>
        <canvas ref={canvasElement} id="target"></canvas>
        <button onClick={detect}>detect</button>
        <button onClick={retry}>retry</button>
        <button onClick={stop}>stop media</button>
      </div>
      {/* <p>テスト画像</p> */}
      {/* <img src={photo} /> */}

    </div>
  )
}

export { main as MSfaceAPI, send as postToServer, Photo };