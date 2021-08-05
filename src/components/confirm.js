import { config } from '../config';
import { useState, useEffect } from "react";
import styles from "./styles/face.module.scss";
import "./styles/face.scss";
import loading from '../images/loading-like-mslogo.gif';

const Confirm = (props) => {

  const wrapperClassName = {
    display: "confirm-wrapper-active",
    none: "confirm-wrapper-unactive"
  }
  const [wrapperClass, setWrapperClass] = useState(wrapperClassName.display)

  const Initial = () => {
    return (
      <>
        <button className="btn-confirm" onClick={execute}>表情分析を行う</button>
        <button className="btn-confirm" onClick={onRetry}>もう一度撮影しなおす</button>
        {/* config.modeがDEVELOPMENTのときのみ表示 */}
        {(config.mode === "DEVELOPMENT") && <button className="btn-confirm" onClick={nonExecute}>デバッグ用モードで行う</button>}
      </>
    )
  }

  const Detecting = (props) => {
    return <img src={props.gif} alt="" />
  }

  const Failed = () => {
    return (
      <>
        <p>顔の検出に失敗しました。もういちと顔検出をやり直してください。</p>
        <ul className="advise">
          <li>うまく行かない時は...</li>
          <li>マスクなどで顔が隠れていませんか？</li>
          <li>明るすぎたり、暗すぎる環境では、顔を判別できないことがあります。</li>
        </ul>
        <button className="btn-confirm" onClick={onRetry}>もう一度撮影しなおす</button>
      </>
    )
  }

  const Detected = (props) => {
    const f = props.result.faceAttributes;
    const result = (
      <ul className="result">
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
          <p>{f.emotion.analyzed.map((val, index) => { return `${val} ` })}</p>
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
        <h2>～ DETECTED RESULT ～</h2>
        {result}
        <button className="btn-confirm" onClick={props.onSave}>次に進む</button>
      </>
    )
  }

  const components = {
    INITIAL: <Initial></Initial>,
    DETECTING: <Detecting gif={loading}></Detecting>,
    FAILED: <Failed></Failed>,
    DETECTED: <Detected onSave={props.onSave} result={props.result}></Detected>,
  }

  const [state, setState] = useState(components.INITIAL);

  const onChangeComponent = (s) => setState(s)

  const execute = async () => {
    onChangeComponent(components.DETECTING);
    await props.onExecute();
  }

  //for debug only(execute without API: 既に分析にかけてある、保存済みのデータを利用もしくはエラー時のテスト)
  const nonExecute = async () => {

    if (config.mode === "DEVELOPMENT" && config.face.detectErrorDebug) {
      setTimeout(() => {
        onChangeComponent(components.FAILED);
      }, 800);

      return;
    }


    console.log("nonExecute at face.js on Confirm Component ...");
    const loadJSON = (t) => {
      return JSON.parse(t);
    }

    const debugInput = document.createElement("input");
    debugInput.type = "file";
    debugInput.click();
    debugInput.addEventListener("change", e => {
      var result = e.target.files[0];
      var reader = new FileReader();
      reader.readAsText(result);

      // ファイルの中身が読み取られた後に行う処理を定義する。
      reader.addEventListener("load", () => {
        const JSON_DATA = loadJSON(reader.result);
        console.log("use offline json data:");
        console.log(JSON_DATA);
        props.debug(JSON_DATA);
      });
    })

  }

  const onRetry = () => {
    console.log("onretry");
    onChangeComponent(components.INITIAL);
    props.onRetry();
  }


  useEffect(() => {
    if (props.mediaState) {
      setWrapperClass(wrapperClassName.none);
    } else {
      setWrapperClass(wrapperClassName.display);
    }

    if (props.result !== '' && props.result !== undefined) {

      setTimeout(() => {
        onChangeComponent(components.DETECTED);
      }, 800);
    }

    //顔検出に失敗
    if (props.result !== '' && props.result === undefined) {
      setTimeout(() => {
        onChangeComponent(components.FAILED);
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

export { Confirm };