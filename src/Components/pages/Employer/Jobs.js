import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import AppContext from "../../../store/app-context";
import applicantsData from "../../../Data/Applicants";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import JobPostingsListListItem from "../../UI/JobPostingsListListItem";
import { Divider, List, Skeleton, Spin, Modal, Collapse } from "antd";
import ApplicantListItem from "../../UI/ApplicantListItem";
import AddJobCard from "./AddJobCard";

const { Panel } = Collapse;


const Jobs = (props) => {
  const appCtx = useContext(AppContext);
  const navigate = useNavigate();
  const [postedJobs, setPostedJobs] = useState([]);
  const currentPage = useRef(0);
  const pageSize = useRef(7);
  const [jobId, setJobId] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const nextScroll = useRef(true);
  const timerRef = useRef(null);
  const [jobCreation, setJobCreation] = useState(false)

  const jobsPostedWorker = useMemo(() => {
    return new Worker(
      new URL("../../../Workers/employerJobsWorker.js", import.meta.url)
    );
  }, []);


  useEffect(() => {
    if (jobId !== "") {
      let resApplicants = [];
      applicantsData.forEach((applicantObj) => {
        if (applicantObj.jobId === jobId) {
          resApplicants = Object.assign([], applicantObj.applicants);
        }
      });
      timerRef.current = setTimeout(()=>{
        setApplicants(resApplicants);
        setIsLoading(false);
        setJobId("");
      }, 2000);
    }
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [jobId]);

  useEffect(() => {
    if (appCtx.userProfile !== 'employer') {
      const userProfileLocal = localStorage.getItem("userProfile");
      if(!userProfileLocal || userProfileLocal !== 'employer'){
        navigate('/');
      }else{
        appCtx.onLogin(userProfileLocal);
      }
    }
  }, [appCtx, navigate]);

  const fetchMorePostedJobsData = useCallback(() => {
    if (window.Worker !== "undefined") {
      const requestObj = {
        currentPage: currentPage.current,
        pageSize: pageSize.current,
      };
      jobsPostedWorker.postMessage(requestObj);
      jobsPostedWorker.onmessage = (event) => {
        currentPage.current = currentPage.current + 1;
        setPostedJobs((prevState) => {
          const postedJobsCopy = [...prevState];
          const postedJobsUpdated = postedJobsCopy.concat(
            event.data.resPostedJobs
          );
          return postedJobsUpdated;
        });
        if (!event.data.resPostedJobs.length) {
          nextScroll.current = false;
        }
      };
    }
  }, [jobsPostedWorker]);

  useEffect(() => {
    fetchMorePostedJobsData();
    return () => {
      if (window.Worker !== "undefined") {
        jobsPostedWorker.terminate();
      }
    };
  }, [jobsPostedWorker, fetchMorePostedJobsData]);

  const onViewApplicantsHandler = (postedJob) => {
    console.log("setting id", postedJob.jobId);
    setJobId(postedJob.jobId);
    setIsLoading(true);
  };
  const onCancelHandler = () => {
    setJobId("");
    setApplicants([]);
  };

  return (
    <>
    <AddJobCard onJobCreation={setJobCreation}/>
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
          dataLength={postedJobs.length}
          scrollableTarget="scrollableDiv"
          next={fetchMorePostedJobsData}
          style={{
            minWidth: "95vw",
          }}
          hasMore={nextScroll.current}
          loader={<Skeleton avatar paragraph={{ rows: 3 }} active />}
          endMessage={<Divider plain>End of List!</Divider>}
        >
          <List
            dataSource={postedJobs}
            renderItem={(postedJob, index) => (
              <JobPostingsListListItem
                postedJob={postedJob}
                key={postedJob.id}
                onClickHandler={onViewApplicantsHandler.bind(null, postedJob)}
              />
            )}
          />
        </InfiniteScroll>
        </div>
      <Modal centered open={isLoading} footer={null} closable={false}>
        <Spin size="large"></Spin>
      </Modal>
      <Modal
        title="Applicants"
        footer={null}
        open={applicants.length > 0}
        centered
        onCancel={onCancelHandler}
      >
        <List
          dataSource={applicants}
          renderItem={(applicant) => (
            <Collapse style={{
              fontSize : 16,
              marginBottom: 10
            }}>
              <Panel header={applicant.firstName} >
                <ApplicantListItem
                  currPosition={applicant.currPosition}
                  gender={applicant.gender}
                  experience={applicant.yoe}
                  contact={applicant.contact}
                  education={applicant.education}
                  skills={applicant.skills}
                  location={applicant.location}
                />
              </Panel>
            </Collapse>
          )}
        />
      </Modal>
    </>
  );
};

export default Jobs;
