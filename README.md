# gl-react-blur ![](https://img.shields.io/npm/v/gl-react-blur.svg) ![](https://img.shields.io/badge/gl--react-3-05F561.svg) ![](https://img.shields.io/badge/gl--react-dom%20%7C%20native-f90.svg)

[Universal](https://projectseptemberinc.gitbooks.io/gl-react/content/docs/universal.html) gl-react **multi-pass gaussian Blur effect** with configurable intensity.

## `{Blur}` Props

* `children` **(required)**: the content to blur.
* `factor` **(required)**: positive number that control the blur intensity (independently from the viewport size).
* `passes`: integer that controls the number of linear Blur passes. Default to 2. You better you an even number.

More advanced...

* `directionForPass`: function that gives the linear blur direction for a given pass. `(p, factor, total) => [ dx, dy ]`. Default to a function that do a _{ horizontal, vertical, diagonal 1, diagonal 2 }_ rotation with varying intensity.

## `{BlurV}` Props

**BlurV** is a variant of **Blur** that allows to make **Variable** blur effect.

It accepts one more prop:

* `map` **(required)**: a texture that localize the blur intensity.

## Usage Examples

```js
var Blur = require("gl-react-blur").Blur;
// or
import { Blur } from "gl-react-blur";
```

### Small blur on an image

```html
<Blur factor={0.5} passes={2}>
  http://i.imgur.com/zJIxPEo.jpg
</Blur>
```

### Medium blur on a video

```html
<Blur factor={2} passes={4}>
  <video ... />
</Blur>
```

### Powerful blur on another stack of effects

```html
<Blur factor={20} passes={6}>
  <EffectA>
    <EffectB>
      ...
    </EffectB>
  </EffectA>
</Blur>
```

### Variable Blur

```html
<BlurV factor={3} passes={6} map="http://i.imgur.com/SzbbUvX.png">
  ...
</BlurV>
```
