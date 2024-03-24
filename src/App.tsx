import "./App.css";
import ListUrl from "./components/ListUrl";
import TitleSection from "./components/TitleSection";
import ContentSection from "./components/ContentSection";
import ExtensionWrapper from "./components/ExtensionWrapper";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import ModalConfirm from "./components/ModalConfirm";
import ModalSingleDelete from "./components/ModalSingleDelete";
import ModalMultiDelete from "./components/ModalMultiDelete";
import ModalMultiOpen from "./components/ModalMultiOpen";

function App() {
  return (
    <>
      <BrowserRouter>
        <ExtensionWrapper>
          <ModalConfirm />
          <ModalSingleDelete />
          <ModalMultiDelete />
          <ModalMultiOpen />
          <TitleSection />
          <ContentSection>
            <Navbar />
            <ListUrl />
          </ContentSection>
        </ExtensionWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
