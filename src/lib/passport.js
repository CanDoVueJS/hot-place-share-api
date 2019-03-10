import passport from 'passport';
import LocalStrategy from 'passport-local';
import { User } from '../models';

export default {
  init () {
    passport.use(new LocalStrategy.Strategy(
      { usernameField: 'email', passwordField: 'password' },
      async function (email, password, done) {
        // 인증 정보 체크 로직
        try {
          const user = await User.findOne({
            where: { email },
          });
          if (!user) {
            return done({ message: '존재하지 않는 이메일 입니다.' }, false, {});
          }

          if (user.isValidPassword(password)) {
            return done(null, user);
          }
          else {
            return done({ message: '아이디 또는 비밀번호를 다시 확인하세요.' }, false, {});
          }
        }
        catch (e) {
          console.error(e);
          return done({ message: '존재하지 않는 이메일 입니다.' }, false, {});
        }
      }
    ));
  },
};
