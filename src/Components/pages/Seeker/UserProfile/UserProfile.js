import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import AppContext from "../../../../store/app-context";
import { useNavigate } from "react-router-dom";
import { Modal, Result } from "antd";
import { AuthToken } from "../../../../Constants/AppConstants";
import useHttp from "../../../../Hooks/useHttp";
import { generateGithubRepoUrl } from "../../../../Utils/AppUtils";
import "./UserProfile.scss";
import UserProfileForm from "./UseProfileForm";

const UserProfile = (props) => {
  const appCtx = useContext(AppContext);
  const navigate = useNavigate();
  const [gitUserName, setGitUserName] = useState("");
  const [userRepos, setUserRepos] = useState([]);
  const pageSize = useRef(10);
  const currentPage = useRef(0);
  const nextScroll = useRef(true);
  const [formError, setFormError] = useState(true);
  const [gitUserNameTouched, setGitUserNameTouched] = useState(false);
  // useHttp custom hook to make api calls
  const { isLoading, error, sendRequest: fetchRepos } = useHttp();
  const [showSubmitted, setShowSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  
  
  //useEffect to check if userprofile exists either on app context or on local storage
  useEffect(() => {
    if (appCtx.userProfile !== "seeker") {
      const userProfileLocal = localStorage.getItem("userProfile");
      if (!userProfileLocal || userProfileLocal !== "seeker") {
        navigate("/");
      } else {
        appCtx.onLogin(userProfileLocal);
      }
    }
  }, [appCtx, navigate]);

  //transform function passed as a callback to useHttp hook's sendRequest method to transform the response data
  const transformFunc = useCallback((response) => {
    if (response.length === 0) {
      nextScroll.current = false;
      return;
    }
    currentPage.current = currentPage.current + 1;
    setUserRepos((prevUserData) => {
      const userReposCopy = [...prevUserData];
      const formattedResponse = response.map((repo) => {
        return {
          name: repo.name,
          language: repo.language,
          avatar: repo.owner ? repo.owner.avatar_url : "",
          ownerId: repo.owner ? repo.owner.login : "",
          id: repo.id,
          url: repo.html_url,
        };
      });
      const userReposUpdated = userReposCopy.concat(formattedResponse);
      return userReposUpdated;
    });
  }, []);

  // function to fetch the github repositories
  const fetchMoreData = useCallback(() => {
    if (gitUserName !== "" && gitUserName.trim() !== "") {
      const resquestConfig = {
        url: generateGithubRepoUrl(
          gitUserName,
          pageSize.current,
          currentPage.current
        ),
        headers: {
          Authorization: `Bearer ${AuthToken}`,
        },
        errorMessage: "Please enter a valid git username",
      };
      fetchRepos(resquestConfig, transformFunc);
    }
  }, [gitUserName, transformFunc, fetchRepos]);

  useEffect(() => {
    fetchMoreData();
  }, [fetchMoreData]);

  //handler to handle modal close event for success modal
  const onCancelHandler = () => {
    setShowSubmitted(false);
  };

  return (
    <>
      <UserProfileForm
        onSetFirstName={setFirstName}
        onSetShowSubmitted={setShowSubmitted}
        onSetFormError={setFormError}
        onSetGitUserName={setGitUserName}
        onSetUserRepos={setUserRepos}
        onSetGitUserNameTouched={setGitUserNameTouched}
        currentPage={currentPage}
        nextScroll={nextScroll}
        error={error}
        gitUserName={gitUserName}
        gitUserNameTouched={gitUserNameTouched}
        isLoading={isLoading}
        userRepos={userRepos}
        fetchMoreData={fetchMoreData}
        formError={formError}
      />
      <Modal
        footer={null}
        open={showSubmitted}
        centered
        onCancel={onCancelHandler}
      >
        <Result
          style={{
            padding: 0,
          }}
          status="success"
          title="Success!"
          subTitle={`Congratulations! ${firstName.toUpperCase()}, you have successfully submitted your details.`}
        />
      </Modal>
    </>
  );
};

export default UserProfile;
