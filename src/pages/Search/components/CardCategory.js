import { memo } from "react";
import { Link } from "react-router-dom";
import "./CardCategory.css";
const hexColors = [
  "#27856a",
  "#1f53d5",
  "#8d67ab",
  "#e8115b",
  "#f037a5",
  "#f3aa27",
  "#509bf5",
  "#8c1932",
  "#477d95",
  "#503750",
  "#a56752",
  "#777777",
  "#ba5d07",
  "#e61e32",
  "#608108",
  "#eb402e",
  "#8113d7",
];
const CardCategory = ({ title, img, id }) => {
  const randomIndex = Math.ceil(Math.random() * hexColors.length);

  const randomColor = hexColors[randomIndex];
  // console.log("card categori");
  // ya no vuelve a renderizar por Memo
  return (
    <div style={{ background: randomColor }} className="category ">
      <h3 className="category__title text-shadow">{title}</h3>
      <img
        loading="lazy"
        className="category__img"
        src={img}
        alt={`categoria ${title}`}
      />
      <Link className="category__genreLink" to={`category/${id}`} />
    </div>
  );
};

export default memo(CardCategory);
