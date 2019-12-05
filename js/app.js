'use strict';
const picArr = [];
const keywordArr = [];
function Pic(picObj) {
  this.title = picObj.title;
  this.description = picObj.description;
  this.keyword = picObj.keyword;
  this.horns = picObj.horns;
  this.image_url = picObj.image_url;
  // picArr.push(this);
}
Pic.prototype.render = function () {
  let picSource = $('#script-template').html();
  let template = Handlebars.compile(picSource);
  return template(this);
}
// picArr.forEach(picture => {
//   $('#pic-template').append(new Pic(picture).render());
// })
// GET JSON DATA INTO ARRAY 'picArr'
$.get('./data/page-1.json', data => {
  data.forEach(pic => {
    let pushedObj = new Pic(pic);
    picArr.push(pushedObj);
    // const temp = template(pushedObj);
    $('#pic-template').append(new Pic(pic).render());
    console.log(pushedObj);
  });
  console.log(picArr);
  // picArr.forEach(picToRender => {
  //   $('#pic-template').append(picToRender);
  // })
});
// console.log(picToRender);
// $('#pic-template').append(pushedObj);
// if (!keywordArr.includes(pic.keyword)) {
//   keywordArr.push(pic.keyword);
// }
// keywordArr.forEach(i => {
//   $('#filter').append(`<option>${i}</option>`);
// });
// let x = new Pic(pic).render();
//     $('#pic-template').append(x);
//  MAKE KEYWORD ARRAY OF UNIQUES
picArr.forEach((i) => {
  if (!keywordArr.includes(i.keyword)) {
    keywordArr.push(i.keyword);
  }
})
keywordArr.forEach(i => {
  $('#filter').append(`<option>${i}</option>`);
});
//  LISTEN FOR FILTER MENU CHANGE AND RENDER
$('#filter').on('change', function () {
  $('#pic-template').hide();
  picArr.forEach(pic => {
    if (this.value === pic.keyword || this.value === 'default') {
      pic.render();
    }
  });
});
