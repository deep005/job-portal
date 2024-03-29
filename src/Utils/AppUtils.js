import { seeker, employer } from "../Data/LoginInfo";

export const generateGithubRepoUrl = function (
  gitUserName,
  pageSize,
  currentPage
) {
  return `https://api.github.com/users/${gitUserName}/repos?per_page=${pageSize}&&page=${currentPage}`;
};

export const generateFileUploadUrl = () => {
  return "https://www.mocky.io/v2/5cc8019d300000980a055e76";
}

export const validateLoginDetails = function (values, profile) {
  const LoginData = profile === "seeker" ? seeker : employer;
  let loginAccess = false;
  LoginData.forEach((user) => {
    if (
      values.username === user.userName &&
      values.password === user.password
    ) {
      loginAccess = true;
    }
  });
  return loginAccess;
};
