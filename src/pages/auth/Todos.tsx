import Modal from "../../components/common/Modal";
import ModalPortal from "../../components/common/ModalPortal";
import TodoForm from "../../components/forms/TodoForm";
import TodoList from "../../components/pagecomponents/TodoList";

import { modalClose, modalOpen } from "../../redux/features/modalSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { IoAddCircle } from "react-icons/io5";

const Todos = () => {
  const { modalState: modalShow } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(modalOpen());
  };

  const closeModal = () => {
    dispatch(modalClose());
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="lg:text-3xl sm:text-2xl font-bold dark:text-white">
          Todo List
        </div>
        <button
          className="bg-sky-100 hover:bg-sky-50 rounded-lg px-4 py-2 font-semibold focus-visible:outline-none flex items-center justify-center gap-2"
          onClick={openModal}
        >
          <IoAddCircle className="text-2xl" />
          Add To-Do
        </button>
        {modalShow && (
          <div>
            <ModalPortal onClick={closeModal}>
              <Modal label="Add Todo" children={<TodoForm />} />
            </ModalPortal>
          </div>
        )}

        <TodoList />
      </div>
    </>
  );
};

export default Todos;
