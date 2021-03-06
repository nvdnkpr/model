require(['d3', 'choropleth'], function (d3, Choropleth) {
  var div = document.getElementById('choroplethContainer'),
      choropleth = Choropleth(div);

  choropleth.set({
    idField: 'code',
    colorField: 'unemployment'
  });

  d3.json('us.json', function (err, us) {
    choropleth.set('us', us);
  });

  d3.tsv('unemployment.tsv', function (err, unemployment) {
    choropleth.set('data', unemployment);

    setInterval(function () {
      unemployment.forEach(function (d) {
        d.unemployment = Math.random() / 2;
      });
      choropleth.set('data', unemployment);
    }, 2000);
  });

  setSizeFromDiv();
  window.addEventListener('resize', setSizeFromDiv);
  function setSizeFromDiv(){
    choropleth.set('size', {
      width: div.clientWidth,
      height: div.clientHeight
    });
  }
});
