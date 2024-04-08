import { createContext, useState, useEffect } from "react";
export const Appcontext = createContext();
export default function AppContextProvider({ children }) {
  const [loading, setloading] = useState(false);
  const [chapter, setchapter] = useState([]);
  const[verse,setVerse]=useState();
  const [versenum, setversenum] = useState();
  const [chapternum, setchapternum] = useState(1);
  const [url, seturl] = useState(
    "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/?limit=18"
  );
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1072c052eamshd1ad69429be28d4p1df838jsnffaa29a46270",
      "X-RapidAPI-Host": "bhagavad-gita3.p.rapidapi.com",
    },
  };
  async function fetchSholk() {
    setloading(true);
    try{
      const res = await fetch(url, options);
      const data = await res.json();
      // console.log(data);
      setchapter(data);
    } catch (e) {
      console.log("error in fetching" + e);
    }
    setloading(false);
  }
  
  useEffect(() => {
    fetchSholk();
  }, []);
  const value = {
    loading,
    setloading,
    chapter,
    chapternum,
    setchapter,
    setchapternum,
    seturl,
    url,
    verse,
    setVerse,
    versenum,
    setversenum,
    options
  };
  return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
}
