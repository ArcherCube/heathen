import { AUTH_CODE } from '@/constants/auth-code';
import { useUser } from '@/store/user';
import { useCreation } from 'ahooks';

type AuthCheckProps = {
  code?: AUTH_CODE | AUTH_CODE[];
  children?: React.ReactNode;
  fallback?: React.ReactNode;
};

export const AuthCheck: React.FC<AuthCheckProps> = (props) => {
  const { userInfo } = useUser();

  const child = useCreation(() => {
    if (props.code) {
      const codes = props.code instanceof Array ? props.code : [props.code];
      if (userInfo?.authCodes && codes.every((code) => userInfo.authCodes.includes(code))) {
        return props.children;
      } else {
        return props.fallback ?? null;
      }
    } else {
      return props.children;
    }
  }, [props.code, userInfo?.authCodes, props.fallback, props.children]);

  return child;
};
