import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditBtn from "./buttons/EditBtn";
import ShowBtn from "./buttons/ShowBtn";
import DeleteBtn from "./buttons/DeleteBtn";

const TodoList = () => {
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
      TODO: 列表
      <section className="message">
        <header className="message-header">
          <p>TODO: 標題</p>
        </header>
        <div className="message-body"></div>
        <footer className="card-footer">
          <ShowBtn />
          <a href="#" className="card-footer-item">
            <FontAwesomeIcon icon={faCheck} className="mr-2" />
            Done
          </a>
          <EditBtn />
          <DeleteBtn />
        </footer>
      </section>
    </div>
  );
};

export default TodoList;
