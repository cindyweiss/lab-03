'use strict';

const picArr = [];
const keywordArr = [];

function Pic(picObj) {
  this.title = picObj.title;
  this.description = picObj.description;
  this.keyword = picObj.keyword;
  this.horns = picObj.horns;
  this.image_url = picObj.image_url;
}

Pic.prototype.render = function () {
  let picSource = $('#script-template').html();
  let template = Handlebars.compile(picSource);
  return template(this);
}

// GET JSON DATA INTO ARRAY 'picArr'

$.get('./data/page-1.json', data => { //  ajax callback function

  data.forEach(pic => {
    let pushedObj = new Pic(pic);
    picArr.push(pushedObj);
    $('#pic-template').append(new Pic(pic).render());
  });
  console.log(picArr); // picArr PASSED

  //  MAKE KEYWORD ARRAY OF UNIQUES

  picArr.forEach((i) => {
    if (!keywordArr.includes(i.keyword)) {
      keywordArr.push(i.keyword);
      $('#select-filter').append(`<option>${i.keyword}</option>`);
    }
  });
  console.log(keywordArr); // PASSED
});

//  LISTEN FOR FILTER MENU CHANGE AND RENDER

$('#select-filter').on('change', function () {
  $('section').hide();
  picArr.forEach(pic => { //dropdown this.value works
    if (this.value === pic.keyword) {
      $(`.${this.value}`).show(); // THIS LINE IS BROKEN, see handlebars
    } else if (this.value === 'default') {
      $('section').show();
    }
  });
});