import { useEffect, useState } from "react";
import type { User } from "firebase/auth";

// Pages that need Firebase anyway; elsewhere it's only loaded for browsers that have signed in before
const RECRUITER_ROUTES = ["/company-auth", "/payment", "/drivers-job-board", "/hire-drivers", "/delete-account"];

// A plain flag (never a token) recording that this browser has a recruiter session
const SESSION_HINT_KEY = "trukflow.recruiterSession";

const readHint = () => {
  try {
    return localStorage.getItem(SESSION_HINT_KEY) === "1";
  } catch {
    return false;
  }
};

const writeHint = (signedIn: boolean) => {
  try {
    if (signedIn) {
      localStorage.setItem(SESSION_HINT_KEY, "1");
    } else {
      localStorage.removeItem(SESSION_HINT_KEY);
    }
  } catch {
    // Storage unavailable; Firebase will simply load on recruiter pages only
  }
};

/**
 * The signed-in recruiter, without putting Firebase (~35KB compressed) on the
 * critical path of marketing pages for visitors who have never signed in.
 */
export const useRecruiterUser = (pathname: string) => {
  const [user, setUser] = useState<User | null>(null);
  const shouldLoad = RECRUITER_ROUTES.includes(pathname) || readHint();

  useEffect(() => {
    if (!shouldLoad) return;

    let unsubscribe: (() => void) | undefined;
    let cancelled = false;

    Promise.all([import("@/lib/firebase"), import("firebase/auth")]).then(([{ auth }, { onAuthStateChanged }]) => {
      if (cancelled) return;
      unsubscribe = onAuthStateChanged(auth, (nextUser) => {
        setUser(nextUser);
        writeHint(!!nextUser);
      });
    });

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [shouldLoad]);

  return user;
};

export const signOutRecruiter = async () => {
  const [{ auth }, { signOut }] = await Promise.all([import("@/lib/firebase"), import("firebase/auth")]);
  writeHint(false);
  await signOut(auth);
};
