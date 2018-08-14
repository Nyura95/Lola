// default values
var _keys = ['title'];
var _template = '<div>{{title}}</div>';

// private variables
var _saveItems;
var _search;

function Search(main, input, items, options = {}) {
  this.main = main;
  this.input = input;

  if (options.template) {
    _template = options.template;
  }

  if (options.keys) {
    _keys = options.keys;
  }

  if (!Array.isArray(items)) {
    throw 'this element must be a array';
  }

  // rewrite get/set
  var _items = items;
  Object.defineProperty(this, 'items', {
    get: function() {
      return _items;
    },
    set: function(value) {
      if (_items.length != value.length) {
        _items = value;
        _writeItems(value);
      }
    }
  });

  // rewrite push function
  this.items.push = function(data) {
    Array.prototype.push.apply(this, data);
    _writeItems(this);
  };

  // access to the class privately
  _search = this;

  // save items
  _saveItems = items;

  // event keyup input
  this.input.onkeyup = function(e) {
    _searchFunction(e.target.value);
  };

  // start
  _writeItems(items);
}

Search.prototype.getItems = function() {
  return _saveItems;
};

// private function
function _writeItems(items) {
  _reset();
  for (let i = 0; i < items.length; i++) {
    _createNewItem(items[i]);
  }
}

function _createNewItem(item) {
  var template = _template;
  for (let i = 0; i < _keys.length; i++) {
    template = template.replace('{{' + _keys[i] + '}}', item[_keys[i]]);
  }
  _search.main.innerHTML = _search.main.innerHTML + template;
}

function _reset() {
  // remove all html in the main div
  _search.main.innerHTML = '';
}

function _searchFunction(value) {
  // reset
  _search.items = [];

  // search items
  var items = [];
  for (let i = 0; i < _saveItems.length; i++) {
    for (let y = 0; y < _saveItems[i].tags.length; y++) {
      if (_saveItems[i].tags[y].indexOf(value) !== -1) {
        items.push(_saveItems[i]);
        break;
      }
    }
  }
  // draw all items finded
  _search.items = items;
}
