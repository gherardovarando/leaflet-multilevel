// Copyright (c) 2017 Gherardo Varando
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

'use strict';
// leaflet required
if (L != undefined) {

//marker
  L.Marker.ML = L.Marker.extend({

    onAdd: function(map) {
      L.Marker.prototype.onAdd.call(this, map);
      map._layersMaxLevel.push(this.options.maxLevel);
      map._layersMinLevel.push(this.options.minLevel);
      map.on('levelchange', this._check, this);
      map.setLevel(map.getLevel());
      this._check();
    },

    onRemove: function(map) {
      L.Marker.prototype.onRemove.call(this, map);
      map._layersMaxLevel.splice(map._layersMaxLevel.indexOf(this.options.maxLevel), 1);
      map._layersMinLevel.splice(map._layersMaxLevel.indexOf(this.options.minLevel), 1);
      map.off('levelchange', this._check, this);
    },

    _check: function() {
      let lv = this._map._level;
      if (lv <= this.options.maxLevel && lv >= this.options.minLevel) {
        this.setOpacity(this.options.opacity || 1);
      } else {
        this.setOpacity(0);
      }
    }

  });

  L.marker.ml = function(latlng, options) {
    return (new L.Marker.ML(latlng, options));
  };


//circlemarker
  L.CircleMarker.ML = L.CircleMarker.extend({

    onAdd: function(map) {
      L.CircleMarker.prototype.onAdd.call(this, map);
      map._layersMaxLevel.push(this.options.maxLevel);
      map._layersMinLevel.push(this.options.minLevel);
      map.on('levelchange', this._check, this);
      //map.setLevel(map.getLevel());
      this._check();
    },

    onRemove: function(map) {
      L.CircleMarker.prototype.onRemove.call(this, map);
      map._layersMaxLevel.splice(map._layersMaxLevel.indexOf(this.options.maxLevel), 1);
      map._layersMinLevel.splice(map._layersMaxLevel.indexOf(this.options.minLevel), 1);
      map.off('levelchange', this._check, this);
    },

    _check: function() {
      let lv = this._map._level;
      if (lv <= this.options.maxLevel && lv >= this.options.minLevel) {
        this.setStyle({
          opacity: this.options.opacity || 1,
          fillOpacity: this.options.fillOpacity || 0.2
        });
      } else {
        this.setStyle({
          opacity: 0,
          fillOpacity: 0
        });
      }
    }

  });

  L.circleMarker.ml = function(latlng, options) {
    return (new L.CircleMarker.ML(latlng, options));
  };


//polygon
  L.Polygon.ML = L.Polygon.extend({

    onAdd: function(map) {
      L.Polygon.prototype.onAdd.call(this, map);
      map._layersMaxLevel.push(this.options.maxLevel);
      map._layersMinLevel.push(this.options.minLevel);
      map.on('levelchange', this._check, this);
      map.setLevel(map.getLevel());
      this._check();
    },

    onRemove: function(map) {
      L.Polygon.prototype.onRemove.call(this, map);
      map._layersMaxLevel.splice(map._layersMaxLevel.indexOf(this.options.maxLevel), 1);
      map._layersMinLevel.splice(map._layersMaxLevel.indexOf(this.options.minLevel), 1);
      map.off('levelchange', this._check, this);
    },

    _check: function() {
      let lv = this._map._level;
      if (lv <= this.options.maxLevel && lv >= this.options.minLevel) {
        this.setStyle({
          opacity: this.options.opacity || 1,
          fillOpacity: this.options.fillOpacity || 0.2
        });
      } else {
        this.setStyle({
          opacity: 0,
          fillOpacity: 0
        });
      }
    }

  });

  L.polygon.ml = function(latlngs, options) {
    return (new L.Polygon.ML(latlngs, options));
  };

//rectangle
  L.Rectangle.ML = L.Rectangle.extend({

    onAdd: function(map) {
      L.Rectangle.prototype.onAdd.call(this, map);
      map._layersMaxLevel.push(this.options.maxLevel);
      map._layersMinLevel.push(this.options.minLevel);
      map.on('levelchange', this._check, this);
      map.setLevel(map.getLevel());
      this._check();
    },

    onRemove: function(map) {
      L.Rectangle.prototype.onRemove.call(this, map);
      map._layersMaxLevel.splice(map._layersMaxLevel.indexOf(this.options.maxLevel), 1);
      map._layersMinLevel.splice(map._layersMaxLevel.indexOf(this.options.minLevel), 1);
      map.off('levelchange', this._check, this);
    },

    _check: function() {
      let lv = this._map._level;
      if (lv <= this.options.maxLevel && lv >= this.options.minLevel) {
        this.setStyle({
          opacity: this.options.opacity || 1,
          fillOpacity: this.options.fillOpacity || 0.2
        });
      } else {
        this.setStyle({
          opacity: 0,
          fillOpacity: 0
        });
      }
    }

  });

  L.rectangle.ml = function(latlngs, options) {
    return (new L.Rectangle.ML(latlngs, options));
  };

//tilelayer
  L.TileLayer.ML = L.TileLayer.extend({
    onAdd: function(map) {
      map._layersMaxLevel.push(this.options.maxLevel);
      map._layersMinLevel.push(this.options.minLevel);
      L.TileLayer.prototype.onAdd.call(this, map);
      map.on('levelchange', this.redraw, this);
      map.setLevel(map.getLevel());
      this.redraw();
    },

    onRemove: function(map) {
      L.TileLayer.prototype.onRemove.call(this, map);
      map._layersMaxLevel.splice(map._layersMaxLevel.indexOf(this.options.maxLevel), 1);
      map._layersMinLevel.splice(map._layersMaxLevel.indexOf(this.options.minLevel), 1);
      map.off('levelchange', this.redraw, this);
    },

    getTileUrl: function(coords) {
      var data = {
        r: L.Browser.retina ? '@2x' : '',
        s: this._getSubdomain(coords),
        x: coords.x,
        y: coords.y,
        z: this._getZoomForUrl(),
        level: this._map._level
      };
      if (this._map && !this._map.options.crs.infinite) {
        var invertedY = this._globalTileRange.max.y - coords.y;
        if (this.options.tms) {
          data['y'] = invertedY;
        }
        data['-y'] = invertedY;
      }
      return L.Util.template(this._url, L.extend(data, this.options));
    }
  });


  L.tileLayer.ml = function(url, options) {
    return (new L.TileLayer.ML(url, options));
  };

//control
  L.Control.Level = L.Control.extend({
    onAdd: function(map) {
      var container = L.DomUtil.create('div', '');
      container.style.width = 'auto';
      container.style.height = 'auto';
      container.style.border = 'solid 0px black';
      container.style['border-radius'] = '4px';
      container.style.padding = '5px 5px 5px 5px';
      container.style['background-color'] = 'white';
      container.style['box-shadow'] = '0px 0px 4px black';
      var indicator = L.DomUtil.create('div', '', container);
      indicator.innerHTML = map._level;
      indicator.style.width = 'auto';
      indicator.style.height = 'auto';
      indicator.style['font-size'] = '1.5em';
      indicator.style['font-weight'] = 'bold';
      indicator.style['line-height'] = '80%';
      indicator.style.cursor = 'default';

      indicator.title = 'Acutal level';
      map.on('levelchange', this._update, this);
      this._indicator = indicator;
      return container;
    },

    onRemove: function(map) {
      map.off('levelchange', this._update, this);

    },

    _update: function() {
      this._indicator.innerHTML = this._map._level;
    }
  });

  L.control.level = function(opts) {
    return new L.Control.Level(opts);
  }

  L.MultiLevelHandler = L.Handler.extend({

    addHooks: function() {
      L.DomEvent.on(window, 'keydown', this._keyDown, this);
      L.DomEvent.on(window, 'keyup', this._keyUp, this);
      this._map._level = this._map.options.minLevel || null;
      this._map._layersMaxLevel = [];
      this._map._layersMinLevel = [];
      if (this._map.options.levelControl) {
        this._map.levelControl = L.control.level(this._map.options.levelControl);
        this._map.addControl(this._map.levelControl);
      }
    },

    removeHooks: function() {
      L.DomEvent.off(window, 'keydown', this._keyDown, this);
      L.DomEvent.off(window, 'keyup', this._keyUp, this);
      delete this._map._level;
    },

    //ctrl plus arrow move between levels
    _keyDown: function(e) {
      if (!e.ctrlKey) return;
      if (e.keyCode == 38) {
        let max = this._map.options.maxLevel;
        if (typeof max === 'undefined') {
          max = Math.max(...this._map._layersMaxLevel);
        }
        if (max && this._map._level >= max) return;
        this._map.fire('startlevelchange');
      }
      if (e.keyCode == 40) {
        let min = this._map.options.minLevel;
        if (typeof min === 'undefined') {
          min = Math.min(...this._map._layersMinLevel);
        }
        if (min && this._map._level <= min) return;
        this._map.fire('startlevelchange');
      }
    },

    _keyUp: function(e) {
      if (!e.ctrlKey) return;
      if (e.keyCode == 38) {
        let max = this._map.options.maxLevel;
        if (typeof max === 'undefined') {
          max = Math.max(...this._map._layersMaxLevel);
        }
        if (max && this._map._level >= max) return;
        this._map._level++;
        this._map.fire('levelchange');
      }
      if (e.keyCode == 40) {
        let min = this._map.options.minLevel;
        if (typeof min === 'undefined') {
          min = Math.min(...this._map._layersMinLevel);
        }
        if (min && this._map._level <= min) return;
        this._map._level--;
        this._map.fire('levelchange');
      }
    }

  });


  L.Map.addInitHook('addHandler', 'multilevel', L.MultiLevelHandler);

  L.Map.prototype.getLevel = function() {
    return this._level;
  }

  L.Map.prototype.setLevel = function(level) {
    if (this.options.multilevel) {
      let max = this.options.maxLevel;
      if (typeof max === 'undefined') {
        max = Math.max(...this._layersMaxLevel);
      }
      let min = this.options.minLevel;
      if (typeof min === 'undefined') {
        min = Math.min(...this._layersMinLevel);
      }
      let s = Math.min(Math.max(level, min), max);
      this._level = s;
      this.fire("levelchange");
    }
    return this;
  }


  L.Map.prototype.setMaxLevel = function(max) {
    if (this.options.multilevel) {
      this.options.maxLevel = max;
    }
    return this.setLevel(Math.min(this._level, max));
  }


  L.Map.prototype.setMaxLevel = function(min) {
    if (this.options.multilevel) {
      this.options.minLevel = min;
    }
    return this.setLevel(Math.max(this._level, min));
  }
}
