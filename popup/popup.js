import validation, { validateIDStudent, validateName, validateBirthday, validatePhoneNumber } from './validation.js';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const inputInfo = $$('.infoST');
const viewScheduleBtn = $('.schedule');
const viewScoreBtn = $('.score');
const circleLoading = $('.circle-loading');
const errorMsg = $('.error-msg');

const STUDENT_STORAGE_KEY = 'IUH_INFO';
const data = JSON.parse(localStorage.getItem(STUDENT_STORAGE_KEY)) || {};
const setData = () => {
   localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(data));
};
(function () {
   if (Object.keys(data).length > 0) {
      inputInfo.forEach((input) => {
         input.value = data[input.name];
      });
   }
})();

const proxyServer = 'https://corsproxy.io/?';
const urlSearchInfo = proxyServer + encodeURI('https://sv.iuh.edu.vn/tra-cuu-thong-tin.html?Length=14');

const getKey = () => {
   return fetch(urlSearchInfo, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.text())
      .then((data) => {
         const regex = /k=.*"/;
         const linkArr = (data + '').match(regex);
         return linkArr[0].split('"')[0];
      })
      .catch((error) => {
         inputInfo.forEach((input) => {
            input.style.borderColor = 'red';
         });
         errorMsg.innerText = 'Không tìm thấy sinh viên, vui lòng kiểm tra lại';
         inputInfo[0].focus();
      });
};

const getDataFromInput = () => {
   inputInfo.forEach((input) => {
      data[input.name] = input.value;
   });
};

inputInfo[0].onblur = () => validateIDStudent(inputInfo[0].value);
inputInfo[1].onblur = () => validateName(inputInfo[1].value);
inputInfo[2].onblur = () => validateBirthday(inputInfo[2].value);
inputInfo[3].onblur = () => validatePhoneNumber(inputInfo[3].value);

viewScheduleBtn.onclick = async () => {
   if (!validation()) return false;
   circleLoading.style.display = 'block';
   getDataFromInput();
   setData();
   const key = await getKey();
   circleLoading.style.display = 'none';
   if (key !== undefined) {
      inputInfo.forEach((input) => {
         input.style.borderColor = '';
      });
      errorMsg.innerText = '';
      await window.open(`https://sv.iuh.edu.vn/tra-cuu/lich-hoc-theo-tuan.html?${key}`, '_blank');
   }
};

viewScoreBtn.onclick = async () => {
   if (!validation()) return false;
   circleLoading.style.display = 'block';
   getDataFromInput();
   setData();
   const key = await getKey();
   circleLoading.style.display = 'none';
   if (key !== undefined) {
      inputInfo.forEach((input) => {
         input.style.borderColor = '';
      });
      errorMsg.innerText = '';
      await window.open(`https://sv.iuh.edu.vn/tra-cuu/ket-qua-hoc-tap.html?${key}`, '_blank');
   }
};
