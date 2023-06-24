const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const inputInfo = $$('.infoST');
const submitBtn = $('.submit');
const circleLoading = $('.circle-loading');
const errorMsg = $('.error-msg');

const validateIDStudent = (id) => {
   if (id.trim() === '') {
      inputInfo[0].style.borderColor = 'red';
      errorMsg.innerText = 'Mã sinh viên không được để trống';
      return false;
   }
   if (!/^\d{8}$/.test(id)) {
      inputInfo[0].style.borderColor = 'red';
      errorMsg.innerText = 'Mã sinh viên phải có 8 chữ số';
      return false;
   } else {
      inputInfo[0].style.borderColor = '#384489';
      errorMsg.innerText = '';
      return true;
   }
};

const validateName = (name) => {
   if (name.trim() === '') {
      inputInfo[1].style.borderColor = 'red';
      errorMsg.innerText = 'Tên sinh viên không được để trống';
      return false;
   } else {
      inputInfo[1].style.borderColor = '#384489';
      errorMsg.innerText = '';
      return true;
   }
};

const validateBirthday = (birthday) => {
   if (birthday.trim() === '') {
      inputInfo[2].style.borderColor = 'red';
      errorMsg.innerText = 'Ngày sinh không được để trống';
      return false;
   }
   if (!/^\d{2}\/\d{2}\/\d{4}$/.test(birthday)) {
      inputInfo[2].style.borderColor = 'red';
      errorMsg.innerText = 'Ngày sinh phải có định dạng dd/mm/yyyy';
      return false;
   } else {
      inputInfo[2].style.borderColor = '#384489';
      errorMsg.innerText = '';
      return true;
   }
};

const validatePhoneNumber = (phoneNumber) => {
   if (phoneNumber.trim() === '') {
      inputInfo[3].style.borderColor = 'red';
      errorMsg.innerText = 'Số điện thoại không được để trống';
      return false;
   } else {
      inputInfo[3].style.borderColor = '#384489';
      errorMsg.innerText = '';
      return true;
   }
};

const validation = () => {
   if (
      validateIDStudent(inputInfo[0].value) &&
      validateName(inputInfo[1].value) &&
      validateBirthday(inputInfo[2].value) &&
      validatePhoneNumber(inputInfo[3].value)
   ) {
      return true;
   }
};

export default validation;
export { validateIDStudent, validateName, validateBirthday, validatePhoneNumber };
