// import { render } from "@testing-library/react";
import { useRetrieveExpensesQuery } from "../redux/features/authApiSlice";
import ExpensesList from "../components/pagecomponents/ExpensesList";
import { render, screen } from "@testing-library/react";
import CustomProvider from "../redux/provider";

jest.mock("../redux/features/authApiSlice", () => ({
  ...jest.requireActual("../redux/features/authApiSlice"),
  useRetrieveExpensesQuery: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  ...jest.requireActual("react-toastify"),
  toast: {
    success: jest.fn(),
  },
}));

global.fetch = jest.fn();

describe("ExpensesComponent", () => {
  it("Retrieving expenses API call ", async () => {
    (useRetrieveExpensesQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isFetching: false,
      isLoading: true,
    });

    render(
      <CustomProvider>
        <ExpensesList />
      </CustomProvider>
    );

    const loadingSpinner = screen.getByTestId("loading-spinner");
    expect(loadingSpinner).toBeInTheDocument();
  });

  it("renders expenses table when data is available", async () => {
    const mockExpenses = [
      {
        id: "1",
        label: "Expense 1",
        price: "10.00",
        created_at: new Date().toISOString(),
      },
      // Add more mock expenses as needed
    ];

    (useRetrieveExpensesQuery as jest.Mock).mockReturnValue({
      data: mockExpenses,
      isLoading: false,
      isFetching: false,
    });

    render(
      <CustomProvider>
        <ExpensesList />
      </CustomProvider>
    );

    // Add assertions based on your component's rendering logic
    const expenseRows = screen.getAllByRole("row"); // Adjust based on your actual DOM structure
    expect(expenseRows.length).toBe(mockExpenses.length + 1); // +1 for the table header row
  });
});
