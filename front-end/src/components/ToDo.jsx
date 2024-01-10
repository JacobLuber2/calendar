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
      })
      .then((res) => res.json())
      .then((response) => {
        const newList = [...list, { id: response, todos: text, date: date, isCompleted: isChecked }];
        setList(newList);
        setText("");
      });

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

  const deleteTodo = (id) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: 'DELETE'
    }).then(() => {
      const newList = list.filter(todo => todo.id !== id);
      setList(newList);
    })
  };

  const handleCheckboxChange = (event) => {
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

    const changedIndex = list.findIndex(item => item.id === parseInt(id));
    const listWithoutChanged = list.filter(item => item.id !== parseInt(id));

    const updatedItem = { id: parseInt(id), isChecked: event.target.checked, todos: description };

    listWithoutChanged.splice(changedIndex, 0, updatedItem);
    setList(listWithoutChanged);
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

              <button type="button" onClick={() => deleteTodo(item.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}