import { useEffect, useState } from "react";

const Options = (props) => {
  const [optionState, setOptionState] = useState({});

  console.log(props.data);

  const normal = () => props.onChangeAppStatus({ onDisp: 'RESULT', options: { lyrics: true } });
  const instrumental = () => props.onChangeAppStatus({ onDisp: 'RESULT', options: { lyrics: false } });

  return (
    <>
      <h2>これから検索します！</h2>
      <p>その前に最後の質問です。歌詞は欲しいですか？</p>
      <button onClick={normal}>歌詞があったほうがいい</button>
      <button onClick={instrumental}>歌詞はないほうがいい</button>
    </>
  )
}



export { Options };