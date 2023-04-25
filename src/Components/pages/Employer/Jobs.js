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
import { Divider, List, Skeleton, Spin, Modal, Collapse, notification} from "antd";
import ApplicantListItem from "../../UI/ApplicantListItem";
import AddJobCard from "./AddJobCard";
import JobForm from "./JobForm";


const { Panel } = Collapse;


const Jobs = (props) => {
  const [api, contextHolder] = notification.useNotification();
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
  const [jobCreation, setJobCreation] = useState(false);
  const [newJob, setNewJob] = useState({});

  const openNotificationWithIcon = useCallback((type) => {
    api[type]({
      message: "Success",
      duration: 3,
      description: "New job created!",
    });
  }, [api]); 

  const jobsPostedWorker = useMemo(() => {
    return new Worker(
      new URL("../../../Workers/employerJobsWorker.js", import.meta.url)
    );
  }, []);
  

  useEffect(()=>{
    if(newJob.company){
      setPostedJobs(prevState => {
        const postedJobsCopy = [...prevState];
        postedJobsCopy.unshift(newJob);
        return postedJobsCopy
      })
      openNotificationWithIcon("success")
    }
  },[newJob, openNotificationWithIcon]);

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
    setJobId(postedJob.jobId);
    setIsLoading(true);
  };
  const onCancelHandler = () => {
    setJobId("");
    setApplicants([]);
  };
  const jobTitleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: "20px",
    marginTop: 0
  };

  return (
    <>
    {contextHolder}
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
      <Modal
      open={jobCreation}
      title={<h3 style={jobTitleStyle}>Enter Job Details</h3>}
      centered
      footer={null}
      style={{ minWidth: 800}}
      onCancel={()=>{
        setJobCreation(false)
      }}
      >
        <JobForm onNewJob={setNewJob} onJobCreation={setJobCreation}/>
      </Modal>
    </>
  );
};

export default Jobs;
