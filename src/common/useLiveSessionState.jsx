import { useEffect, useState } from "react";

export const useBaseStorageState = (
  storage,
  storageKey,
  defaultValue,
  live = false,
) => {
  // Get value from storage, if not use default value
  const [state, setState] = useState(() => {
    const storageValue = storage.getItem(storageKey);
    return storageValue ? JSON.parse(storageValue) : defaultValue;
  });

  useLiveStorageListners(
    live,
    handleStorageEvent(storageKey, setState),
    storageKey,
  );

  // On change set storage.
  useEffect(() => {
    storage.setItem(storageKey, JSON.stringify(state));
  }, [storageKey, state]);

  const clear = () => {
    storage.removeItem(storageKey);
  };

  const setStateExternal = setStateBuilder(state, setState, live, storageKey);

  return [state, setStateExternal, clear];
};

export const useStorageState = (storageKey, defaultValue) =>
  useBaseStorageState(localStorage, storageKey, defaultValue, false);

export const useLiveStorageState = (storageKey, defaultValue) =>
  useBaseStorageState(localStorage, storageKey, defaultValue, true);

export const useSessionState = (storageKey, defaultValue) =>
  useBaseStorageState(sessionStorage, storageKey, defaultValue, false);

export const useLiveSessionState = (storageKey, defaultValue) =>
  useBaseStorageState(sessionStorage, storageKey, defaultValue, true);

function setStateBuilder(state, setState, live, storageKey) {
  return (newState) => {
    const oldValue = JSON.stringify(state);
    setState(newState);
    if (live) {
      const event = new StorageEvent(`state-persist-${storageKey}`, {
        key: storageKey,
        oldValue,
        newValue: JSON.stringify(newState),
      });
      window.dispatchEvent(event);
    }
  };
}

function useLiveStorageListners(live, handleStorageEvent, storageKey) {
  useEffect(() => {
    if (live) {
      window.addEventListener("storage", handleStorageEvent);
      window.addEventListener(
        `state-persist-${storageKey}`,
        handleStorageEvent,
      );
      return () => {
        window.removeEventListener("storage", handleStorageEvent);
        window.removeEventListener(
          `state-persist-${storageKey}`,
          handleStorageEvent,
        );
      };
    } else {
      window.removeEventListener("storage", handleStorageEvent);
    }
  }, [live, storageKey]);
}

export function handleStorageEvent(storageKey, setState) {
  return (evt) => {
    if (evt.key === storageKey && evt.newValue !== evt.oldValue) {
      setState(evt.newValue ? JSON.parse(evt.newValue) : evt.newValue);
    }
  };
}
