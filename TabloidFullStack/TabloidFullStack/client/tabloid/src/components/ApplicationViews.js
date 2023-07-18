import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import TagList from "./tags/TagList";
import { PostList } from "./posts/PostList";
import CategoryList from "./categories/CategoryList";
import TagForm from "./tags/TagForm";
import CategoryForm from "./categories/CategoryForm";



export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="tags" element={<TagList /> } />
        <Route path="tag-form" component={<TagForm />} />
        <Route path="posts" element={<PostList />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="category-form" element={<CategoryForm />} />
      </Routes>
   );
};
