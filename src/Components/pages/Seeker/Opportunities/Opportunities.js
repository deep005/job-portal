import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import AppContext from "../../../../store/app-context";
import { useNavigate } from "react-router-dom";
import OpportunityListItem from "../../../UI/OpportunityListItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, List, Skeleton, message, Spin, Modal } from "antd";
import FiltersCard from "./FiltersCard";

const Opportunities = (props) => {
  const appCtx = useContext(AppContext);
  const navigate = useNavigate();
  const [opprotunities, setOpportunities] = useState([]);
  const filterSkills = useRef([]);
  const filterMinSalary = useRef("");
  const [reRender, setReRender] = useState(false);
  const currentPage = useRef(0);
  const pageSize = useRef(20);
  const nextScroll = useRef(true);
  const [messageApi, contextHolder] = message.useMessage();

  const worker = useMemo(() => {
    return new Worker(
      new URL("../../../../Workers/jobListWorker.js", import.meta.url)
    );
  }, []);

  useEffect(() => {
    const seekerData = JSON.parse(window.localStorage.getItem("seekerData"));
    if (seekerData) {
      appCtx.onSetUserDataFilled(true);
    }
  }, [ appCtx]);

  useEffect(() => {
    if (appCtx.userProfile !== 'seeker') {
      const userProfileLocal = localStorage.getItem("userProfile");
      if(!userProfileLocal || userProfileLocal !== 'seeker'){
        navigate('/');
      }else{
        appCtx.onLogin(userProfileLocal);
      }
    }
  }, [appCtx, navigate]);


  const fetchMoreData = useCallback(() => {
    if (window.Worker !== "undefined") {
      const requestObj = {
        filterSkills: filterSkills.current,
        filterMinSalary: filterMinSalary.current,
        currentPage: currentPage.current,
        pageSize: pageSize.current,
      };
      worker.postMessage(requestObj);
      worker.onmessage = (event) => {
        currentPage.current = currentPage.current + 1;
        setOpportunities((prevState) => {
          const userReposCopy = [...prevState];
          const userReposUpdated = userReposCopy.concat(event.data.resJobs);
          return userReposUpdated;
        });
        setReRender(false);
        if (!event.data.resJobs.length) {
          nextScroll.current = false;
        }
      };
    }
  }, [worker, filterSkills, filterMinSalary]);

  useEffect(() => {
    if (reRender) {
      currentPage.current = 0;
      nextScroll.current = true;
      setOpportunities([]);
      fetchMoreData();
    }
  }, [reRender, fetchMoreData]);

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
      <>
        <FiltersCard
          skillsRef={filterSkills}
          salaryRef={filterMinSalary}
          resetOpportunities={setReRender}
        />
        <div
          id="scrollableDiv"
          style={{
            height: "calc(100vh - 16rem)",
            overflow: "auto",
            padding: "0 16px",
            scrollbarTrackColor: "dark",
            width: "95.8vw",
            border: "1px solid rgba(140, 140, 140, 0.35)",
          }}
        >
          <InfiniteScroll
            dataLength={opprotunities.length}
            next={fetchMoreData}
            scrollableTarget="scrollableDiv"
            style={{
              minWidth: "95vw",
            }}
            hasMore={nextScroll.current}
            loader={<Skeleton avatar paragraph={{ rows: 3 }} active />}
            endMessage={<Divider plain>End of List!</Divider>}
          >
            <List
              dataSource={opprotunities}
              renderItem={(opprotunity, index) => (
                <OpportunityListItem
                opprotunity={opprotunity}
                  key={opprotunity.id}
                  onClickHandler={onApplyHandler.bind(null, opprotunity)}
                />
              )}
            />
          </InfiniteScroll>
        </div>
      </>
      <Modal centered open={reRender} footer={null} closable={false}>
        <Spin size="large"></Spin>
      </Modal>
    </>
  );
};

export default Opportunities;
