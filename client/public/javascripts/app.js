(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var has = ({}).hasOwnProperty;

  var aliases = {};

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf('components/' === 0)) {
        start = 'components/'.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return 'components/' + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var expand = (function() {
    var reg = /^\.\.?(\/|$)/;
    return function(root, name) {
      var results = [], parts, part;
      parts = (reg.test(name) ? root + '/' + name : name).split('/');
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part === '..') {
          results.pop();
        } else if (part !== '.' && part !== '') {
          results.push(part);
        }
      }
      return results.join('/');
    };
  })();
  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  globals.require = require;
})();
require.register("application", function(exports, require, module) {
var crypto;

crypto = require('lib/crypto');

module.exports = {
  initialize: function() {
    var Router;
    window.app = this;
    Router = require('router');
    this.router = new Router();
    Backbone.history.start();
    if (typeof Object.freeze === 'function') {
      return Object.freeze(this);
    }
  }
};
});

;require.register("collections/daily_notes", function(exports, require, module) {
var DailyNotesCollection,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = DailyNotesCollection = (function(_super) {
  __extends(DailyNotesCollection, _super);

  function DailyNotesCollection() {
    return DailyNotesCollection.__super__.constructor.apply(this, arguments);
  }

  DailyNotesCollection.prototype.url = 'daily-notes';

  return DailyNotesCollection;

})(Backbone.Collection);
});

;require.register("initialize", function(exports, require, module) {
var app;

app = require('application');

$(function() {
  require('lib/app_helpers');
  return app.initialize();
});
});

;require.register("lib/app_helpers", function(exports, require, module) {
(function() {
  return (function() {
    var console, dummy, method, methods, _results;
    console = window.console = window.console || {};
    method = void 0;
    dummy = function() {};
    methods = 'assert,count,debug,dir,dirxml,error,exception, group,groupCollapsed,groupEnd,info,log,markTimeline, profile,profileEnd,time,timeEnd,trace,warn'.split(',');
    _results = [];
    while (method = methods.pop()) {
      _results.push(console[method] = console[method] || dummy);
    }
    return _results;
  })();
})();
});

;require.register("lib/base_view", function(exports, require, module) {
var BaseView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = BaseView = (function(_super) {
  __extends(BaseView, _super);

  function BaseView() {
    return BaseView.__super__.constructor.apply(this, arguments);
  }

  BaseView.prototype.template = function() {};

  BaseView.prototype.initialize = function() {
    return this.render();
  };

  BaseView.prototype.getRenderData = function() {
    var _ref;
    return {
      model: (_ref = this.model) != null ? _ref.toJSON() : void 0
    };
  };

  BaseView.prototype.render = function() {
    this.beforeRender();
    this.$el.html(this.template(this.getRenderData()));
    this.afterRender();
    return this;
  };

  BaseView.prototype.beforeRender = function() {};

  BaseView.prototype.afterRender = function() {};

  BaseView.prototype.destroy = function() {
    this.undelegateEvents();
    this.$el.removeData().unbind();
    this.remove();
    return Backbone.View.prototype.remove.call(this);
  };

  BaseView.prototype.showLoading = function() {
    return this.$('.spinner').show();
  };

  BaseView.prototype.hideLoading = function() {
    return this.$('.spinner').hide();
  };

  return BaseView;

})(Backbone.View);
});

;require.register("lib/crypto", function(exports, require, module) {
var crypto, decoder, encoder, simpleCrypto;

crypto = window.crypto;

encoder = new TextEncoder("utf-8");

decoder = new TextDecoder("utf-8");

module.exports = simpleCrypto = {
  stringToArrayBuffer: function(str) {
    var buf, bufView, i, _i, _ref;
    buf = new ArrayBuffer(str.length);
    bufView = new Uint8Array(buf);
    for (i = _i = 0, _ref = str.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      bufView[i] = str.charCodeAt(i);
    }
    return bufView;
  },
  arrayBufferToString: function(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  },
  createNewVector: function() {
    return crypto.getRandomValues(new Uint8Array(16));
  },
  createKey: function(password) {
    var hash, iterations, passBuffer, salt, saltBuffer;
    salt = "556392fd2f545ef8f456faa0e065f7a";
    iterations = 100;
    hash = "SHA-256";
    passBuffer = simpleCrypto.stringToArrayBuffer(password);
    saltBuffer = simpleCrypto.stringToArrayBuffer(salt);
    return crypto.subtle.importKey("raw", passBuffer, {
      name: "PBKDF2"
    }, false, ["deriveKey"]).then((function(_this) {
      return function(baseKey) {
        var algo, opts;
        opts = {
          name: "PBKDF2",
          salt: saltBuffer,
          iterations: iterations,
          hash: hash
        };
        algo = {
          name: "AES-CBC",
          length: 256
        };
        return crypto.subtle.deriveKey(opts, baseKey, algo, true, ["encrypt", "decrypt"]);
      };
    })(this))["catch"](function(err) {
      console.log('An error occured while generating encryption key');
      return console.log(err);
    });
  },
  encrypt: function(text, key, vector) {
    var opts, textBuffer;
    opts = {
      name: 'AES-CBC',
      iv: vector
    };
    textBuffer = simpleCrypto.stringToArrayBuffer(text);
    return crypto.subtle.encrypt(opts, key, textBuffer).then(function(result) {
      return new Promise(function(resolve, reject) {
        return resolve(simpleCrypto.arrayBufferToString(result));
      });
    });
  },
  decrypt: function(cipher, key, vector) {
    var opts;
    opts = {
      name: 'AES-CBC',
      iv: vector
    };
    return crypto.subtle.decrypt(opts, key, cipher).then(function(result) {
      console.log('result', result);
      return new Promise(function(resolve, reject) {
        console.log('result', result);
        return resolve(simpleCrypto.arrayBufferToString(result));
      });
    });
  },
  createEncrypter: function(key) {
    return new Encrypter(key);
  }
};
});

;require.register("lib/request", function(exports, require, module) {
exports.request = function(type, url, data, callback) {
  return $.ajax({
    type: type,
    url: url,
    data: data != null ? JSON.stringify(data) : null,
    contentType: "application/json",
    dataType: "json",
    success: function(data) {
      if (callback != null) {
        return callback(null, data);
      }
    },
    error: function(data) {
      if ((data != null) && (data.msg != null) && (callback != null)) {
        return callback(new Error(data.msg));
      } else if (callback != null) {
        return callback(new Error("Server error occured"));
      }
    }
  });
};

exports.get = function(url, callback) {
  return exports.request("GET", url, null, callback);
};

exports.post = function(url, data, callback) {
  return exports.request("POST", url, data, callback);
};

exports.put = function(url, data, callback) {
  return exports.request("PUT", url, data, callback);
};

exports.del = function(url, callback) {
  return exports.request("DELETE", url, null, callback);
};
});

;require.register("lib/view_collection", function(exports, require, module) {
var BaseView, ViewCollection,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('lib/base_view');

module.exports = ViewCollection = (function(_super) {
  __extends(ViewCollection, _super);

  function ViewCollection() {
    this.removeItem = __bind(this.removeItem, this);
    this.addItem = __bind(this.addItem, this);
    this.renderAll = __bind(this.renderAll, this);
    return ViewCollection.__super__.constructor.apply(this, arguments);
  }

  ViewCollection.prototype.itemview = null;

  ViewCollection.prototype.views = {};

  ViewCollection.prototype.template = function() {
    return '';
  };

  ViewCollection.prototype.itemViewOptions = function() {};

  ViewCollection.prototype.collectionEl = null;

  ViewCollection.prototype.onChange = function() {
    return this.$el.toggleClass('empty', _.size(this.views) === 0);
  };

  ViewCollection.prototype.appendView = function(view) {
    return this.$collectionEl.append(view.el);
  };

  ViewCollection.prototype.initialize = function() {
    var collectionEl;
    if (this.collectionEl == null) {
      collectionEl = this.el;
    }
    ViewCollection.__super__.initialize.apply(this, arguments);
    this.views = {};
    this.listenTo(this.collection, "reset", this.onReset);
    this.listenTo(this.collection, "add", this.addItem);
    this.listenTo(this.collection, "remove", this.removeItem);
    return this.render();
  };

  ViewCollection.prototype.render = function() {
    var id, view, _ref;
    _ref = this.views;
    for (id in _ref) {
      view = _ref[id];
      view.$el.detach();
    }
    ViewCollection.__super__.render.apply(this, arguments);
    return this.$collectionEl = $(this.collectionEl);
  };

  ViewCollection.prototype.renderAll = function() {
    var id, view, _ref;
    _ref = this.views;
    for (id in _ref) {
      view = _ref[id];
      this.appendView(view.$el);
    }
    this.onReset(this.collection);
    return this.onChange(this.views);
  };

  ViewCollection.prototype.afterRender = function() {
    var id, view, _ref;
    this.$collectionEl = $(this.collectionEl);
    _ref = this.views;
    for (id in _ref) {
      view = _ref[id];
      this.appendView(view.$el);
    }
    this.onReset(this.collection);
    return this.onChange(this.views);
  };

  ViewCollection.prototype.remove = function() {
    this.onReset([]);
    return ViewCollection.__super__.remove.apply(this, arguments);
  };

  ViewCollection.prototype.onReset = function(newcollection) {
    var id, view, _ref;
    _ref = this.views;
    for (id in _ref) {
      view = _ref[id];
      view.remove();
    }
    return newcollection.forEach(this.addItem);
  };

  ViewCollection.prototype.addItem = function(model) {
    var options, view;
    options = _.extend({}, {
      model: model
    }, this.itemViewOptions(model));
    view = new this.itemview(options);
    this.views[model.cid] = view.render();
    this.appendView(view);
    return this.onChange(this.views);
  };

  ViewCollection.prototype.removeItem = function(model) {
    this.views[model.cid].remove();
    delete this.views[model.cid];
    return this.onChange(this.views);
  };

  return ViewCollection;

})(BaseView);
});

;require.register("models/daily_note", function(exports, require, module) {
var DailyNote,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = DailyNote = (function(_super) {
  __extends(DailyNote, _super);

  DailyNote.prototype.urlRoot = 'daily-notes';

  function DailyNote() {
    DailyNote.__super__.constructor.apply(this, arguments);
    this.set('id', this.get('date').format('YYYY-MM-DD'));
  }

  return DailyNote;

})(Backbone.Model);
});

;require.register("router", function(exports, require, module) {
var AppView, Router,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AppView = require('views/app_view');

module.exports = Router = (function(_super) {
  __extends(Router, _super);

  function Router() {
    return Router.__super__.constructor.apply(this, arguments);
  }

  Router.prototype.routes = {
    '': 'main',
    'archives': 'archives',
    'key': 'key',
    ':date': 'note'
  };

  Router.prototype.main = function() {
    var day;
    day = moment();
    return this.navigate(day.format('YYYY-MM-DD'), {
      trigger: true
    });
  };

  Router.prototype.key = function() {
    return this.displayWidget('key');
  };

  Router.prototype.archives = function() {
    return this.displayWidget('archives');
  };

  Router.prototype.note = function(date) {
    return this.displayWidget('dailyNote', date);
  };

  Router.prototype.displayWidget = function(view, date) {
    if (this.mainView == null) {
      this.mainView = new AppView();
    }
    return this.mainView.showWidget(view, date);
  };

  return Router;

})(Backbone.Router);
});

;require.register("views/app_view", function(exports, require, module) {
var AppView, BaseView, DailyNote, DailyNoteWidget, DailyNotes, KeyWidget, State,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

State = require('./state');

DailyNote = require('../models/daily_note');

DailyNotes = require('./daily_notes');

DailyNoteWidget = require('./daily_note_widget');

KeyWidget = require('./key_widget');

module.exports = AppView = (function(_super) {
  __extends(AppView, _super);

  function AppView() {
    return AppView.__super__.constructor.apply(this, arguments);
  }

  AppView.prototype.el = 'body.application';

  AppView.prototype.template = require('./templates/home');

  AppView.prototype.getRenderData = function() {
    return {
      date: moment().format('DD/MM/YYYY')
    };
  };

  AppView.prototype.afterRender = function() {
    this.widgets = $('.widget');
    this.noteWidget = new DailyNoteWidget;
    $(window).resize(this.noteWidget.resizeTextArea);
    $(window).on('unload', this.noteWidget.saveNote);
    this.archivesWidget = $('#archives');
    this.keyWidget = new KeyWidget;
    return this.notes = new DailyNotes;
  };

  AppView.prototype.showWidget = function(widget, date) {
    this.widgets.hide();
    if ((State.key != null) || widget === 'key') {
      return this[widget](date);
    } else {
      return window.app.router.navigate('key', {
        trigger: true
      });
    }
  };

  AppView.prototype.dailyNote = function(day) {
    var dayValue, note;
    if (day != null) {
      day = moment(day).startOf('day');
    } else {
      day = moment().startOf('day');
    }
    dayValue = "" + (day.format('YYYY-MM-DDT00:00:00.000')) + "Z";
    note = this.notes.collection.findWhere({
      date: dayValue
    });
    if (note != null) {
      note.set('id', day.format('YYYY-MM-DD'));
      return this.noteWidget.show(note);
    } else {
      if (note == null) {
        note = new DailyNote({
          date: day
        });
      }
      return note.fetch({
        success: (function(_this) {
          return function(model) {
            note.set('id', day.format('YYYY-MM-DD'));
            return _this.noteWidget.show(note);
          };
        })(this),
        error: (function(_this) {
          return function(model) {
            return _this.noteWidget.show(model);
          };
        })(this)
      });
    }
  };

  AppView.prototype.archives = function() {
    return this.archivesWidget.show();
  };

  AppView.prototype.key = function() {
    return this.keyWidget.show();
  };

  return AppView;

})(BaseView);
});

;require.register("views/daily_note", function(exports, require, module) {
var BaseView, DailyNoteView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

module.exports = DailyNoteView = (function(_super) {
  __extends(DailyNoteView, _super);

  function DailyNoteView() {
    return DailyNoteView.__super__.constructor.apply(this, arguments);
  }

  DailyNoteView.prototype.template = require('./templates/daily_note');

  DailyNoteView.prototype.className = 'daily-note';

  DailyNoteView.prototype.getRenderData = function() {
    var data, date, maxLength, _ref;
    date = moment(this.model.get('date')).startOf('day');
    data = {
      date: date.format('YYYY-MM-DD'),
      text: this.model.get('text')
    };
    data.displayDate = moment(data.date).format('ll');
    maxLength = 80;
    if (((_ref = data.text) != null ? _ref.length : void 0) > maxLength) {
      data.text = "" + (data.text.substring(0, maxLength)) + "...";
    }
    return data;
  };

  return DailyNoteView;

})(BaseView);
});

;require.register("views/daily_note_widget", function(exports, require, module) {
var BaseView, DailyNoteWidget, State, simpleCrypto,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

simpleCrypto = require('../lib/crypto');

State = require('./state');

module.exports = DailyNoteWidget = (function(_super) {
  __extends(DailyNoteWidget, _super);

  function DailyNoteWidget() {
    this._showContent = __bind(this._showContent, this);
    this.deleteNote = __bind(this.deleteNote, this);
    this.saveNote = __bind(this.saveNote, this);
    return DailyNoteWidget.__super__.constructor.apply(this, arguments);
  }

  DailyNoteWidget.prototype.el = '#daily-note';

  DailyNoteWidget.prototype.template = require('./templates/daily_note_widget');

  DailyNoteWidget.prototype.events = {
    'click .remove': 'deleteNote'
  };

  DailyNoteWidget.prototype.afterRender = function() {
    this.textField = this.$('textarea');
    this.dateField = this.$('.date-field');
    this.isSaving = false;
    return this.previousContent = '';
  };

  DailyNoteWidget.prototype.saveNote = function() {
    var content, vector;
    content = this.textField.val();
    vector = simpleCrypto.createNewVector();
    if (content !== this.previousContent) {
      return simpleCrypto.encrypt(content, State.key, vector).then((function(_this) {
        return function(encryptedContent) {
          _this.previousContent = content;
          _this.model.set({
            content: encryptedContent,
            vector: simpleCrypto.arrayBufferToString(vector)
          });
          return _this.model.save();
        };
      })(this));
    }
  };

  DailyNoteWidget.prototype.deleteNote = function() {
    this.model.destroy();
    return Backbone.history.navigate('archives', {
      trigger: true
    });
  };

  DailyNoteWidget.prototype.resizeTextArea = function() {
    var _ref;
    return (_ref = this.textField) != null ? _ref.height($(window).height() - 180) : void 0;
  };

  DailyNoteWidget.prototype.show = function(note) {
    var cipherBuffer, encryptedContent, vector;
    this.model = note;
    this._showEl();
    encryptedContent = this.model.get('content') || '';
    vector = this.model.get('vector') || '';
    if (encryptedContent.length === 0 || vector.length === 0) {
      this._showContent(content);
    } else {
      cipherBuffer = simpleCrypto.stringToArrayBuffer(encryptedContent);
      vector = simpleCrypto.stringToArrayBuffer(vector);
      simpleCrypto.decrypt(cipherBuffer, State.key, vector).then(this._showContent)["catch"]((function(_this) {
        return function(err) {
          console.log(err);
          alert('An error occured will decrypting your message. Is your key right?');
          return _this._showContent('');
        };
      })(this));
    }
    clearInterval(this.saveInterval);
    return this.saveInterval = setInterval(this.saveNote, 1000);
  };

  DailyNoteWidget.prototype._showContent = function(text) {
    if (typeof text !== 'string') {
      text = '';
    }
    this.textField.val(text);
    this.dateField.html(moment(this.model.get('date')).format('ll'));
    this._hideLoading();
    return this._focusTextarea();
  };

  DailyNoteWidget.prototype._focusTextarea = function() {
    var len;
    this.textField.focus();
    len = this.textField.val().length;
    return this.textField[0].setSelectionRange(len, len);
  };

  DailyNoteWidget.prototype._showEl = function() {
    this.resizeTextArea();
    return this.$el.show();
  };

  DailyNoteWidget.prototype._showLoading = function() {
    return this.$('.spinner').show();
  };

  DailyNoteWidget.prototype._hideLoading = function() {
    return this.$('.spinner').hide();
  };

  return DailyNoteWidget;

})(BaseView);
});

;require.register("views/daily_notes", function(exports, require, module) {
var DailyNoteView, DailyNotesCollection, DailyNotesView, ViewCollection,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ViewCollection = require('../lib/view_collection');

DailyNotesCollection = require('../collections/daily_notes');

DailyNoteView = require('./daily_note');

module.exports = DailyNotesView = (function(_super) {
  __extends(DailyNotesView, _super);

  function DailyNotesView() {
    return DailyNotesView.__super__.constructor.apply(this, arguments);
  }

  DailyNotesView.prototype.el = '#daily-notes';

  DailyNotesView.prototype.collectionEl = '#daily-notes';

  DailyNotesView.prototype.collection = new DailyNotesCollection();

  DailyNotesView.prototype.itemview = DailyNoteView;

  DailyNotesView.prototype.afterRender = function() {
    this.collection.on('reset', this.renderAll);
    this.collection.on('add', this.renderOne);
    return this.collection.fetch({
      success: function(models) {
        return console.log(models);
      }
    });
  };

  return DailyNotesView;

})(ViewCollection);
});

;require.register("views/key_widget", function(exports, require, module) {
var BaseView, KeyManagementWidget, State, simpleCrypto,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

State = require('./state');

simpleCrypto = require('../lib/crypto');

module.exports = KeyManagementWidget = (function(_super) {
  __extends(KeyManagementWidget, _super);

  function KeyManagementWidget() {
    return KeyManagementWidget.__super__.constructor.apply(this, arguments);
  }

  KeyManagementWidget.prototype.el = '#key-management';

  KeyManagementWidget.prototype.template = require('./templates/key_management_widget');

  KeyManagementWidget.prototype.events = {
    'click button': 'onUseKeyClicked',
    'keyup input': 'onTextKeyUp'
  };

  KeyManagementWidget.prototype.afterRender = function() {
    this.textField = this.$('#key-field');
    this.useKeyButton = this.$('button');
    return this.textField.focus();
  };

  KeyManagementWidget.prototype.onTextKeyUp = function(event) {
    if (13 === event.keyCode || 13 === event.which) {
      return this.onUseKeyClicked();
    }
  };

  KeyManagementWidget.prototype.onUseKeyClicked = function() {
    var passphrase;
    this.showLoading();
    passphrase = this.textField.val();
    return simpleCrypto.createKey('passphrase').then((function(_this) {
      return function(key) {
        State.key = key;
        _this.hideLoading();
        alert('Key registered. You are now ready to use Hari!');
        _this.textField.val(null);
        return window.app.router.navigate('', {
          trigger: true
        });
      };
    })(this));
  };

  KeyManagementWidget.prototype.show = function() {
    this.$el.show();
    return this.useKeyButton.val(null);
  };

  return KeyManagementWidget;

})(BaseView);
});

;require.register("views/state", function(exports, require, module) {
var State;

module.exports = State = (function() {
  function State() {}

  return State;

})();
});

;require.register("views/templates/daily_note", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
var locals_ = (locals || {}),date = locals_.date,displayDate = locals_.displayDate,text = locals_.text;
buf.push("<!-- .daily_note --><a" + (jade.attr("href", "#" + (date) + "", true, false)) + " class=\"action\"><span class=\"date\">" + (jade.escape(null == (jade_interp = displayDate) ? "" : jade_interp)) + "</span><span class=\"text\">" + (jade.escape(null == (jade_interp = text) ? "" : jade_interp)) + "</span></a>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/daily_note_widget", function(exports, require, module) {
h2.date = date;

textarea;
});

;require.register("views/templates/daily_note_widget", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<h2 class=\"date\"><span class=\"date-field\"></span><span class=\"layout-right\"><a class=\"remove\">remove</a></span><img src=\"spinner.svg\" loading=\"loading\" indicator=\"indicator\" class=\"spinner\"/></h2><textarea id=\"note-area\"></textarea>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/home", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div id=\"content\"><div id=\"menu\"><h1><a href=\"#\">Hari</a></h1><a href=\"#archives\">archives</a><a href=\"#key\" class=\"key-link\">key</a><div></div></div><div id=\"daily-note\" class=\"widget\"></div><div id=\"archives\" class=\"widget\"><h2>Archives</h2><div id=\"daily-notes\"></div></div><div id=\"key-management\" class=\"widget\"></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/key_management_widget", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<p>Welcome to Hari,</p><p>Hari is your Diary. All your daily stories are stored in your Cozy through\nit. What makes it really different is that like any good diary, Hari can be\nlocked. Yes, noone can ready your Diary without a key. How does it work?\nIt's very simple software allows locking through the usage of encryption.</p><p>All your texts can be encrypted with a single text, called passphrase or\nkey. It's you who decide which key you want to use.\nSo, each time you connect, enter in the following field your encryption\nkey. The first time you will enter it your key will be registered and use\nto unencrypt your message. After it will be reused. </p><p>Remember that your key cannot be changed, lost or forgotten. So, be careful\nwhen you chose it. But make it complex to be sure noone will guess it.\nYour key will be required each time you connect on Hari. So, Your data\ncannot be read without it.</p><p><input id=\"key-field\" type=\"password\"/></p><p><button class=\"unlock\">unlock</button></p>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;
//# sourceMappingURL=app.js.map