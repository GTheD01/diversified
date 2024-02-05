import Modal from "../../components/common/Modal";
import ModalPortal from "../../components/common/ModalPortal";
import ExpensesForm from "../../components/forms/ExpensesForm";
import { modalClose, modalOpen } from "../../redux/features/modalSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ExpensesList from "../../components/common/ExpensesList";

const Expenses: React.FC = () => {
  const { modalState: modalShow } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const openModal = (e: any) => {
    e.preventDefault();
    dispatch(modalOpen());
  };

  const closeModal = () => {
    dispatch(modalClose());
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="text-3xl font-bold ">Expenses</div>
        <button
          className="bg-sky-100 hover:bg-sky-50 rounded-lg px-4 py-2 font-semibold focus-visible:outline-none mb-8"
          onClick={openModal}
        >
          + Add Expense
        </button>
      </div>

      {modalShow && (
        <div>
          <ModalPortal show={modalShow} onClick={closeModal}>
            <Modal onClick={closeModal} label="Add Expense">
              <ExpensesForm />
            </Modal>
          </ModalPortal>
        </div>
      )}

      <ExpensesList />
    </>
  );
};

export default Expenses;
