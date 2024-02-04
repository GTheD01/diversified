import { toast } from "react-toastify";
import Modal from "../../components/common/Modal";
import ModalPortal from "../../components/common/ModalPortal";
import { Spinner } from "../../components/common/Spinner";
import ExpensesForm from "../../components/forms/ExpensesForm";
import {
  useDeleteExpensesMutation,
  useRetrieveExpensesQuery,
} from "../../redux/features/authApiSlice";
import { modalClose, modalOpen } from "../../redux/features/modalSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Expenses = () => {
  const { modalState: modalShow } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const { data: expenses, isLoading, isFetching } = useRetrieveExpensesQuery();
  const [deleteExpense] = useDeleteExpensesMutation();

  const totalExpenses = expenses
    ?.map((expense) => Number(expense.price))
    .reduce((acc, val) => acc + val, 0);

  const openModal = (e: any) => {
    e.preventDefault();
    dispatch(modalOpen());
  };

  const closeModal = () => {
    dispatch(modalClose());
  };

  const handleDeleteExpense = (id: string) => {
    deleteExpense(id);
    toast.success("Expense successfully deleted.");
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

      {modalShow ? (
        <div>
          <ModalPortal show={modalShow} onClick={closeModal}>
            <Modal
              onClick={closeModal}
              label="Add Expense"
              children={<ExpensesForm />}
            />
          </ModalPortal>
        </div>
      ) : (
        ""
      )}

      {isLoading || isFetching ? (
        <Spinner />
      ) : (
        <table className="border border-black border-collapse w-full mt-4">
          <thead>
            <tr className="*:border-black *:border *:border-collapse *:border-solid *:p-2">
              <th>Expense</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses
              ?.map((expense) => {
                const timeFormated = new Date(
                  expense.created_at
                ).toLocaleDateString();

                return (
                  <tr
                    className="*:border-black *:border *:border-collapse *:border-solid *:p-2 odd:bg-sky-100"
                    key={expense.created_at}
                  >
                    <td>{expense.label}</td>
                    <td>
                      {Number(expense.price)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      $
                    </td>
                    <td>{timeFormated}</td>
                    <td
                      className="text-center cursor-pointer hover:scale-125"
                      onClick={() => handleDeleteExpense(expense.id)}
                    >
                      🗑️
                    </td>
                  </tr>
                );
              })
              .reverse()}
          </tbody>
        </table>
      )}

      {/* {isLoading || isFetching ? (
        <Spinner />
      ) : (
        expenses
          ?.map((expense) => (
            <div
              key={expense.id}
              className="border p-4 flex justify-between items-center"
            >
              <div>
                <h1 className="font-semibold capitalize mb-2">
                  {expense.label}
                </h1>
                <p>
                  -{" "}
                  {Number(expense.price)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  $
                </p>
              </div>
              <div>
                <button
                  type="submit"
                  className="shadow-md rounded-lg"
                  onClick={() => handleDeleteExpense(expense.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
          .reverse()
      )} */}

      <div className="m-4">
        <p className="font-semibold">
          Total:{" "}
          {Number(totalExpenses)
            ?.toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          $
        </p>
      </div>
    </>
  );
};

export default Expenses;
