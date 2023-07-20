import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import TagList from "./tags/TagList";
import { PostList } from "./posts/PostList";
import CategoryList from "./categories/CategoryList";
import TagForm from "./tags/TagForm";
import CategoryForm from "./categories/CategoryForm";
import { UsersPosts } from "./posts/UsersPosts";
import { PostDetails } from "./posts/PostDetails";
import EditCategoryForm from "./categories/EditCategory";
import { UserProfileList } from "./userProfiles/UserProfileList";
import { PostForm } from "./posts/PostForm";
import { UserProfileDetails } from "./userProfiles/UserProfileDetails";



export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="tags" element={<TagList /> } />
        <Route path="tag-form" element={<TagForm />} />
        <Route path="posts" element={<PostList />} />
        <Route path="posts/:id" element={<PostDetails />} />
        <Route path="posts/add" element={<PostForm />} />
        <Route path="my-posts" element={<UsersPosts />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="category-form" element={<CategoryForm />} />
        <Route path="/categories/:categoryId/edit" element={<EditCategoryForm />} />
        <Route path="users" element={<UserProfileList />} />
        <Route path="userprofiles/:id" element={<UserProfileDetails />} />
      </Routes>
   );
};
