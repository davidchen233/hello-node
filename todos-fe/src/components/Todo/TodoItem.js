import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditBtn from "./buttons/EditBtn";
import DeleteBtn from "./buttons/DeleteBtn";
import axios from "axios";

const TodoList = () => {
  const { todoId } = useParams();
  const [item, setItem] = useState(null);
  const [creator, setCreator] = useState("");
  const [updator, setUpdator] = useState("");

  useEffect(async () => {
    let resTodo = await axios.get(`http://localhost:3001/api/todos/${todoId}`);
    let resCreator = await axios.get(
      `http://localhost:3001/api/members/${resTodo.data.creator_id}`
    );
    let resUpdator = await axios.get(
      `http://localhost:3001/api/members/${resTodo.data.updator_id}`
    );
    setItem(resTodo.data);
    setCreator(resCreator.data.name);
    setUpdator(resUpdator.data.name);
  }, []);
  if (item === null) {
    return (
      <>
        <span>載入中</span>
      </>
    );
  }
  return (
    <>
      <div className="column is-three-fifths">
        <article className="panel">
          <p className="panel-heading">{item.title}</p>
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={item.photo} alt="Placeholder image" />
            </figure>
          </div>
          <div className="panel-block">{item.content}</div>
          <ul>
            <li className="panel-block">
              到期日: {item.deadline.slice(0, 10)}
            </li>
            <li className="panel-block">
              {creator} 於 {item.created_at.slice(0, 10)} 建立
            </li>
            <li className="panel-block">
              {updator} 於 {item.updated_at.slice(0, 10)} 更新
            </li>
          </ul>
          <footer className="card-footer">
            <a href="/#" className="card-footer-item">
              <FontAwesomeIcon icon={faCheck} className="mr-2" />
              Done
            </a>
            <EditBtn />
            <DeleteBtn />
          </footer>
        </article>
      </div>
      <div className="column is-two-fifths">
        <article className="panel is-link">
          <p className="panel-heading">共享</p>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input className="input" type="email" placeholder="輸入帳號" />
            </div>
            <div className="control">
              <a className="button is-info">新增</a>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default TodoList;
