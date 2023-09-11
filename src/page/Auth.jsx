import { Logo } from '../components/logo';
import { AccountLoginForm, AccountRegisterForm } from '../feature/account';

import {
  Container,
  LogoContainer,
  BreakLine,
  FormContainer,
  ExtendedLink,
} from './AuthStyles';

function AuthPage({ isLogginActive }) {
  const headingText = isLogginActive ? '登录' : '注册';

  return (
    <Container>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <FormContainer>
        <h2 className="text-center text-2xl">{headingText}</h2>
        {isLogginActive ? <AccountLoginForm /> : <AccountRegisterForm />}
        <BreakLine />
        <div className="text-center mt-4">
          {isLogginActive
            ? (
              <p>
                还没有账号？
                <ExtendedLink to="/register">注册</ExtendedLink>
              </p>
            )
            : (
              <p>
                已有账号？
                <ExtendedLink to="/login">登陆</ExtendedLink>
              </p>
            )}
        </div>
      </FormContainer>
    </Container>
  );
}

export default AuthPage;
