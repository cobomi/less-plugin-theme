# less-plugin-theme

Keep only theme rules from less files

## What it does
This plugin allows to write less like this:
```css
button {
  display: block;
  width: 100%;
  line-height: 1.2;
  font-size: 14;
  border-radius: 4px;
  color: @input-color;              /* theme */
  background-color: @input-bg;      /* theme */
  border: 1px solid @input-border;  /* theme */
}
```
and when run with `lessc --theme file.less` will keep only rules that are followed by a `/* theme */`
comment.

```css
button {
  color: #000;
  background-color: #fff;
  border: 1px solid #ccc;
}
```

## Install
```
npm install -g less-plugin-theme
```

## Usage
```
lessc --theme file.less
```

## Without it (the initial problem)
If one wants to create css themes it has to create 2 files

**main.less**
```css
button {
  display: block;
  width: 100%;
  line-height: 1.2;
  font-size: 14;
  border-radius: 4px;
  color: @input-color;
  background-color: @input-bg;
  border: 1px solid @input-border;
}
```

**theme.less**
```css
button {
  color: @input-color;
  background-color: @input-bg;
  border: 1px solid @input-border;
}
```
but on a large code base is hard to keep the files synchronized and chances are
that something will be missed when something changes.

Another option would be to write on the same file and use less guards.

**main.less**
```css
@style: true;
@theme: true;
button {
  & when (@style) {
    display: block;
    width: 100%;
    line-height: 1.2;
    font-size: 14;
    border-radius: 4px;  
  }
  & when (@theme) {
    color: @input-color;
    background-color: @input-bg;
    border: 1px solid @input-border;
  }
}
```
but this is not exactly pretty and can be hard to follow especially on large classes.
