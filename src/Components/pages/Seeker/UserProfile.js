import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import AppContext from '../../../store/app-context';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  Card,
  Select,
  Avatar,
  Divider,
  List,
  Skeleton,
} from 'antd';
import UserProfileConstants from '../../../Constants/UserProfileConstants';
import { debounce } from '../../../Utils/PerformanceUtils';
import { AuthToken } from '../../../Constants/AppConstants';
import useHttp from '../../../Hooks/useHttp';

const {
  genderOptions,
  locationOptions,
  yoeOptions,
  degreeOptions,
  skillsOptions,
} = UserProfileConstants;

const UserProfile = props => {
  const appCtx = useContext(AppContext);
  const navigate = useNavigate();
  const [gitUserName, setGitUserName] = useState('');
  const [userRepos, setUserRepos] = useState([]);
  const [success, setSuccess] = useState(false);
  const [forcedError, setForcedError] = useState(false);
  const pageSize = useRef(10);
  const currentPage = useRef(0);
  const { isLoading, error, sendRequest: fetchRepos } = useHttp();

  useEffect(() => {
    if (appCtx.userProfile !== 'seeker') {
      navigate('/');
    }
  }, [appCtx, navigate]);

  const transformFunc = useCallback(response => {
    setUserRepos(prevUserData => {
      const userReposCopy = [...prevUserData];
      const formattedResponse = response.map(repo => {
        return {
          name: repo.name,
          language: repo.language,
          avatar: repo.owner ? repo.owner.avatar_url : '',
          ownerId: repo.owner ? repo.owner.login : '',
          id: repo.id,
          url: repo.html_url,
        };
      });
      const userReposUpdated = userReposCopy.concat(formattedResponse);
      return userReposUpdated;
    });
    currentPage.current = currentPage.current + 1;
    setForcedError(false);
    setSuccess(true);
  }, []);

  const fetchMoreData = useCallback(() => {
    if (gitUserName !== '' && gitUserName.trim() !== '') {
      const resquestConfig = {
        url: `https://api.github.com/users/${gitUserName}/repos?per_page=${pageSize.current}&&page=${currentPage.current}`,
        headers: {
          Authorization: `Bearer ${AuthToken}`,
        },
        errorMessage: 'Please enter a valid git username',
      };
      fetchRepos(resquestConfig, transformFunc);
    }
  }, [gitUserName, transformFunc, fetchRepos]);

  useEffect(() => {
    fetchMoreData();
    fetchMoreData();
  }, [fetchMoreData]);

  const onFinish = values => {
    console.log('Success:', values);
    // ctx.onLogin('employer');
    // navigate('/jobs');
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const onValuesChange = values => {
    // console.log('Failed:', values);
    // values.username ? setUserName(values.username || '') : setPassword(values.password || '')
  };

  const onChangeHandler = event => {
    setGitUserName(event.target.value);
    setForcedError(true);
  };

  const debouncedOnChangeHandler = debounce(onChangeHandler, 700);
  const help = isLoading
    ? 'Validating...'
    : error || forcedError
    ? 'Please enter a valid git username'
    : undefined;
  const validateStatus = isLoading
    ? 'validating'
    : error || forcedError
    ? 'error'
    : success
    ? 'success'
    : undefined;

  return (
    <Card
      title="Enter Your Details"
      bordered={false}
      style={{ width: 700, boxShadow: '0px 2px 5px 0px rgba(56,43,56,1)' }}
      headStyle={{ textAlign: 'center', fontSize: '2.5rem' }}
      bodyStyle={{ fontSize: '1.5rem' }}
    >
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ offset: 1, span: 14 }}
        style={{ maxWidth: 600, paddingTop: 30 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        autoComplete="off"
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please enter your First Name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          //rules={[{ required: true, message: 'Please enter your Last Name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please select your gender!' }]}
        >
          <Select style={{ width: 120 }} allowClear options={genderOptions} />
        </Form.Item>

        <Form.Item
          label="Preferred Location"
          name="location"
          rules={[
            {
              required: true,
              message: 'Please select your preferred Location!',
            },
          ]}
        >
          <Select style={{ width: 120 }} allowClear options={locationOptions} />
        </Form.Item>
        <Form.Item
          label="Years of Experience"
          name="yoe"
          rules={[
            {
              required: true,
              message:
                'Please select your years of experience from the above mentioned range!',
            },
          ]}
        >
          <Select style={{ width: 120 }} allowClear options={yoeOptions} />
        </Form.Item>
        <Form.Item
          label="Highest Education"
          name="education"
          rules={[
            {
              required: true,
              message:
                'Please select your Highest education from the above list!',
            },
          ]}
        >
          <Select style={{ width: 200 }} allowClear options={degreeOptions} />
        </Form.Item>
        <Form.Item
          label="Contact Number"
          name="contactNumber"
          rules={[
            {
              required: true,
              message: 'Please enter a valid 10 digit number!',
              pattern: new RegExp('^[0-9]{10}$'),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Skills"
          name="skills"
          rules={[
            {
              required: true,
              message: 'Please select your skills from the skills list!',
            },
          ]}
        >
          <Select
            placeholder="select one or more skills"
            mode="multiple"
            style={{ width: '100%', cursor: 'pointer' }}
            options={skillsOptions}
          />
        </Form.Item>

        <Form.Item
          label="Github username"
          hasFeedback
          validateStatus={validateStatus}
          help={help}
          required
          // rules={[
          //   { required: true, message: 'Please select your skills from the skills List!' },
          // ]}
        >
          <Input onChange={debouncedOnChangeHandler} />
        </Form.Item>

        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please enter your First Name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 10 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              background: '#33B566',
              marginTop: '1.5rem',
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserProfile;
