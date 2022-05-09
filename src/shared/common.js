export const emailCheckRE = (email) => {
  //email 형식
  let _reg = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;

  return _reg.test(email);
};

export const nicknameCheckRE = (nickname) => {
  //영문 대소문자, 한글, 숫자 포함 4~10자
  let _reg = /^[A-Za-z0-9가-힣]{4,10}$/g;

  return _reg.test(nickname);
};

export const pwCheckRE = (password) => {
  //영문 대소문자, 숫자 포함 6~20자
  let _reg = /^[A-Za-z0-9]{6,20}$/;

  return _reg.test(password);
};
