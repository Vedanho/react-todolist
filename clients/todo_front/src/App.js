import "./App.css";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import { useDispatch, useSelector } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";
function App() {
  const loading = useSelector((state) => state.loading);
  return (
    <div className="App">
      <Header />
      <List />
      {loading && ( //Если идёт запрос на загрузку тудушек, то loading равен true и отображается кружок загрузки
        <>
          <LinearProgress color="primary"  />
        </>
      )}
    </div>
  );
}

export default App;
