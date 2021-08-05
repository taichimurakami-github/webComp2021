
import { config } from '../config';
import styles from "./styles/face.module.scss";
import { useState, useEffect, useRef } from 'react';
import { Confirm } from './confirm';
// import { input } from '@vladmandic/face-api/dist/tfjs.esm';

const main = async (data) => {
  console.log("detect target: ", data)
  const msRest = require("@azure/ms-rest-js");
  const Face = require("@azure/cognitiveservices-face");
  // const { v4: uuid } = require("uuid");
  const key = "a27553b0195a46239a6d129bda16169e"
  const endpoint = "https://webcomp2021-taichimurakami.cognitiveservices.azure.com/"

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

  try {
    console.log("NOW DETECTING YOUR FACE ...");
    let detected_faces = await client.face.detectWithStream(makeBlob(data), DETECT_WITH_URL_OPTIONS);
    console.log("detected result :", detected_faces);

    //format emotions
    const emotions = [];
    const emotion_threshold = 0.0;//感情の閾値を設定する変数
    // console.log("faceEmotion Attoributes: ", detected_faces[0].faceAttributes.emotion);
    if (detected_faces[0].faceAttributes.emotion.anger > emotion_threshold) { emotions.push("anger"); }
    if (detected_faces[0].faceAttributes.emotion.contempt > emotion_threshold) { emotions.push("contempt"); }
    if (detected_faces[0].faceAttributes.emotion.disgust > emotion_threshold) { emotions.push("disgust"); }
    if (detected_faces[0].faceAttributes.emotion.fear > emotion_threshold) { emotions.push("fear"); }
    if (detected_faces[0].faceAttributes.emotion.happiness > emotion_threshold) { emotions.push("happiness"); }
    if (detected_faces[0].faceAttributes.emotion.neutral > emotion_threshold) { emotions.push("neutral"); }
    if (detected_faces[0].faceAttributes.emotion.sadness > emotion_threshold) { emotions.push("sadness"); }
    if (detected_faces[0].faceAttributes.emotion.surprise > emotion_threshold) { emotions.push("surprise"); }

    detected_faces[0].faceAttributes.emotion.analyzed = emotions;

    //オフラインでJSONデータを保存する際の結果用
    if (config.mode === "DEVELOPMENT" && config.face.createOfflineJSON) {
      const offline_json_data = JSON.stringify(detected_faces[0]);
      const offline_json_name = "userdata.json";
      const link = document.createElement("a");
      link.href = "data:text/plain," + encodeURIComponent(offline_json_data);
      link.download = offline_json_name;
      link.click();
    }

    return detected_faces[0];

  } catch (e) {
    console.error("顔を検知できませんでした。");
    return undefined;
  }
}

const Photo = (props) => {

  const attributeList = {
    video: {
      width: 500,
      height: 500
    },
    canvas: {
      width: 500,
      height: 500
    }
  }

  const videoElement = useRef(null);
  const canvasElement = useRef(null);
  const shutterElement = useRef(null);

  const [mediaState, setmediaState] = useState(true);
  const [result, setResult] = useState('');
  const [shutterState, setShutterState] = useState(false);

  const media = navigator.mediaDevices;
  const userMediaSettings = {
    audio: false,
    video: {
      width: attributeList.video.width,
      height: attributeList.video.height,
      facingMode: "user"
    }
  }

  /**
   * VIDEO STREAMING
   */

  const startMedia = (t) => {
    //メディアを起動、画面上に表示
    media.getUserMedia(userMediaSettings)
      .then((stream) => {
        // console.log(stream);
        setShutterState(true);
        t.video.srcObject = stream;
        t.video.onloadedmetadata = (e) => {
          t.video.play();
        };

        t.shutter.onclick = () => {
          const ctx = t.canvas.getContext("2d");
          setShutterState(false);
          t.video.pause();
          ctx.drawImage(t.video, 0, 0, t.canvas.width, t.canvas.height)
          // setTimeout(() => {
          //   t.video.play();
          // }, 800);
        }
      })
      .catch((err) => {
        //navigator.getUserMediaに失敗
        console.error('mediaDevice.getUserMedia() error:', err);
        console.log("restart media");
        setShutterState(false);
        startMedia(t);
        return;
      });
  }

  //STOP MEDIA
  const stopMedia = (t) => {
    //メディアを終了
    const tracks = t.video.srcObject.getTracks();
    tracks.forEach((track) => {
      track.stop();
    })

    t.video.srcObject = null;
    return;
  }

  //RESTART MEDIA
  const resumeMedia = () => {
    //取得したデータを初期化
    setResult('');

    //メディアを再開
    setmediaState(true);
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

    if (mediaState) {
      startMedia(settings);
    }
    else {
      stopMedia(settings);
    }

  }, [mediaState]);



  /**
   * UI AND FUNCTIONAL CODE
   */
  //TOP画面に戻る
  const backToTop = () => props.onReset();

  //MS face API 実行用関数
  const detect = async () => {
    const photoDataURL = canvasElement.current.toDataURL();
    console.log("send data: ", photoDataURL);

    const result = await main(photoDataURL);
    console.log("MS FACE API --result-- : ", result);
    setResult(result);
  }

  //App.js内に取得データを保存し、optionコンポーネントに行く
  const save = () => props.onChangeAppStatus({ onDisp: "OPTIONS", userData: result });

  const activateConfirmComponent = () => {
    //カメラを止めて、確認画面をオンにする
    setmediaState(false);
  }

  //デバッグ用、既存の（FACE APIで分析済みの）jsonファイルを使用する >> face apiの利用を回避
  const debugDetect = (d) => setResult(d);


  return (
    <div className={styles.wrapper}>
      <button className={styles["back-to-top"]} onClick={backToTop}>TOP画面に戻る</button>
      <div className={styles["video-container"]}>
        <video ref={videoElement}></video>
        <button onClick={activateConfirmComponent} ref={shutterElement} id="shutter" >撮影する</button>
      </div>
      <Confirm
        debug={debugDetect}
        canvasRef={canvasElement}
        onExecute={detect}
        onRetry={resumeMedia}
        onSave={save}
        attribute={attributeList}
        mediaState={mediaState}
        result={result}>
      </Confirm>
    </div>
  )
}

export { Photo };