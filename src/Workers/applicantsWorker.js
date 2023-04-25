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
  console.log("Inside worker", resApplicants);
  postMessage({
    resApplicants: resApplicants,
  });
  // setTimeout(() => {
  //   // eslint-disable-next-line no-restricted-globals
  //   postMessage({
  //     resApplicants: resApplicants,
  //   });
  // }, 2000);
};
