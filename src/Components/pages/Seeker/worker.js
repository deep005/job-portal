import JobList from "../../../Data/JobList";

// eslint-disable-next-line no-restricted-globals
onmessage = (event) => {
  
  const { filterSkills, filterMinSalary, currentPage, pageSize } = event.data;

  const resJobs = JobList.slice((currentPage*pageSize), ((currentPage+1)*pageSize));
  setTimeout(() => {
    // eslint-disable-next-line no-restricted-globals
    postMessage({
      resJobs: resJobs,
    });
  }, 2000);

  // postMessage({
  //     value: event.data.value
  // });
};
