import { useCallback, useEffect, useRef, useState } from "react";
import { useMeStore } from "../store/me";


export const useMe = () => {
    const wasCalled = useRef(false);
    const data = useMeStore((state) => ({
      email: state.email,
      status: state.status
    }))
    const setEmail = useMeStore((state) => state.setEmail)
    const setStatus = useMeStore((state) => state.setStatus)

    const fetchEmail = useCallback(async () => {
        setStatus('pending');
        setEmail(
           (await fetch("/api/getMe").then((res) => res.json())).
           email
        );
        setStatus('resolved');
    }, [setEmail, setStatus]);
  
    useEffect(() => {
      if (wasCalled.current === false) {
        fetchEmail();
        wasCalled.current = true;
      }
    }, [fetchEmail]);
  
    return data;
  };