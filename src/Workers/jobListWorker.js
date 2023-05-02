import JobList from "../Data/JobList.json";

// eslint-disable-next-line no-restricted-globals
onmessage = (event) => {
  const { filterSkills, filterMinSalary, currentPage, pageSize } = event.data;

  let skillsFilteredJobs = [];
  let slarayFilterJobs = [];
  if (filterSkills.length) {
    for (let i = 0; i < JobList.length; i++) {
      for (let j = 0; j < filterSkills.length; j++) {
        if (
          JobList[i].skills
            .toLocaleLowerCase()
            .includes(filterSkills[j].toLocaleLowerCase())
        ) {
          skillsFilteredJobs.push(JobList[i]);
        }
      }
    }
  } else {
    skillsFilteredJobs = [...JobList];
  }
  if (filterMinSalary) {
    const minSalaryFilterValue = parseFloat(filterMinSalary.substring(1));
    for (let i = 0; i < skillsFilteredJobs.length; i++) {
      const perHour = parseFloat(skillsFilteredJobs[i].perHour.substring(1));
      if (minSalaryFilterValue < perHour) {
        slarayFilterJobs.push(skillsFilteredJobs[i]);
      }
    }
  } else {
    slarayFilterJobs = [...skillsFilteredJobs];
  }

  const resJobs = slarayFilterJobs.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  setTimeout(() => {
    // eslint-disable-next-line no-restricted-globals
    postMessage({
      resJobs: resJobs,
    });
  }, 2000);
};
