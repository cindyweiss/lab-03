'use strict';
let picarr = [];
let keywordArr = [];

function Pic(picObj) {
  this.title = picObj.title;
  this.description = picObj.description;
  this.keyword = picObj.keyword;
  this.horns = picObj.horns;
  this.image_url = picObj.image_url;
  picarr.push(this);
};



Pic.prototype.render = function () {
  const picTemplate = $('#pic-template').html();
  const $newSection = $('<section></section>');
  $newSection.find('section').addClass(this.keyword);
  $newSection.html(picTemplate);
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('img').attr('alt', this.keyword);
  $newSection.find('p').text(this.description);
  $('main').append($newSection);
};

$.get('./data/page-1.json', data => {
  data.forEach(pic => {
    new Pic(pic).render();

    if (!keywordArr.includes(pic.keyword)) {
      keywordArr.push(pic.keyword);
    }
  });
  keywordArr.forEach(i => {
    $('#filter').append(`<option>${i}</option>`);
  });
});

$('#filter').on('change', function () {
  $('section').hide();
  picarr.forEach(pic => {
    if (this.value === pic.keyword) {
      pic.render();
    };
  });
});

