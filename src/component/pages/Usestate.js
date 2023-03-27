import React, { useState, useEffect } from "react";

const Usestate = () => {
  const [name, setName] = useState('');
  const [nameList, setNameList] = useState([]);

  useEffect(() => {
    setNameList(JSON.parse(localStorage.getItem('namearray')))
  }, []);

  const addName = () => {
    let data = JSON.parse(localStorage.getItem('namearray'))
    let getfromlocal = []
    let addname = []
    if (data === null) {
      addname.push(name)
      localStorage.setItem('namearray', JSON.stringify(addname))
    } else {
      getfromlocal = JSON.parse(localStorage.getItem('namearray'))
      getfromlocal.push(name)
      localStorage.setItem('namearray', JSON.stringify(getfromlocal))
    }
  }

  return <>
    <input value={name} onChange={(e) => setName(e.target.value)} type='text' />
    <button onClick={addName}>add</button>

    {nameList != null && nameList.map((e, index) => {
      return <p key={index}>{e}</p>
    })}
  </>;
};

export default Usestate;
