import React, { useState } from "react";
import Nav from "./Navigation/Nav";
import Product from "./Products/Product";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import products from "./db/data";

import Card from "./components/Card";
import"./index.css"

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setquery] = useState("");

  //-------input value--------//
  const handleInputValue = (e) => {
    setquery(e.target.value);
  };
  const filteredItems = products.filter(
    (product) =>
      product.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) !==
      -1
  );
  //------radio filer-----//
  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  //--------button filter----//
  const handleClick = (e) => {
    setSelectedCategory(e.target.value);
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;
    //filtered input value
    if (query) {
      filteredProducts = filteredItems;
    }
    //selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          company === selected ||
          color === selected ||
          newPrice === selected ||
          title === selected
      );
    }
    return filteredProducts.map(
      ({ img, title, star, reviews, prevPrice, newPrice }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    );
  }
const result=filteredData(products,selectedCategory,query)
  return (
    <>
      <Sidebar handleChange={handleChange}/>
      <Nav query={query} handleInputValue={handleInputValue}/>
      <Recommended handleClick={handleClick}/>
      <Product result={result} />
    </>
  );
}

export default App;
