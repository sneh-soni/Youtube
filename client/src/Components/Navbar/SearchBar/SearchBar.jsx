import React, { useState } from "react";
import { BsMicFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./SearchBar.css";
import SearchList from "./SearchList";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchList, setSearchList] = useState(false);

  const TitleArray = useSelector((s) => s?.videoReducer)
    ?.data?.filter((q) =>
      q?.videoTitle.toUpperCase().includes(searchQuery?.toUpperCase())
    )
    .map((m) => m?.videoTitle);

  return (
    <>
      <div className="SearchBar_Container">
        <div className="SearchBar_Container2">
          <div className="search_div">
            <input
              type="text"
              className="iBox_SearchBar"
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              onClick={(e) => setSearchList(true)}
            />
            <Link to={`/seacrh/${searchQuery}`}>
              <FaSearch
                className="searchIcon_SearchBar"
                onClick={(e) => setSearchList(false)}
              />
            </Link>
            <BsMicFill className="Mic_SearchBar" />
            {searchQuery && searchList && (
              <SearchList
                setSearchQuery={setSearchQuery}
                TitleArray={TitleArray}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
