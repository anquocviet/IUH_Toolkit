'use strict';

document.querySelectorAll('.group-cautraloi').forEach((group) => {
   const liItem = group.children[4];
   liItem.children[0].children[0].checked = true;
});
document.querySelector('.input-ykien').value = 'Em không có ý kiến gì thêm';
document.querySelector('#btnGui');
