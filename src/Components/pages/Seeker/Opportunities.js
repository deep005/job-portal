import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import AppContext from "../../../store/app-context";
import { useNavigate } from "react-router-dom";

const Opportunities = (props) => {
  const appCtx = useContext(AppContext);
  const navigate = useNavigate();
  const [opprotunities, setOpportunities] = useState([]);
  const [filterSkills, setFilterSkills] = useState("");
  const [filterMinSalary, setFilterMinSlary] = useState("");
  const currentPage = useRef(0);
  const nextScroll = useRef(true);
  const [isLoading, setIsLoading] = useState(true);

  const worker = useMemo(() => {
    return new Worker(new URL("./worker.js", import.meta.url));
  }, []);

  useEffect(() => {
    if (appCtx.userProfile !== "seeker") {
      navigate("/");
    }
  }, [appCtx, navigate]);

  useEffect(() => {
    if (window.Worker !== 'undefined') {
      console.log("####", worker);
      const obj = {
        value: "Deep"
      }
       worker.postMessage(obj);
      worker.onmessage = (event) => {
        console.log("%%%%%%",event.data.value);
      };
    }
    return () => {
      if (window.Worker !== 'undefined') {
       worker.terminate()
      }
    };
  }, [worker]);

  return <div>Opportunities</div>;
};

export default Opportunities;
