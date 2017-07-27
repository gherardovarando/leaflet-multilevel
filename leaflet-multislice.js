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

  L.TileLayer.MultiSlice = L.TileLayer.extend({
    onAdd: function(map) {
      L.TileLayer.prototype.onAdd.call(this, map);
      map.on('slicechange', this.redraw, this);

    },

    onRemove: function(map) {
      L.TileLayer.prototype.onRemove.call(this, map);
      map.off('slicechange', this.redraw, this);
    },

    getTileUrl: function(coords) {
      var data = {
        r: L.Browser.retina ? '@2x' : '',
        s: this._getSubdomain(coords),
        x: coords.x,
        y: coords.y,
        z: this._getZoomForUrl(),
        slice: Math.min(Math.max(this._map._slice || 0, this.options.minSlice), this.options.maxSlice)
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


  L.tileLayer.multiSlice = function(url, options) {
    return (new L.TileLayer.MultiSlice(url, options));
  };


  L.Control.Slice = L.Control.extend({
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
      indicator.innerHTML = map._slice;
      indicator.style.width = 'auto';
      indicator.style.height = 'auto';
      indicator.style['font-size'] = '1.5em';
      indicator.style['font-weight'] = 'bold';
      indicator.style['line-height'] = '80%';
      indicator.style.cursor = 'default';

      indicator.title = 'Acutal slice';
      map.on('slicechange', this._update, this);
      this._indicator = indicator;
      return container;
    },

    onRemove: function(map) {
      map.off('slicechange', this._update, this);

    },

    _update: function() {
      this._indicator.innerHTML = this._map._slice;
    }
  });

  L.control.slice = function(opts) {
    return new L.Control.Slice(opts);
  }

  L.MultiSliceHandler = L.Handler.extend({

    addHooks: function() {
      L.DomEvent.on(window, 'keydown', this._keyDown, this);
      L.DomEvent.on(window, 'keyup', this._keyUp, this);

      this._map._slice = this._map.options.minSlice || 0;
      if (this._map.options.sliceControl) {
        this._map.sliceControl = L.control.slice(this._map.options.sliceControl);
        this._map.addControl(this._map.sliceControl);
      }
    },

    removeHooks: function() {
      L.DomEvent.off(window, 'keydown', this._keyDown, this);
      L.DomEvent.off(window, 'keyup', this._keyUp, this);
      delete this._map._slice;
    },

    //ctrl plus arrow move between slices
    _keyDown: function(e) {
      if (!e.ctrlKey) return;
      if (e.keyCode == 38) {
        if (this._map.options.maxSlice && this._map._slice >= this._map.options.maxSlice) return;
        this._map.fire('startslicechange');
      }
      if (e.keyCode == 40) {
        if (this._map.options.minSlice && this._map._slice <= this._map.options.minSlice) return;
        this._map.fire('startslicechange');
      }
    },

    _keyUp: function(e) {
      if (!e.ctrlKey) return;
      if (e.keyCode == 38) {
        if (this._map.options.maxSlice && this._map._slice >= this._map.options.maxSlice) return;
        this._map._slice++;
        this._map.fire('slicechange');
      }
      if (e.keyCode == 40) {
        if (this._map.options.minSlice && this._map._slice <= this._map.options.minSlice) return;
        this._map._slice--;
        this._map.fire('slicechange');
      }
    }

  });


  L.Map.addInitHook('addHandler', 'multislice', L.MultiSliceHandler);

}
