import * as React from "react";
import { useDispatch } from "react-redux";
import { addUrl } from "../redux/reducers/urlList.reducer";
import { Url } from "../interfaces";
import { openAddMultiModal } from "../redux/reducers/modal.reducer";
import { Switch } from "@mui/material";

const Auto: React.FC = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(false);

  //check having many tabs or not
  React.useEffect(() => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      if (tabs.length > 1) setChecked(true);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleSave = async () => {
    if (chrome.tabs) {
      const currentWindow = await chrome.tabs.query({ currentWindow: true });
      console.log(currentWindow);

      //have only 1 tab
      if (currentWindow.length == 1) {
        const tab = currentWindow[0];

        let url = tab.url;
        let label = tab.title;
        let icon = tab.favIconUrl;

        dispatch(addUrl({ url, label, icon } as Url));
        setChecked(false);
      } else {
        //have more than one tab (many tabs)
        //check only save current active tab or not
        if (!checked) {
          const currentWindow = await chrome.tabs.query({
            active: true,
            currentWindow: true,
          });
          const tab = currentWindow[0];

          let url = tab.url;
          let label = tab.title;
          let icon = tab.favIconUrl;

          dispatch(addUrl({ url, label, icon } as Url));
        } else {
          //confirm save many tabs
          dispatch(openAddMultiModal(true));
        }
      }
    }
  };

  return (
    <>
      <div className="sidebarr flex justify-center items-center relative">
        <div className="w-[110px] h-[110px] border-green-800 border-[5px] bg-transparent rounded-full flex justify-center items-center">
          <button
            onClick={handleSave}
            className="btnSave w-[70px] h-[70px] rounded-full px-2 py-1 border-none bg-green-500 text-white font-bold text-[20px] transition-all hover:shadow-green-400"
          >
            Save
          </button>
        </div>
      </div>
      <div className="subControl flex bg-slate-950">
        <div className="w-1/2"></div>
        <div className="w-1/2 rounded-bl-[35px] rounded-br-[35px] bg-slate-900">
          <div className="subleft flex justify-center items-center">
            <i className="fa-regular fa-window-maximize"></i>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <i className="fa-regular fa-window-restore"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auto;
