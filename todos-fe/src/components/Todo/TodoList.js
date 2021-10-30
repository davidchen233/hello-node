import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditBtn from "./buttons/EditBtn";
import ShowBtn from "./buttons/ShowBtn";
import DeleteBtn from "./buttons/DeleteBtn";
import axios from "axios";
import { STATUS_WORD, STATUS_COLOR } from "../../config/status";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(async () => {
    // 取得從API得來的資料
    let res = await axios.get("http://localhost:3001/api/todos");
    setTodos(res.data);
  }, []);

  return (
    <div className="column is-three-fifths">
      <nav
        className="pagination is-success"
        role="navigation"
        aria-label="pagination"
      >
        <ul className="pagination-list"></ul>
      </nav>
      <div className="level">
        <div className="level-item">
          <div className="buttons">
            <button className="button is-info">進行中</button>
            <button className="button is-success">已完成</button>
            <button className="button is-danger">已暫停</button>
          </div>
        </div>
      </div>
      TODO: 列表{" "}
      {todos.map((v) => {
        return (
          <section className={`message ${STATUS_COLOR[v.status]}`} key={v.id}>
            <header className="message-header">
              <p>
                {STATUS_WORD[v.status]} {v.title}
              </p>
            </header>
            <div className="message-body">
              {v.content}
              <div>到期日期: {v.deadline}</div>
            </div>
            <footer className="card-footer">
              <ShowBtn />
              <a href="/#" className="card-footer-item">
                <FontAwesomeIcon icon={faCheck} className="mr-2" />
                Done
              </a>
              <EditBtn />
              <DeleteBtn />
            </footer>
          </section>
        );
      })}
    </div>
  );
};

export default TodoList;
