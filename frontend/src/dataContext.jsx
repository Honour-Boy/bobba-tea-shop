import { createContext, useState, useContext, useEffect } from "react";

const dataContext = createContext();
const setDataContext = createContext();
const indexContext = createContext();
const setIndexContext = createContext();
const usernameContext = createContext();
const setUsernameContext = createContext();
const windowWidthContext = createContext();

export function useData() {
  return useContext(dataContext);
}
export function useSetData() {
  return useContext(setDataContext);
}
export function useIndex() {
  return useContext(indexContext);
}
export function useSetIndex() {
  return useContext(setIndexContext);
}
export function useUsername() {
  return useContext(usernameContext);
}
export function useSetUsername() {
  return useContext(setUsernameContext);
}
export function useWindowWidth() {
  return useContext(windowWidthContext);
}

function DataProvider({ children }) {
  const [data, setData] = useState();
  const [index, setIndex] = useState();
  const [username, setUsername] = useState("Honour-boy");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function handleData(val) {
    setData(val);
  }

  function handleIndex(num) {
    setIndex(num);
  }

  function handleUsername(name) {
    setUsername(name);
  }

  useEffect(() => {
    function watchWidth() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", watchWidth);

    return function () {
      window.removeEventListener("resize", watchWidth);
    };
  }, []);

  return (
    <dataContext.Provider value={data}>
      <setDataContext.Provider value={handleData}>
        <indexContext.Provider value={index}>
          <setIndexContext.Provider value={handleIndex}>
            <usernameContext.Provider value={username}>
              <setUsernameContext.Provider value={handleUsername}>
                <windowWidthContext.Provider value={windowWidth}>
                  {children}
                </windowWidthContext.Provider>
              </setUsernameContext.Provider>
            </usernameContext.Provider>
          </setIndexContext.Provider>
        </indexContext.Provider>
      </setDataContext.Provider>
    </dataContext.Provider>
  );
}

export default DataProvider;
