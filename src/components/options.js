import { useEffect, useState } from "react";

const Options = (props) => {
  const [optionState, setOptionState] = useState({});
  useEffect(() => {
    console.log(props.data);
  }, [props.data]);

  console.log(props.data);

  const handleSubmit = (e) => {
    console.log(e.target);
    props.goToNextComponent();
  }

  return (
    <>
      <p>THIS IS OPTIONS COMPONENT!</p>
      <p>Choose your options.</p>
      <form id="user_option_form" onSubmit={handleSubmit}>
        <h2>検索する音楽の種類を指定します！</h2>

        <label htmlFor="">歌詞アリ</label>
        <input type="radio" value="with-lyrics" />
        <label htmlFor="">歌詞ナシ</label>
        <input type="radio" value="non-lyrics" />

        <button type="submit">これで決定</button>
      </form>
    </>
  )
}



export { Options };