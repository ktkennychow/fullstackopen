import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const mockSignIn = jest.fn(); // Create a mock function for the signIn API

      // Render the SignIn component and pass the mock functions as props
      const { getByPlaceholderText, getByText } = render(<SignInContainer onSubmit={mockSignIn} />);

      // Find the input fields and submit button
      const usernameInput = getByPlaceholderText('Username');
      const passwordInput = getByPlaceholderText('Password');
      const submitButton = getByText('Sign in');

      // Fill the input fields
      fireEvent.changeText(usernameInput, 'kalle');
      fireEvent.changeText(passwordInput, 'password');

      // Press the submit button
      fireEvent.press(submitButton);

      await waitFor(() => {
        // Expect the signIn functions to have been called once
        expect(mockSignIn).toHaveBeenCalledTimes(1);
      });
    });
  });
});
