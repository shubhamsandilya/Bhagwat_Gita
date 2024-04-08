import React, { useContext, useEffect, useState } from "react";
import "../spinner.css";
import { Appcontext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
function ChapterPage() {
  const { chapter, chapternum, loading, setloading, setversenum } =
    useContext(Appcontext);
  const [verse, setverse] = useState([]);
  const [complete, setComplete] = useState(false);
  const [complete1, setComplete1] = useState(false);
  const [summary, setsummary] = useState();
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1072c052eamshd1ad69429be28d4p1df838jsnffaa29a46270",
      "X-RapidAPI-Host": "bhagavad-gita3.p.rapidapi.com",
    },
  };
  async function fetchVerse() {
    setloading(true);
    try {
      chapter?.map((obj) => {
        if (obj?.chapter_number === chapternum) {
          setsummary(obj?.chapter_summary);
        }
      });
      const res = await fetch(
        `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapternum}/verses/`,
        options
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setverse(data);
      setloading(false);
    } catch (e) {
      console.error("Error in fetching:", e);
      setloading(false); // Ensure loading state is turned off in case of error
    }
  }
  console.log(verse);
  console.log(summary);
  useEffect(() => {
    fetchVerse();
  }, []);
  const navigate = useNavigate();
  function clickHandler(event) {
    setversenum(event.currentTarget.id);
    navigate("/verse");
  }
  return (
    <center>
      <div className="w-full h-100 flex flex-col justify-center items-center mt-10 ">
        {loading ? (
          <div className="w-full h-100">
            <div className=" custom-loader"></div>
          </div>
        ) : (
          <div className="">
            <div className="w-[800px] mb-7 bg-yellow-400 font-text p-2 rounded-xl shadow-lg ">
              {summary}
            </div>

            {Array.isArray(verse) &&
              verse?.map((data, index) => {
                return (
                  <div onClick={clickHandler} id={data?.verse_number}>
                    <div className="bg-yellow-400 w-[450px]  text-center rounded-md gap-3 mb-3 cursor-pointer hover:scale-100">
                      <p className="text-2xl  text-white ">
                        Verse {data?.verse_number}
                      </p>
                      <hr />
                      <p className="mt-1">{data?.text}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </center>
  );
}

export default ChapterPage;
