[![npm version](https://badge.fury.io/js/leaflet-multilevel.svg)](https://badge.fury.io/js/leaflet-multilevel)

## demo at <https://gherardovarando.github.io/leaflet-multilevel/demo>

Multi level plugin for leaflet, the plugin define new methods for the Map object, a new control and new types of layers (``L.layerName.ml``).
The plugin is been developed to visualize mutlislice maps for example created from bio images (confocal microscopy).

## Usage

```
let map = L.map('map', {
  multilevel: true,
  levelControl: {
    position: 'bottomleft'
  }
  });

let url = 'https://gherardovarando.github.io/leaflet-multilevel/demo/GAD67_tiles/slice{level}/{z}/{x}/{y}.png';
let mslayer = L.tileLayer.ml(url,{
   minLevel: 1,
   maxLevel: 43,
   tileSize: L.point([88,256])
  });

mslayer.addTo(map);
map.fitWorld();
map.setLevel(10);

```

## API

To be able to use the ``TileLayer.ml`` it is necessary to set the ``multilevel`` option to ``true`` in the map creation options or to add the multi level Handler.
Moreover the ``levelControl`` option controls the presence and position of the slice control.

### ``TileLayer.MultiSlice``

#### Creation

##### ``L.tileLayer.ml(urlTemplate, options)``

- ``urlTemplate`` a string of the following form ``'http://{s}.somedomain.com/{foo}/{level}/{z}/{x}/{y}.png'``
- ``options`` as  TileLayer options and moreover:
  - ``maxLevel``
  - ``minLevel``


***
### `map` Methods

New methods for the ``map`` object

- #### ``getLevel()``
  Returns the current slice index

- #### ``setLevel(l)``
  Set the slice value to ``l`` if compatible with the limits.

  Returns ``this``.

- #### ``setMaxLevel(max)``
   Set the max slice value to ``max``.

   Returns ``this``.

- #### ``setMinLevel(min)``
  Set the min slice value to ``min``.

  Returns ``this``.

### `map` Events

The following events are fired by the ``map`` object

- #### ``startslevelchange``
  Emitted when the user press down one of the arrow up/down key with the ctrl key.

- #### ``levelchange``
   Emitted when the user release the up/down arrow key and the slice value is increased or decreased. The event is not fired if the slice value is not changed (due to maxSlice, minSlice limits)  


### LICENSE

The MIT License (MIT)

Copyright (c) 2017 Gherardo Varando (gherardo.varando@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
