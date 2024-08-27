import React from "react";
import { useEffect, useState } from "react";
import supabase from "./superbase";
import "./style.css";
import MenuBar from "./components/MenuBar";
import Header from "./components/Header";
import NewFactForm from "./components/NewFactForm";
import CategoryFilter from "./components/CategoryFilter";
import FactList from "./components/FactList";
import Loader from "./components/Loader";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoadng, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [isMediumScreenWidth, setIsMediumScreenWidth] = useState(window.innerWidth < 900);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [isSmallScreenWidth, setIsSmallScreenWidth] = useState(window.innerWidth < 600);

  useEffect(() => {
    //Function to handle screen size changes
    const handleResize = () => {
      setIsMediumScreenWidth(window.innerWidth < 900);
      setIsSmallScreenWidth(window.innerWidth < 600);
      if (!isMediumScreenWidth || !isSmallScreenWidth) {
        setIsCategoryVisible(false);
      }
    };
    //Add event listener for screen resizing
    window.addEventListener("resize", handleResize);
    //Cleanup function to remove event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");

        if (currentCategory !== "all") {
          query = query.eq("category", currentCategory);
        }

        const { data: facts, error } = await query
          .order("voteInteresting", { ascending: true })
          .limit(100);

        if (!error) setFacts(facts);
        else alert("Problem Getting data.");
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );
  return (
    <>
      <Header
        showForm={showForm}
        setShowForm={setShowForm}
        isSmallScreenWidth={isSmallScreenWidth}
        setIsCategoryVisible={setIsCategoryVisible}
      />
      {showForm ? (
        <NewFactForm
          setFacts={setFacts}
          setShowForm={setShowForm}
          supabase={supabase}
        />
      ) : null}
      <main className="main">
        {isSmallScreenWidth ? (
          <>
            {isCategoryVisible && (
              <CategoryFilter setCurrentCategory={setCurrentCategory} />
            )}
          </>
        ) : isMediumScreenWidth ? (
          <>
            <MenuBar setIsCategoryVisible={setIsCategoryVisible} />
            {isCategoryVisible && (
              <CategoryFilter setCurrentCategory={setCurrentCategory} />
            )}
          </>
        ) : (
          <CategoryFilter setCurrentCategory={setCurrentCategory} />
        )}
        {isLoadng ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} supabase={supabase} />
        )}
      </main>
    </>
  );
}

export default App;
