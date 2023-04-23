import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import EmployerLogin from '../EmployerLogin';
import { BrowserRouter } from 'react-router-dom';
import { createMatchMedia } from 'match-media-mock';

describe('EmployerLogin', () => {
  beforeEach(() => {
    window.matchMedia = (query) => {
        return {
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(), // deprecated
          removeListener: jest.fn(), // deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        };
      };
  });
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <EmployerLogin />
      </BrowserRouter>
    );
  });

  test('submit button is disabled if username or password is empty', () => {
    render(
      <BrowserRouter>
        <EmployerLogin />
      </BrowserRouter>
    );
    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeDisabled();

    const usernameInput = screen.getByLabelText('Username');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect(submitButton).toBeDisabled();

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    expect(submitButton).not.toBeDisabled();
  });

  test('onFinish is called when form is submitted', () => {
    const onFinishMock = jest.fn();
    render(
      <BrowserRouter>
        <EmployerLogin onLogin={onFinishMock} />
      </BrowserRouter>
    );
    const usernameInput = screen.getByLabelText('Username');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(onFinishMock).toHaveBeenCalledWith('employer');
  });

  test('onFinishFailed is called when form submission fails', () => {
    const onFinishFailedMock = jest.fn();
    render(
      <BrowserRouter>
        <EmployerLogin onFinishFailed={onFinishFailedMock} />
      </BrowserRouter>
    );
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    expect(onFinishFailedMock).toHaveBeenCalled();
  });

  test('onValuesChange is called when form values change', () => {
    const onValuesChangeMock = jest.fn();
    render(
      <BrowserRouter>
        <EmployerLogin onValuesChange={onValuesChangeMock} />
      </BrowserRouter>
    );
    const usernameInput = screen.getByLabelText('Username');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect(onValuesChangeMock).toHaveBeenCalledWith({ username: 'testuser' });

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    expect(onValuesChangeMock).toHaveBeenCalledWith({
      password: 'testpassword',
    });
  });
});
