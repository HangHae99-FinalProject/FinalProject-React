export const emailCheck = (email) => {
  //영문자(대문자, 소문자) 또는 숫자 4~30자
  let _reg = /^[0-9a-zA-Z]+[0-9a-zA-Z]{3,29}$/g;

  return _reg.test(email);
};

export const pwdCheck = (pwd) => {
  //대소문자, 숫자, 특수문자(!@#$%^&*)가 섞인 4자 이상 20자 미만       
  let _reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{3,19}$/;

  return _reg.test(pwd);
};
