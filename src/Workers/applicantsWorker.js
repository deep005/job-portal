import Applicants from "../Data/Applicants";

// eslint-disable-next-line no-restricted-globals
onmessage = (event) => {
  const { jobId } = event.data;
  let resApplicants = [];
    Applicants.forEach((applicantObj)=>{
        if(applicantObj.jobId === jobId){
            resApplicants = Object.assign([], applicantObj.applicants);
        }
  })
  postMessage({
    resApplicants: resApplicants,
  });

};
