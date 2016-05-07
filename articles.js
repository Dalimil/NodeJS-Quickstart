// Fake article database

var articles = [
  { title: 'Foo', body: 'some foo bar' },
  { title: 'Foo bar', body: 'more foo bar' },
  { title: 'Foo bar baz', body: 'more foo bar baz' }
];

exports.list = function(req, res){
  res.json({articles});
};
