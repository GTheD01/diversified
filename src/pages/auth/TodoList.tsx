import Modal from "../../components/common/Modal";
import ModalPortal from "../../components/common/ModalPortal";
import {
  useDeleteTodosMutation,
  useRetrieveTodosQuery,
} from "../../redux/features/authApiSlice";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { modalClose, modalOpen } from "../../redux/features/modalSlice";
import { Spinner } from "../../components/common/Spinner";
import { toast } from "react-toastify";
import TodoForm from "../../components/forms/TodoForm";

import { IoAddCircle } from "react-icons/io5";

const TodoList = () => {
  const { modalState: modalShow } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  const { data: todos, isLoading, isFetching } = useRetrieveTodosQuery();
  const [deleteTodo] = useDeleteTodosMutation();

  const openModal = () => {
    dispatch(modalOpen());
  };

  const closeModal = () => {
    dispatch(modalClose());
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
    toast.success("Todo successfully deleted.");
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="lg:text-3xl sm:text-2xl font-bold">Todo List</div>
        <button
          className="bg-sky-100 hover:bg-sky-50 rounded-lg px-4 py-2 font-semibold focus-visible:outline-none flex items-center justify-center gap-2"
          onClick={openModal}
        >
          <IoAddCircle className="text-2xl" />
          Add To-Do
        </button>
        {modalShow ? (
          <div>
            <ModalPortal show={modalShow} onClick={closeModal}>
              <Modal
                onClick={closeModal}
                label="Add Todo"
                children={<TodoForm />}
              />
            </ModalPortal>
          </div>
        ) : (
          ""
        )}

        {isLoading || isFetching ? (
          <Spinner />
        ) : (
          todos?.map((todo) => (
            <div
              key={todo.id}
              className="border p-4 flex justify-between items-center"
            >
              <div>
                <h1 className="font-semibold capitalize mb-2">{todo.label}</h1>
                <p>- {todo.description}</p>
              </div>
              <div>
                <button
                  type="submit"
                  className="shadow-md rounded-lg"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default TodoList;
