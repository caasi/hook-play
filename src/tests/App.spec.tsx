import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Dummy as dummyEffects } from '../hooks';
import { EffectContext } from '../contexts';
import { useJaneDoe } from './hooks';
import App from '../App';

describe('App', () => {
  it('should ask to login', () => {
    render(
      <EffectContext.Provider value={dummyEffects}>
        <App />
      </EffectContext.Provider>
    );
    const hintElement = screen.getByText(/please login/i);
    expect(hintElement).toBeInTheDocument();
  });

  it('should show the user name after login', () => {
    render(
      <EffectContext.Provider value={{ useUser: useJaneDoe }}>
        <App />
      </EffectContext.Provider>
    );
    const userNameElement = screen.getByText(/Jane Doe/);
    expect(userNameElement).toBeInTheDocument();
  });
});