import React from "react";
import { CATEGORIES } from "./data";
import { useState } from "react";

function FactList({ setFacts, facts, supabase }) {
  if (facts.length === 0) {
    return (
      <p className="message">
        No facts for this category yet! Create the first one
      </p>
    );
  }

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact
            key={fact.id}
            fact={fact}
            setFacts={setFacts}
            supabase={supabase}
          />
        ))}
      </ul>
    </section>
  );
}

function Fact({ setFacts, fact, supabase }) {
  const isDisputed =
    fact.voteInteresting + fact.voteMindBlowing < fact.voteFalse;
  const [isUpdateing, setIsUpdating] = useState(false);
  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();
    setIsUpdating(false);
    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
  }
  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className="disputed">[<span>⛔️</span>DISPUTED]</span> : null}
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((el) => el.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote("voteInteresting")}
          disabled={isUpdateing}
        >
          <span>👍</span> {fact.voteInteresting}
        </button>
        <button
          onClick={() => handleVote("voteMindBlowing")}
          disabled={isUpdateing}
        >
          <span>🤯</span> {fact.voteMindBlowing}
        </button>
        <button onClick={() => handleVote("voteFalse")} disabled={isUpdateing}>
          <span>⛔️</span> {fact.voteFalse}
        </button>
      </div>
    </li>
  );
}
export default FactList;
