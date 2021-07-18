import photo from '../images/smile.jpg';
import loading from '../images/loading-like-mslogo.gif';
import styles from "./styles/face.module.scss";
import { useState, useEffect, useRef } from 'react';

const main = async (data) => {
  console.log("detect target: ", data)
  const msRest = require("@azure/ms-rest-js");
  const Face = require("@azure/cognitiveservices-face");
  // const { v4: uuid } = require("uuid");
  const key = "a27553b0195a46239a6d129bda16169e"
  const endpoint = "https://webcomp2021-taichimurakami.cognitiveservices.azure.com/"

  // rest api calling url
  // const uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

  // const params_obj = {
  //   "returnFaceId": "true",
  //   "returnFaceLandmarks": "false",
  //   "returnFaceAttributes":
  //     "age,gender,headPose,smile,facialHair,glasses,emotion," +
  //     "hair,makeup,occlusion,accessories,blur,exposure,noise"
  // };

  // const params =
  //   "returnFaceId=true" +
  //   "&returnFaceLandmarks=false" +
  //   "&returnFaceAttributes=" +
  //   "age,gender,headPose,smile,facialHair,glasses,emotion," +
  //   "hair,makeup,occlusion,accessories,blur,exposure,noise";

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
  console.log("detected result :", detected_faces);

  //format emotions
  let emotions = "";
  const emotion_threshold = 0.0;//感情の閾値を設定する変数
  // console.log("faceEmotion Attoributes: ", detected_faces[0].faceAttributes.emotion);
  if (detected_faces[0].faceAttributes.emotion.anger > emotion_threshold) { emotions += "anger,"; }
  if (detected_faces[0].faceAttributes.emotion.contempt > emotion_threshold) { emotions += "contempt,"; }
  if (detected_faces[0].faceAttributes.emotion.disgust > emotion_threshold) { emotions += "disgust,"; }
  if (detected_faces[0].faceAttributes.emotion.fear > emotion_threshold) { emotions += "fear,"; }
  if (detected_faces[0].faceAttributes.emotion.happiness > emotion_threshold) { emotions += "happiness,"; }
  if (detected_faces[0].faceAttributes.emotion.neutral > emotion_threshold) { emotions += "neutral,"; }
  if (detected_faces[0].faceAttributes.emotion.sadness > emotion_threshold) { emotions += "sadness,"; }
  if (detected_faces[0].faceAttributes.emotion.surprise > emotion_threshold) { emotions += "surprise,"; }

  detected_faces[0].faceAttributes.emotion.analyzed = emotions;

  return detected_faces[0];
}


const Confirm = (props) => {

  const wrapperClassName = {
    display: "confirm-wrapper-active",
    none: "confirm-wrapper-unactive"
  }
  const [wrapperClass, setWrapperClass] = useState(wrapperClassName.display)

  const Initial = () => {
    return (
      <>
        <button onClick={execute}>表情分析を行う</button>
        <button onClick={props.onRetry}>もう一度撮影しなおす</button>
      </>
    )
  }

  const Detecting = (props) => {
    return <img src={props.gif} />
  }

  const Detected = (props) => {
    const f = props.result.faceAttributes;
    const result = (
      <ul>
        <li>
          <p>顔ID</p>
          <p>{props.result.faceId}</p>
        </li>
        <li>
          <p>推定年齢</p>
          <p>{f.age}</p>
        </li>
        <li>
          <p>推定感情</p>
          <p>{f.emotion.analyzed}</p>
        </li>
        <li>
          <p>推定性別</p>
          <p>{f.gender}</p>
        </li>
        <li>
          <p>写真のノイズの度合い</p>
          <p>{f.noise.noiseLevel}</p>
        </li>
      </ul>
    )

    return (
      <>
        <h2>---DETECTED RESULT---</h2>
        {result}
        <button onClick={props.goToNext}>次に進む</button>
      </>
    )
  }

  const components = {
    INITIAL: <Initial></Initial>,
    DETECTING: <Detecting gif={loading}></Detecting>,
    DETECTED: <Detected goToNext={props.onSave} result={props.result}></Detected>
  }

  const [state, setState] = useState(components.INITIAL);

  const onChangeComponent = (s) => setState(s)

  const execute = async () => {
    onChangeComponent(components.DETECTING);
    await props.onExecute();
  }


  useEffect(() => {
    if (props.mediaState) {
      setWrapperClass(wrapperClassName.none);
    } else {
      setWrapperClass(wrapperClassName.display);
    }

    if (props.result !== '') {

      setTimeout(() => {
        onChangeComponent(components.DETECTED);
      }, 800);
    }
  }, [props.mediaState, props.result])

  return (
    <div className={styles[wrapperClass]}>
      <div className={styles["confirm-container"]}>
        <canvas width={props.attribute.canvas.width} height={props.attribute.canvas.height} ref={props.canvasRef} id="target"></canvas>
        <div className={styles["confirm-container-panel"]}>
          {state}
        </div>
      </div>
    </div>
  )
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
          }, 800);
        }
      })
      .catch((err) => {
        console.error('mediaDevice.getUserMedia() error:', err);
        return;
      });
  }

  //STOP MEDIA
  const stopMedia = (t) => {
    const tracks = t.video.srcObject.getTracks();
    tracks.forEach((track) => {
      track.stop();
    })

    t.video.srcObject = null;
    return;
  }

  //RESTART MEDIA
  const resumeMedia = () => {
    setResult('');
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
  const backToTop = () => props.onChangeAppStatus({ onDisp: 'TOP' });

  const detect = async () => {
    const photoDataURL = canvasElement.current.toDataURL();
    console.log("send data: ", photoDataURL);

    const result = await main(photoDataURL);
    console.log("MS FACE API --result-- : ", result);
    setResult(result);
  }

  const save = () => {
    props.onSaveAPIData({ user: result });
    props.goToNextComponent();
  }

  const activateConfirmComponent = (result) => {
    //カメラを止めて、確認画面をオンにする
    setmediaState(false);
  }



  return (
    <div className={styles.wrapper}>
      <a onClick={backToTop}>TOP画面に戻る</a>
      <div className={styles["video-container"]}>
        <video ref={videoElement}></video>
        <button onClick={activateConfirmComponent} ref={shutterElement} id="shutter">撮影する</button>
      </div>
      <Confirm
        canvasRef={canvasElement}
        onExecute={detect}
        onRetry={resumeMedia}
        onSave={save}
        attribute={attributeList}
        mediaState={mediaState}
        result={result}></Confirm>
      {/* <p>テスト画像</p> */}
      {/* <img src={photo} /> */}

    </div>
  )
}

export { Photo };