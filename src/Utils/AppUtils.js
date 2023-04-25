export const generateGithubRepoUrl = function (gitUserName, pageSize, currentPage){
    return `https://api.github.com/users/${gitUserName}/repos?per_page=${pageSize}&&page=${currentPage}`;
}