var dic = require('./dict');
var clc = require('cli-color');

var dictionary = dic.getDictionary();

var temp = 'is it me your looking for...';
dictionary.add('hello', temp);
var temp = dictionary.get('hello');
console.log(temp + ' :)');

// should log:
// is it me your looking for... :)