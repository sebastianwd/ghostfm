import React, { memo } from "react"

const Dropdown = ({ items, triggerSearch }) => {
  return (
    <div className="dropdown-container">
      <ul className="dropdown">
        {items &&
          items.map((item, index) => (
            <li
              className="dropdown__items"
              key={index}
              onClick={() => triggerSearch(item.strArtist)}
            >
              {item.strArtist}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Dropdown
