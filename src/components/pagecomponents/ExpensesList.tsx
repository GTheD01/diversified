import { Suspense, useMemo } from "react";
import { toast } from "react-toastify";

import {
  useDeleteExpensesMutation,
  useRetrieveExpensesQuery,
} from "../../redux/features/authApiSlice";
import { Spinner } from "../common/Spinner";

const ExpensesList = () => {
  const { data: expenses } = useRetrieveExpensesQuery();
  const [deleteExpense] = useDeleteExpensesMutation();

  const handleDeleteExpense = (id: string) => {
    deleteExpense(id);
    toast.success("Expense successfully deleted.");
  };

  const totalExpenses = useMemo(
    () =>
      expenses
        ?.map((expense) => Number(expense.price))
        .reduce((acc, val) => acc + val, 0),
    [expenses]
  );

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <table className="border border-black border-collapse w-full mt-4 dark:border-white">
          <thead>
            <tr className="*:border-black *:border *:border-collapse *:border-solid *:p-2 dark:text-white dark:*:border-white">
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
                    className="*:border-black *:border *:border-collapse *:border-solid *:p-2 odd:bg-sky-100 dark:even:bg-white dark:*:border-white"
                    key={expense.created_at}
                    role="row"
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
                      role="button"
                    >
                      🗑️
                    </td>
                  </tr>
                );
              })
              .reverse()}
          </tbody>
        </table>
      </Suspense>

      <div className="m-4">
        <p className="font-semibold dark:text-white">
          Total:{" "}
          {Number(totalExpenses)
            ?.toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          $
        </p>
      </div>
    </div>
  );
};

export default ExpensesList;
