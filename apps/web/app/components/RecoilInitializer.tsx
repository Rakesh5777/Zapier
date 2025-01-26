"use client";

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { isAuthenticatedState } from "../atoms/authAtoms";
import { parseCookies } from "nookies";

export default function RecoilInitializer() {
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies["auth_token"];
    setIsAuthenticated(!!token);
  }, [setIsAuthenticated]);

  return null;
}
