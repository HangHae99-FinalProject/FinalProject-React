export const memberIdCheckRE = (memberId) => {
  //memberId 형식
  let _reg = /^[a-zA-Z0-9]{4,12}$/g;

  return _reg.test(memberId);
};

export const nicknameCheckRE = (nickname) => {
  //영문 대소문자, 한글, 숫자 포함 2~6자
  let _reg = /^[A-Za-z0-9가-힣]{2,6}$/g;

  return _reg.test(nickname);
};

export const pwCheckRE = (password) => {
  //영문 대소문자, 숫자 포함 6~20자
  let _reg = /^[A-Za-z0-9]{6,20}$/;

  return _reg.test(password);
};
