import classes from "./Item.module.scss";
export default function item(params) {
  return (
    <li className={`${classes.item}`} key={params.key}>
      <div className={`${classes.item__content}`}>
        <div className={`${classes["item__date-wrapper"]}`}>
          <div tabIndex={params.index + 5}>{params.time}</div>
          <div tabIndex={params.index + 6}>{params.date}</div>
        </div>
        <div className={`${classes.item__text}`} tabIndex={4}>
          {params.text}
        </div>
      </div>
      <button
        className={`${classes.item__btn}`}
        onClick={params.onDelete}
        tabIndex={3}
      >
        <span></span>
        <span></span>
      </button>
    </li>
  );
}
