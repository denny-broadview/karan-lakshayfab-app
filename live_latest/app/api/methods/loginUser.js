import Api from 'app/api';

export default function loginUser(username, password) {
  return Api(
      '?username=' + username + '&password=' + password,
    null,
    'post',
    null,
  );
}
