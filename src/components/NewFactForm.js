import React from "react";
import { useState } from "react";
import { CATEGORIES } from "./data";
function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm, supabase }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLength = text.length;
  const [isUploading, setIsUploading] = useState(false);
  const maxLength = 200;
  const isValid = isValidHttpUrl(source);
  const isLimitReached = maxLength < textLength;

  async function HandleSubmit(evt) {
    // 1. Prevent the browser reload
    evt.preventDefault();
    // 2. Check if data is valid, If so Create new fact
    if (!isLimitReached && isValid && category && text) {
      // 3. Upload fact to Superbase and reload the fact
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);
      // 4. Add the new fact to t he UI: add the fact to the state
      if (!error) setFacts((facts) => [newFact[0], ...facts]);
      // 5. Reset the input fields
      setText("");
      setSource("");
      setCategory("");
      // 6. Close the form
      setShowForm(false);
    }
  }
  return (
    <form className="fact_form" onSubmit={HandleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Share a fact with the world...."
          value={text}
          onChange={(evt) => setText(evt.target.value)}
          disabled={isUploading}
          className={isLimitReached ? "wrongInput" : ""}
        />
        {isLimitReached && (
          <small className="error-message">Text exceeds limit.</small>
        )}
      </div>
      <span>{200 - textLength}</span>
      <div>
        <input
          value={source}
          type="text"
          placeholder="http://example.com"
          onChange={(evt) => setSource(evt.target.value)}
          disabled={isUploading}
          className={!isValid && source.length > 0 ? "wrongInput" : ""}
        />
        {!isValid && source.length > 0 && (
          <small className="error-message">Please enter a valid URL.</small>
        )}
      </div>

      <select
        value={category}
        onChange={(evt) => setCategory(evt.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose Category</option>
        {CATEGORIES.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

export default NewFactForm;
