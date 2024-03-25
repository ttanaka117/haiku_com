import { useParams } from "react-router-dom";
import styles from "./TabSwitcher.module.scss";
import imgShihondo from "../../assets/shihondou.jpg";
import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

const TabContext = createContext<String>("first");
const SetTabContext = createContext<Dispatch<SetStateAction<String>>>(() => {});
type TabState = {
  activeKey: string;
  addItem: (title: string, key: string) => void;
  setActiveKey: (key: string) => void;
};

type TabItemProps = {
  key: string;
  title: string;
  children: React.ReactNode;
};
export function TabItem(props: TabItemProps) {
  const { title, key, children } = props;

  const state = useContext(TabContext);
  const setState = useContext(SetTabContext);

  // return key === activeKey ? <>{children}</> : null;
  return (
    <div onClick={() => setState(key)}>
      <div>{title}</div>
      <div>{key === state ? children : <div></div>}</div>
    </div>
  );
}

type TabValue = {
  title: string;
  key: string;
};
type TabSwicherProps = {
  defaultKey: string;
  children: JSX.Element;
};
export function TabSwicher({ defaultKey, children }: TabSwicherProps) {
  const [activeKey, setActiveKey] = useState<String>(defaultKey);

  useEffect(() => {
    console.log(activeKey);
  }, [activeKey]);

  // "2px solid rgb(164, 43, 43)";
  return (
    <TabContext.Provider value={activeKey}>
      <SetTabContext.Provider value={setActiveKey}>
        <div className={styles.tab_wrapper}>
          {children}
          {/* <div>{children}<div/> */}
          {/* {children ? (
            children.map(({ title, key }) => (
              <div
                key={key}
                className={`tab-item ${activeKey === key ? "active" : ""}`}
                onClick={() => setActiveKey(key)}
              >
                {title}
              </div>
            ))
          ) : (
            <></>
          )} */}
          {/* {children.props} */}
        </div>
      </SetTabContext.Provider>
    </TabContext.Provider>
  );
}
