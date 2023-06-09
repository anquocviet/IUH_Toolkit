const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const inputInfo = $$('.infoST');
const imgCaptcha = $('.captcha');
const inputCaptcha = $('.input-captcha');
const submitBtn = $('.submit');
const circleLoading = $('.circle-loading');

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
const urlGetCaptcha = proxyServer + encodeURIComponent('https://sv.iuh.edu.vn/WebCommon/GetCaptcha');
const urlSearchInfo = proxyServer + encodeURI('https://sv.iuh.edu.vn/tra-cuu-thong-tin.html?Length=14');

// fetch(urlGetCaptcha)
//    .then((response) => response.blob())
//    .then((blobImage) => {
//       imgCaptcha.src = URL.createObjectURL(blobImage);
//    })
//    .catch((error) => console.error(error));

let linkSchedule = '';
const getLinkSchedule = () => {
   const linkSchedule = fetch(urlSearchInfo, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.text())
      .then((data) => {
         const regex = /href=".tra-cuu.*"/g;
         const linkArr = (data + '').match(regex);
         return linkArr[1].split('"')[1];
      })
      .catch((error) => {
         console.error('Error:', error);
      });
   return linkSchedule;
};

const getDataFromInput = () => {
   inputInfo.forEach((input) => {
      data[input.name] = input.value;
   });
   // data.Captcha = inputCaptcha.value;
};

submitBtn.onclick = async () => {
   circleLoading.style.display = 'block';
   getDataFromInput();
   setData();
   const linkSchedule = await getLinkSchedule();
   circleLoading.style.display = 'none';
   await window.open(`https://sv.iuh.edu.vn${linkSchedule}`, '_blank');
};
