import { useEffect } from "react";
import { useVerifyMutation } from "../redux/features/authApiSlice";
import { useAppDispatch } from "../redux/hooks";
import { finishInitialLoad, setAuth } from "../redux/features/authSlice";

export default function useVerify() {
  const dispatch = useAppDispatch();

  const [verify] = useVerifyMutation();

  useEffect(() => {
    verify(undefined)
      .unwrap()
      .then(() => {
        dispatch(setAuth());
      })
      .finally(() => {
        dispatch(finishInitialLoad());
      });
  }, []);
}