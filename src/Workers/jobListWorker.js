import JobList from "../Data/JobList";

// eslint-disable-next-line no-restricted-globals
onmessage = (event) => {
  
  const { filterSkills, filterMinSalary, currentPage, pageSize } = event.data;

  const skillsFilteredJobs = [];
  if(filterSkills.length){
    for(let i = 0 ;i<JobList.length; i++){
      for(let j=0; j<filterSkills.length; j++){
        if(JobList[i].skills.includes(filterSkills[j])){
          skillsFilteredJobs.push(JobList[i]);
        }
      }
    }
  }

  let resJobs =[];
  if(skillsFilteredJobs.length){
    resJobs = skillsFilteredJobs.slice((currentPage*pageSize), ((currentPage+1)*pageSize));
  }else{
   resJobs = JobList.slice((currentPage*pageSize), ((currentPage+1)*pageSize));
  }
  setTimeout(() => {
    // eslint-disable-next-line no-restricted-globals
    postMessage({
      resJobs: resJobs,
    });
  }, 2000);

  
};
