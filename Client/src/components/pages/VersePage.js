import React, { useContext, useEffect, useState } from "react";
import { Appcontext } from "../context/AppContext";
function VersePage() {
  const { chapternum, versenum, loading, setloading } = useContext(Appcontext);
  const [versee, setversee] = useState();
  const [translation, settranslation] = useState();
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1072c052eamshd1ad69429be28d4p1df838jsnffaa29a46270",
      "X-RapidAPI-Host": "bhagavad-gita3.p.rapidapi.com",
    },
  };
  console.log("verse number"+versenum)
  async function fetchVerse() {
    setloading(true);
    try {
      const res = await fetch(
        `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapternum}/verses/${versenum}/`,
        options
      );
      const data = await res.json();
      setversee(data);
      settranslation(data?.translations);
    } catch (e) {
      console.log("error in fetching verse" + e);
    }
    setloading(false);
  }

  
  useEffect(() => {
    fetchVerse();
  }, []);
  return (
    <div className="w-full flex items-center justify-center ">
    <div className="bg-yellow-400 mt-4 w-[1000px] shadow-md rounded-xl">
      <div className="  text-2xl gap-1 p-2 flex flex-col justify-center ">
        <div className="  ">
      <center><h1 className=" mb-2 font-mono font-semibold "> Chapter {chapternum},Verse {versee?.verse_number}</h1></center>
      <p className="text-slate-700">{versee?.text}</p>
      </div>
      </div>
      <center><h2 className="text-2xl font-mono font-bold mb-2">Translations</h2></center>
      <div className="">
        {translation?.map((data) => {
          return (
            <center>
            <div className="pb-4" key={data.id}>
              <p className="font-semibold text-xl font-mono"> {data?.language.charAt(0).toUpperCase() +data?.language.slice(1)} </p>
              <p className="font-text"> {data.description}</p>
              <p>{data.author_name}</p>
            </div>
            </center>
          );
        })}
      </div>
      <div></div>
    </div>
    </div>
  );
}

export default VersePage;
