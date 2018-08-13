var _keys = ['title'];
var _template = '<div>%title%</div>';
var _saveItems;

function Search(id, input, items) {
  this.id = id;
  this.input = input;
  this.items = items;
  _saveItems = items;

  if (!Array.isArray(this.items)) {
    throw 'this element must be a array';
  }

  var _self = this;
  this.getInputSearch().onkeyup = function(e) {
    _self.searchFunction(e.target.value);
    _self.reset();
    _self.writeItems();
  };

  this.writeItems();
}

Search.prototype.writeItems = function() {
  for (let i = 0; i < this.items.length; i++) {
    this.createNewItem(this.items[i]);
  }
};

Search.prototype.getMain = function() {
  return document.getElementById(this.id);
};

Search.prototype.getInputSearch = function() {
  return document.getElementById(this.input);
};

Search.prototype.reset = function() {
  this.getMain().innerHTML = '';
};

Search.prototype.createNewItem = function(item) {
  var template = _template;
  for (let i = 0; i < _keys.length; i++) {
    template = template.replace('%' + _keys[i] + '%', item[_keys[i]]);
  }
  this.getMain().innerHTML = this.getMain().innerHTML + template;
};

Search.prototype.searchFunction = function(value) {
  this.items = [];
  for (let i = 0; i < _saveItems.length; i++) {
    for (let y = 0; y < _saveItems[i].tags.length; y++) {
      if (_saveItems[i].tags[y].indexOf(value) !== -1) {
        this.items.push(_saveItems[i]);
        break;
      }
    }
  }
};
