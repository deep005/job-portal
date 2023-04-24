import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
  //useLayoutEffect
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
  Spin
} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserProfileConstants from '../../../Constants/UserProfileConstants';
import { debounce } from '../../../Utils/PerformanceUtils';
import { AuthToken } from '../../../Constants/AppConstants';
import useHttp from '../../../Hooks/useHttp';
import './UserProfile.scss';

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
  const pageSize = useRef(10);
  const currentPage = useRef(0);
  const nextScroll = useRef(true);
  const info = useRef(null);
  const [formError, setFormError] = useState(true);
  const formRef = useRef(null);
  const apiErrorInfo = useRef(null);
  const [gitUserNameTouched, setGitUserNameTouched] = useState(false);
  const { isLoading, error, sendRequest: fetchRepos } = useHttp();
  useEffect(() => {
    if (appCtx.userProfile !== 'seeker') {
      navigate('/');
    }
  }, [appCtx, navigate]);

  const transformFunc = useCallback(
    response => {
      if (response.length === 0) {
        nextScroll.current = false;
        return;
      }
      currentPage.current = currentPage.current + 1;
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
    },
    []
  );

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
  }, [fetchMoreData]);

  const onFinish = values => {
    if (!values.lastName) {
      values.lastName = '';
    }
    if (!values.githubUserName) {
      values.githubUserName = '';
    }
    console.log('Success:', JSON.parse(JSON.stringify(values)));
    window.localStorage.setItem('userData', JSON.stringify(values));
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const onValuesChange = (changedValues, allValues) => {
    const skills = !Array.isArray(allValues.skills)
      ? undefined
      : !allValues.skills.length
      ? undefined
      : allValues.skills;
    const regex = '^[0-9]{10}$';
    const found = allValues.contactNumber
      ? allValues.contactNumber.match(regex)
      : null;
    if (
      found !== null &&
      allValues.firstName !== undefined &&
      allValues.education !== undefined &&
      allValues.gender !== undefined &&
      allValues.location !== undefined &&
      skills !== undefined &&
      allValues.yoe !== undefined &&
      (allValues.githubUserName !== '' && allValues.githubUserName !== undefined)
    ) {
      setFormError(false);
    } else {
      setFormError(true);
    }
  };

  const onChangeHandler = event => {
    setGitUserName(event.target.value);
    setUserRepos([]);
    setGitUserNameTouched(true);
    currentPage.current = 0;
    nextScroll.current = true;
  };

  const debouncedOnChangeHandler = debounce(onChangeHandler, 700);


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
        ref={formRef}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please enter your First Name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName">
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
          name="githubUserName"
          rules={[
            { required: true, message: '' },
          ]}
        >
          <Input onChange={debouncedOnChangeHandler}/>
        </Form.Item>

        {error || (!gitUserName.length && gitUserNameTouched)?<Form.Item  wrapperCol={{ offset: 7, span: 10 }} style={{marginTop: '-30px'}}>
          <p ref={apiErrorInfo} className="error-message">{error ? error : "Please enter a valid github username!"}</p>
        </Form.Item> : null}
        {!error && !isLoading && gitUserName.length && !userRepos.length?<Form.Item  wrapperCol={{ offset: 7, span: 10 }} style={{marginTop: '-30px'}}>
          <p ref={info} className="info-message" >No repos to display!</p>
        </Form.Item> : null}

        {isLoading && !userRepos.length?
          <Form.Item>
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          </Form.Item> : null
        }
        

        {userRepos.length ? (
          <Form.Item label="Github Repos">
            <div
              id="scrollableDiv"
              style={{
                height: 200,
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
              }}
            >
              <InfiniteScroll
                dataLength={userRepos.length}
                next={fetchMoreData}
                hasMore={nextScroll.current}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>End of List!</Divider>}
                scrollableTarget="scrollableDiv"
              >
                <List
                  dataSource={userRepos}
                  renderItem={repo => (
                    <List.Item key={repo.id}>
                      <List.Item.Meta
                        avatar={<Avatar src={repo.avatar} />}
                        title={<a href={repo.url}>{repo.name}</a>}
                        description={repo.language}
                      />
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            </div>
          </Form.Item>
        ) : null}

        <Form.Item wrapperCol={{ offset: 10, span: 10 }}>
          {!formError && !error ? (
            <Button
              type="primary"
              htmlType="submit"
              style={{
                background: '#33B566',
                marginTop: 30,
              }}
            >
              Submit
            </Button>
          ) : (
            <Button
              disabled
              style={{
                marginTop: 30,
              }}
            >
              Submit
            </Button>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserProfile;
