import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import AppContext from "../../../store/app-context";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, List, Skeleton, Button, message } from "antd";

const Opportunities = (props) => {
  const appCtx = useContext(AppContext);
  const navigate = useNavigate();
  const [opprotunities, setOpportunities] = useState([]);
  const [filterSkills, setFilterSkills] = useState("");
  const [filterMinSalary, setFilterMinSlary] = useState("");
  const currentPage = useRef(0);
  const pageSize = useRef(20);
  const nextScroll = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const worker = useMemo(() => {
    return new Worker(new URL("./worker.js", import.meta.url));
  }, []);

  useEffect(() => {
    if (appCtx.userProfile !== "seeker") {
      navigate("/");
    }
  }, [appCtx, navigate]);

  const fetchMoreData = useCallback(() => {
    if (window.Worker !== "undefined") {
      const requestObj = {
        filterSkills: filterSkills,
        filterMinSalary: filterMinSalary,
        currentPage: currentPage.current,
        pageSize: pageSize.current,
      };
      worker.postMessage(requestObj);
      setIsLoading(true);
      worker.onmessage = (event) => {
        currentPage.current = currentPage.current + 1;
        setIsLoading(false);
        setOpportunities((prevState) => {
          const userReposCopy = [...prevState];
          const userReposUpdated = userReposCopy.concat(event.data.resJobs);
          return userReposUpdated;
        });
        if (!event.data.resJobs.length) {
          nextScroll.current = false;
        }
        console.log("%%%%%%", event.data.resJobs);
      };
    }
  }, [worker, filterSkills, filterMinSalary]);

  useEffect(() => {
    fetchMoreData();
    return () => {
      if (window.Worker !== "undefined") {
        worker.terminate();
      }
    };
  }, [worker, fetchMoreData]);

  const displaySuccessMessage = (opportunity) => {
    messageApi.success(
      `Successfully applied for the position of ${
        opportunity.position ? opportunity.position : "Data Scientist"
      } at ${opportunity.companyName}`
    );
  };
  const onApplyHandler = (opportunity) => {
    const opprotunitiesCopy = opprotunities.map((job) => {
      if (job.id !== opportunity.id) {
        return job;
      } else {
        return {
          ...job,
          applied: true,
        };
      }
    });
    displaySuccessMessage(opportunity);
    setOpportunities(opprotunitiesCopy);
  };

  return (
    <>
    {contextHolder}
    <InfiniteScroll
      dataLength={opprotunities.length}
      next={fetchMoreData}
      style={{
        minWidth: "95vw",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
      hasMore={nextScroll.current}
      loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
      endMessage={<Divider plain>End of List!</Divider>}
    >
      <List
        dataSource={opprotunities}
        // itemLayout="vertical"
        renderItem={(opprotunity, index) => (
          <List.Item
            style={{
              padding: "10px",
            }}
            key={opprotunity.id}
            actions={[
              <Button
                type="primary"
                disabled={opprotunity.applied ? opprotunity.applied : false}
                onClick={onApplyHandler.bind(null, opprotunity)}
              >
                Apply
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={<h2>{opprotunity.companyName}</h2>}
              description={
                opprotunity.position ? opprotunity.position : "Data Scientist"
              }
            />
            {<div>{opprotunity.skills}</div>}
          </List.Item>
        )}
      />
    </InfiniteScroll>
    </>
  );
};

export default Opportunities;
