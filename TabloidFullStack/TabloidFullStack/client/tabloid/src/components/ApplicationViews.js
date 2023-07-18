import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import TagList from "./tags/TagList";
import CategoryList from "./categories/CategoryList";


export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="tags" element={<TagList /> } />
        <Route path="categories" element={<CategoryList />} />
      </Routes>
   );
 
}
