import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ToDo() {
  const [list, setList] = useState([]);
  const [text, setText] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { date } = useParams();

  function onSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:3001/todos`, {
       method: 'POST', 
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ description: text, date, isCompleted: isChecked }) 
      });
    const newList = [...list, { description: text, date: date, isCompleted: isChecked }];
    setList(newList);
    setText("");
  }
  
  useEffect(() => {
    fetch(`http://localhost:3001/todos?date=${date}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [date]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    const id = event.target.id;
    const description = event.target.getAttribute('data-description');
    fetch(`http://localhost:3001/todos/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isCompleted: event.target.checked
      }),
      method: 'PUT'
    });


    const listWithoutChanged = list.filter(item => item.id !== parseInt(id));

    setList([...listWithoutChanged, { id: parseInt(id), isChecked: event.target.checked, todos: description }]);
  };

  return (
    <div>
      <div>{date}</div>  
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          id="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {list.map((item, idx) => {
          return (
            <li key={item.todos + idx}>
              <input type="checkbox" id={item.id} data-description={item.todos} checked={item.isCompleted} onChange={handleCheckboxChange}/> {item.todos}
            </li>
          );
        })}
      </ul>
    </div>
  );
}