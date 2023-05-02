import JobPostings from "../Data/JobPostings.json";

// eslint-disable-next-line no-restricted-globals
onmessage = (event) => {
  const { currentPage, pageSize } = event.data;
  
  const resPostedJobs = JobPostings.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  setTimeout(() => {
    // eslint-disable-next-line no-restricted-globals
    postMessage({
      resPostedJobs: resPostedJobs,
    });
  }, 2000);
};
