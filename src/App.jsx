import "./index.scss";
import Item from "./components/item/Item";
import { useEffect, useRef, useState } from "react";
function App() {
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const [items, setItems] = useState([]);
  const [write, setWrite] = useState("");

  useEffect(() => {
    if (getItems()) {
      setItems(getItems());
    }
  }, []);

  const saveToLocalStorage = (newItems) => {
    localStorage.setItem("items", JSON.stringify(newItems));
  };
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (
        event.key === "Enter" &&
        inputRef.current === document.activeElement &&
        buttonRef.current
      ) {
        buttonRef.current.click();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const getItems = () => {
    try {
      const localItems = localStorage.getItem("items");
      if (localItems === null) {
        return [];
      }
      return JSON.parse(localItems) || [];
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      return [];
    }
  };

  function addItem() {
    let time = new Date().toLocaleTimeString();
    let date = new Date().toLocaleDateString();
    if (!write) {
      return false;
    }
    let newItem = {
      id: Date.now(),
      text: write,
      time: time,
      date: date,
    };
    const newItemsArray = [...items, newItem];
    setItems(newItemsArray);
    saveToLocalStorage(newItemsArray);
    setWrite("");
  }
  const handleChange = (e, func) => {
    func(e.target.value);
  };
  const handleDelete = (item) => {
    const updatedItems = items.filter((el) => el.id !== item);
    setItems(updatedItems);
    saveToLocalStorage(updatedItems);
  };
  return (
    <>
      <div className={`ToDoList`}>
        <h1>To Do List</h1>
        <div className={`ToDoList__write-wrapper`}>
          <input
            ref={inputRef}
            className={`ToDoList__write`}
            tabIndex={1}
            type="text"
            onChange={(e) => handleChange(e, setWrite)}
            value={write}
          />
          <button type="submit" onClick={addItem} tabIndex={2} ref={buttonRef}>
            Отправить
          </button>
        </div>
        <ul>
          {items.map((el, index) => (
            <Item
              date={el.date}
              key={el.id}
              time={el.time}
              text={el.text}
              index={index}
              title={el.text}
              onDelete={() => handleDelete(el.id)}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
