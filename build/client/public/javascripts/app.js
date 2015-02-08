(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
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

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
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

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("application", function(exports, require, module) {
module.exports = {
  initialize: function() {
    var Router;
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

  DailyNotesCollection.prototype.model = require('../models/daily_note');

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

;require.register("lib/db", function(exports, require, module) {
var DailyNote, pouch;

DailyNote = require('../models/daily_note');

module.exports = pouch = {
  db: new PouchDB('db'),
  notes: {
    get: function(day, callback) {
      return pouch.db.get("dailynote-" + day, function(err, doc) {
        if (doc == null) {
          doc = {
            _id: "dailynote-" + day,
            docType: "DailyNote",
            date: day,
            text: ''
          };
        }
        return callback(err, new DailyNote(doc));
      });
    },
    remove: function(doc, callback) {
      return pouch.db.remove(doc.attributes, function(err) {
        return typeof callback === "function" ? callback() : void 0;
      });
    },
    save: function(doc, callback) {
      return pouch.db.get(doc._id, (function(_this) {
        return function(err, dbDoc) {
          if (err && err.status !== 404) {
            console.log('An error occured with PouchDB:');
            return console.log(err);
          } else {
            if (dbDoc != null) {
              doc._rev = dbDoc._rev;
            }
            return pouch.db.put(doc, function(err, doc) {
              if (err) {
                console.log('An error occured with PouchDB:');
                console.log(err);
              } else {
                doc._rev = doc.rev;
              }
              return typeof callback === "function" ? callback() : void 0;
            });
          }
        };
      })(this));
    },
    all: function(callback) {
      return pouch.db.allDocs({
        include_docs: true
      }, (function(_this) {
        return function(err, res) {
          var doc, notes, _i, _len, _ref;
          if (err) {
            return callback(err);
          } else {
            notes = [];
            _ref = res.rows;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              doc = _ref[_i];
              if (doc.doc.docType === 'DailyNote') {
                notes.push(new DailyNote(doc.doc));
              }
            }
            return callback(null, notes);
          }
        };
      })(this));
    }
  },
  sync: function(options) {
    var syncOptions, url;
    syncOptions = {
      filter: function(doc) {
        return doc.docType === 'DailyNote';
      }
    };
    url = window.location.protocol + '//' + window.location.host + '/db/cozy';
    pouch.db.allDocs({
      include_docs: true
    }, function(err, docs) {
      var doc, _i, _len, _ref, _results;
      _ref = docs.rows;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        doc = _ref[_i];
        if (!doc.doc.date) {
          _results.push(pouch.db.remove(doc.doc));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    });
    return pouch.db.sync(url, syncOptions).on('complete', function() {
      return setInterval(function() {
        var sync;
        return sync = pouch.db.sync(url, syncOptions).on('change', options.onChange).on('uptodate', options.onUpToDate).on('error', options.onUpToDate);
      }, 2000);
    });
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

  function DailyNote() {
    return DailyNote.__super__.constructor.apply(this, arguments);
  }

  DailyNote.prototype.urlRoot = 'dailynotes/';

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
    ':date': 'note'
  };

  Router.prototype.main = function() {
    return this.displayWidget('dailyNote');
  };

  Router.prototype.archives = function() {
    return this.displayWidget('archives');
  };

  Router.prototype.note = function(date) {
    return this.displayWidget('dailyNote', date);
  };

  Router.prototype.displayWidget = function(view, id) {
    if (typeof mainWidget === "undefined" || mainWidget === null) {
      this.mainView = new AppView();
    }
    return this.mainView.showWidget(view, id);
  };

  return Router;

})(Backbone.Router);

});

;require.register("views/app_view", function(exports, require, module) {
var AppView, BaseView, DailyNote, DailyNoteWidget, DailyNotes, pouch,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

pouch = require('../lib/db');

BaseView = require('../lib/base_view');

DailyNote = require('../models/daily_note');

DailyNotes = require('./daily_notes');

DailyNoteWidget = require('./daily_note_widget');

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
    this.notes = new DailyNotes;
    return this.setSync();
  };

  AppView.prototype.showWidget = function(widget, id) {
    this.widgets.hide();
    if (this[widget] != null) {
      return this[widget](id);
    }
  };

  AppView.prototype.dailyNote = function(day) {
    if (day == null) {
      day = moment().format('YYYY-MM-DD');
    }
    return this.noteWidget.show(day);
  };

  AppView.prototype.archives = function() {
    return this.archivesWidget.show();
  };

  AppView.prototype.setSync = function() {
    return pouch.sync({
      onChange: (function(_this) {
        return function(info) {
          console.log("change:");
          console.log(info);
          if (info.direction === 'pull' && info.change.docs_written > 0) {
            return _this.noteWidget.show(_this.noteWidget.model.date);
          }
        };
      })(this),
      onUpToDate: function(info) {
        console.log("uptodate:");
        return console.log(info);
      },
      onError: function(err) {
        console.log("An error occured while synchronizing data:");
        return console.log(err);
      }
    });
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
    var data, maxLength, _ref;
    data = {
      date: this.model.get('date'),
      text: this.model.get('text')
    };
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
var BaseView, DailyNoteWidget, pouch,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

pouch = require('../lib/db');

BaseView = require('../lib/base_view');

module.exports = DailyNoteWidget = (function(_super) {
  __extends(DailyNoteWidget, _super);

  function DailyNoteWidget() {
    this.deleteNote = __bind(this.deleteNote, this);
    this.saveNote = __bind(this.saveNote, this);
    return DailyNoteWidget.__super__.constructor.apply(this, arguments);
  }

  DailyNoteWidget.prototype.el = '#daily-note';

  DailyNoteWidget.prototype.template = require('./templates/daily_note_widget');

  DailyNoteWidget.prototype.events = {
    'keyup textarea': 'saveNote',
    'click .remove': 'deleteNote'
  };

  DailyNoteWidget.prototype.afterRender = function() {
    this.textField = this.$('textarea');
    this.dateField = this.$('.date-field');
    return this.isSaving = false;
  };

  DailyNoteWidget.prototype.saveNote = function() {
    if (!this.isSaving) {
      this.isSaving = true;
      return setTimeout((function(_this) {
        return function() {
          _this.model.set('date', _this.day);
          _this.model.set('text', _this.textField.val());
          return pouch.notes.save(_this.model.attributes, function(err) {
            return _this.isSaving = false;
          });
        };
      })(this), 3000);
    }
  };

  DailyNoteWidget.prototype.deleteNote = function() {
    return pouch.notes.remove(this.model, (function(_this) {
      return function() {
        return Backbone.history.navigate('archives', {
          trigger: true
        });
      };
    })(this));
  };

  DailyNoteWidget.prototype.resizeTextArea = function() {
    var _ref;
    return (_ref = this.textField) != null ? _ref.height($(window).height() - 180) : void 0;
  };

  DailyNoteWidget.prototype.show = function(day) {
    if (!(this.isSaving || this.isTyping)) {
      this.day = day;
      this._showEl();
      this.showLoading();
      return pouch.notes.get(day, (function(_this) {
        return function(err, model) {
          _this.hideLoading();
          _this.model = model;
          _this.textField.val(model.get('text'));
          _this.dateField.html(model.get('date'));
          return _this._focusTextarea();
        };
      })(this));
    }
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

  return DailyNoteWidget;

})(BaseView);

});

;require.register("views/daily_notes", function(exports, require, module) {
var DailyNoteView, DailyNotesCollection, DailyNotesView, ViewCollection, pouch,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

pouch = require('../lib/db');

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
    this.showLoading();
    return pouch.notes.all((function(_this) {
      return function(err, notes) {
        _this.hideLoading();
        if (err) {
          return console.log(err);
        } else {
          return _this.collection.reset(notes.reverse());
        }
      };
    })(this));
  };

  return DailyNotesView;

})(ViewCollection);

});

;require.register("views/templates/daily_note", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
var locals_ = (locals || {}),date = locals_.date,text = locals_.text;
buf.push("<!-- .daily_note --><a" + (jade.attr("href", "#" + (date) + "", true, false)) + " class=\"action\"><span class=\"date\">" + (jade.escape(null == (jade_interp = date) ? "" : jade_interp)) + "</span><span class=\"text\">" + (jade.escape(null == (jade_interp = text) ? "" : jade_interp)) + "</span></a>");;return buf.join("");
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

buf.push("<div id=\"content\"><div id=\"menu\"><h1><a href=\"#\">Hari</a></h1><a href=\"#archives\">archives</a><div></div></div><div id=\"daily-note\" class=\"widget\"></div><div id=\"archives\" class=\"widget\"><h2>Archives</h2><div id=\"daily-notes\"></div></div></div>");;return buf.join("");
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