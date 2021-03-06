import { useRef, useState } from "react";
import "./styles/options.scss";

const Options = (props) => {

  const normal = () => props.onChangeAppStatus({ onDisp: 'RESULT', options: { lyrics: true } });
  const instrumental = () => props.onChangeAppStatus({ onDisp: 'RESULT', options: { lyrics: false } });

  return (
    <>
      <h2>これから検索します！</h2>
      <button onClick={normal}>検索画面へ進む</button>
      {/* <p>その前に最後の質問です。歌詞は欲しいですか？</p>
      <div className={styles["btn-wrapper"]}>
        <button onClick={normal}>歌詞があったほうがいい</button>
        <button onClick={instrumental}>歌詞はないほうがいい</button>
      </div> */}
    </>
  )
}



export { Options };