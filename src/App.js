//modules
import { useState, useEffect } from 'react';
import { Photo } from "./components/face";
import youtubeLogo from "./images/yt_logo_rgb_light.png";
import { searchYoutube } from "./components/youtube";
import { Options } from "./components/options";
import { Result } from './components/result';

//styles
import "./components/styles/app.common.scss";
import styles from "./components/styles/app.module.scss";


const componentsID = {
  PHASE_1: 'TOP',
  PHASE_2: 'PHOTO',
  PHASE_3: 'OPTIONS',
  PHASE_4: 'RESULT'
}

const TopMenu = (props) => {
  const [permissionState, setPermissionState] = useState(false)

  const changeComponent = () => props.onChangeAppStatus({ onDisp: 'PHOTO' });
  navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
    result.state === "granted" ? setPermissionState(true) : navigator.geolocation.getCurrentPosition(success, error);

    function success() {
      return
    }

    function error() {
      return;
    }

  });

  const reloadPage = () => window.location.reload();

  const PermissionClear = () => {
    return (
      <>
        <p>それでは、まずは顔画像の撮影から始めましょう。以下のボタンをクリックしてください。</p>
        <b>次のページでは、カメラの利用が必要です。ページ切り替え後、カメラの利用を許可してください。</b>
        <button onClick={changeComponent}>表情を撮影する</button>
      </>
    )
  }

  const PermissionDenied = () => {
    return (
      <>
        <p>本サービスには、現在地の利用が必要です。現在地の使用許可をオンにしたうえ、下のボタンを押してください。</p>
        <button onClick={reloadPage}>現在地の利用を許可しました</button>
      </>
    )
  }

  return (
    <div className={styles["top-wrapper"]}>
      <h2>Youtube音楽検索サービスにようこそ！</h2>
      <p>本サービスは、撮影したユーザーの顔画像を基に、感情を推定し、推定情報をもとにYoutube上から楽曲を取得し、おすすめ表示するサービスです。</p>
      <p>以下の注意点に同意できる方のみご利用ください。</p>
      <ul className={styles.cautions}>
        <li>1. 本サービスでは、webカメラを使用し、顔画像の撮影を行います。</li>
        <li>2. 撮影された顔画像は検索用の情報取得以外には使用されません。検索語、顔画像データは直ちに消去されます。</li>
        <li>3. 本サービスでは現在地情報を利用します。この機能を許可できない場合、検索に用いる情報は顔画像のみになります。</li>
        <li>4. 本サービスは、facebook社のReactフレームワーク、Microsoft者のAzure Face API、openweather one call API、Google社のYoutube Data API v3を使用しています。</li>
        <li>5. 本サービスは、東北大学内の講義課題の一環で作成されたものです。本サービスの利用により生じたいかなる事態に対しても、責任を負いかねます。</li>
      </ul>
      {permissionState ? <PermissionClear /> : <PermissionDenied />}
      <p>2021 Taichi Murakami All rights reserved.</p>
    </div>
  )
}


const App = () => {

  const [appStatus, setAppStatus] = useState({
    onDisp: 'TOP',
    userData: null,
    options: null,
    searchResult: null,
  })

  const executeSearch = async () => {
    return await searchYoutube(appStatus);
  }

  const changeAppState = (d) => setAppStatus({ ...appStatus, ...d });

  const resetAppState = () => setAppStatus({
    onDisp: 'TOP',
    userData: null,
    options: null,
    searchResult: null
  });

  const componentsHandler = (nowOnDisp) => {
    let r;

    switch (nowOnDisp) {
      case componentsID.PHASE_1:
        r = <TopMenu onChangeAppStatus={changeAppState} />
        break;
      case componentsID.PHASE_2:
        r = <Photo onChangeAppStatus={changeAppState} onReset={resetAppState} />
        break;
      case componentsID.PHASE_3:
        r = <Options onChangeAppStatus={changeAppState} onReset={resetAppState} data={appStatus.userData} />
        break;
      case componentsID.PHASE_4:
        r = <Result onChangeAppStatus={changeAppState} onReset={resetAppState} onExecute={executeSearch} data={appStatus.searchResult} />
        break;
      default:
        // console.log("appStatus:", appStatus);
        throw new Error("error at componentsHandler in App.js");
    }

    return r;
  }

  useEffect(() => {
    console.log("---------appStatus update checker---------");
    console.log("appStatus changed!!");
    console.log(appStatus);
  }, [appStatus]);

  return (
    <div className="App">
      <div className={styles["logo"]}>
        <img className={styles["yt-logo"]} src={youtubeLogo} alt="" />
        <span>✕</span>
        <span>WebComp2021</span>
      </div>
      {componentsHandler(appStatus.onDisp)}
    </div >
  );
}
export default App;
