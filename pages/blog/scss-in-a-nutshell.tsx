import React from 'react'
import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Link from '../../src/Link'
import Blog from '../../src/blog/Blog'
import Section from '../../src/blog/Section'
import Highlight from '../../src/Highlight'

const SCSSInANutshell = (): React.ReactElement => {
  return (
    <Blog title='SCSS in a Nutshell' date='2015/07/20'>
      <Section>
        <Alert severity='info'>
          This article is old and may contain information or advice that is deprecated.
        </Alert>
      </Section>
      <Section>
        <Typography paragraph>The complete Sass/SCSS reference is located <MuiLink href='https://sass-lang.com/documentation'>here</MuiLink>.</Typography>

        <Typography variant='h3' gutterBottom>Installation</Typography>
        <Typography paragraph>Install Sass using Ruby</Typography>
        <Highlight language='bash'>gem install sass</Highlight>
        <Typography paragraph>Have Sass watch over a file, and specify the output destination</Typography>
        <Highlight language='bash'>sass --watch main.scss:main.css</Highlight>
        <Typography paragraph>You will almost never use this command. Instead we use Grunt to handle this.</Typography>
        <Typography paragraph>Install Sass syntax highlighting in Sublime Text via Package Control <MuiLink href='https://packagecontrol.io/packages/Syntax%20Highlighting%20for%20Sass'>https://packagecontrol.io/packages/Syntax%20Highlighting%20for%20Sass</MuiLink></Typography>
        <ul>
          <Typography component='li'>
            Enable Package Control
            <ul>
              <Typography component='li'>
                Open the Sublime Text console. <code>ctrl+`</code> OR <code>View &gt; Show Console</code>
              </Typography>
              <Typography component='li'>
                Run the Python code found at <MuiLink href='https://packagecontrol.io/installation'>https://packagecontrol.io/installation</MuiLink>
              </Typography>
            </ul>
          </Typography>
          <Typography component='li'>
            Install the Syntax Highlighting for Sass package
            <ul>
              <Typography component='li'>
                Open the Command Pallete. <code>ctrl+shift+p</code> (Win/Linux) OR <code>cmd+shift+p</code> (OSX)
              </Typography>
              <Typography component='li'>
                Select Package Control: Install Package (and wait a bit)
              </Typography>
              <Typography component='li'>
                Select Syntax Highlighting for Sass
              </Typography>
            </ul>
          </Typography>
        </ul>

        <Typography variant='h3' gutterBottom>Partials</Typography>
        <Typography paragraph>All <code>.scss</code> files are compiled into their respective <code>.css</code> file. Partials which are prefixed with an underscore will not generate their own <code>.css</code> file. They exist for inclusion from other files.</Typography>
        <Highlight language='scss'>
          {`
// _partial.scss
@import 'partial'; // underscore and extension omitted
          `.trim()}
        </Highlight>

        <Typography variant='h3' gutterBottom>CSS Compliant</Typography>
        <Typography paragraph>All CSS rules and syntax work in Sass. CSS in a Nutshell: <Link href='/blog/css-in-a-nutshell'>/css-in-a-nutshell</Link></Typography>

        <Typography variant='h3' gutterBottom>Nesting</Typography>
        <Typography paragraph>Selectors can be nested within others and are equivalent to CSS’s space separated selectors.</Typography>
        <Highlight language='scss'>
          {`
ul {
  list-style-type: none;

  li { // equivalent to the selector 'ul li'
    display: block;
  }
}
          `.trim()}
        </Highlight>

        <Typography variant='h3' gutterBottom>Parent Selector</Typography>
        <Typography paragraph>The <code>&</code> character represents the current parent selector and allows selectors to be made relative to it.</Typography>
        <Highlight language='scss'>
          {`
.button {
  background-color: blue;

  &:hover { // .button:hover
    background-color: red;
  }
  footer & { // footer .button
    background-color: green;
  }
  &-black { // .button-black
    background-color: black;
  }
}
          `.trim()}
        </Highlight>

        <Typography variant='h3' gutterBottom>Nested Properties</Typography>
        <Typography paragraph>Certain properties can also be nested.</Typography>
        <Highlight language='scss'>
          {`
blockquote {
  font: {
    family: "Times New Roman", serif; // font-family
    style: italics; // font-style
    size: 2rem; // font-size
  }
}
          `.trim()}
        </Highlight>

        <Typography variant='h3' gutterBottom>Extend/Inheritance</Typography>
        <Typography paragraph>Selectors can inherit from other selectors using <code>@extend</code>. If the <code>!optional</code> tag is included, <code>@extend</code> will be ignored if it were to cause an error (e.g. the selector doesn't exist or is conflictory). The <code>%</code> selector is similar to <code>.</code>/<code>#</code> for classes/id's, but exists for the purpose of inheritance and won't be rendered into the output css.</Typography>
        <Highlight language='scss'>
          {`
p%awesome { // This ruleset won't be rendered explicitly
  font-weight: bold;
}
.message {
  border: 1px solid #CCCCCC;
  color: #333333;
}
.message-success {
  @extend .message;
  border-color: green;
  p {
    @extend %awesome; // @extend successfully runs
    @extend .something !optional; // .something doesn't exist; @extend is ignored.
  }
  a {
    @extend %awesome !optional;
    // %awesome is defined only for p
    // @extend is ignored.
  }
}
          `.trim()}
        </Highlight>

        <Typography variant='h3' gutterBottom>Variables</Typography>
        <Typography paragraph>Variables’ scopes are within the level of selectors they are defined in, unless given the <code>!global</code> flag. The <code>!default</code> flag will set the variable if it isn't already defined.</Typography>
        <Highlight language='scss'>
          {`
$size: 15px;
$size: 30px !default; // $size is still 15px
html {
  $color: #335544 !global;
  background-color: $color;
}
div {
  background-color: white;
  color: $color;
}
          `.trim()}
        </Highlight>
        <Typography paragraph>Allowed variable types:</Typography>
        <ul>
          <Typography component='li'>Numbers: <code>1.2</code>, <code>13</code>, <code>10px</code></Typography>
          <Typography component='li'>Strings: <code>"foo"</code>, <code>'bar'</code>, <code>baz</code></Typography>
          <Typography component='li'>Colors: <code>blue</code>, <code>#04A3F9</code>, <code>rgba(255, 0, 0, .5)</code></Typography>
          <Typography component='li'>Booleans: <code>true</code>, <code>false</code></Typography>
          <Typography component='li'>Nulls: <code>null</code></Typography>
          <Typography component='li'>Lists (space or comma separated): <code>1.5em 0 2em</code>, <code>Helvetica, Arial, san-serif</code></Typography>
          <Typography component='li'>Maps: <code>(key1: value1, key2: value2)</code></Typography>
        </ul>

        <Typography variant='h3' gutterBottom>Interpolation</Typography>
        <Typography paragraph>Interpolation is mainly for using variables in selectors or strings.</Typography>
        <Highlight language='scss'>
          {`
$name: foo;
$attr: border;
p.#{$name} { // p.foo
  #{$attr}-color: blue; // border-color
}
$text: "#{$name}#{$attr}"; // "fooborder"
          `.trim()}
        </Highlight>

        <Typography variant='h3' gutterBottom>Operations</Typography>
        <Typography paragraph>Take care that agreeable units are in the arguments.</Typography>
        <Typography paragraph>Numbers and Colors: <code>+</code> <code>-</code> <code>*</code> <code>/</code> <code>%</code> <code>{'<'}</code> <code>{'>'}</code> <code>{'<='}</code> <code>{'>='}</code> <code>==</code> <code>!=</code></Typography>
        <Highlight language='scss'>
          {`
80px / 320px * 100% == 25%
#010203 + #040506 == #050709 // computed piecewise
16px + 1em // Invalid operation
10px * 10px == 100px*px // Note px*px is not a CSS unit
          `.trim()}
        </Highlight>
        <Typography paragraph>Strings: <code>+</code> <code>==</code> <code>!=</code></Typography>
        <Highlight language='scss'>
          {`
"Foo " + Bar == "Foo Bar"
sans + -serif == sans-serif
          `.trim()}
        </Highlight>
        <Typography paragraph>Booleans: <code>and</code> <code>or</code> <code>not</code> <code>==</code> <code>!=</code></Typography>

        <Typography variant='h3' gutterBottom>Mixins</Typography>
        <Typography paragraph>Mixins are reusable groups of CSS declarations which allow variable parameters. (Also accepts the parameters as lists and maps).</Typography>
        <Highlight language='scss'>
          {`
@mixin border($width, $style, $color, $radius: 0px) {
  // $radius uses default value of 0px if not passed
  border: {
    color: $color;
    style: $style;
    width: $width;
  }
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
  }
}
@mixin box-shadow($shadows...) { // supports var-args
  -webkit-box-shadow: $shadows;
     -moz-box-shadow: $shadows;
          box-shadow: $shadows;
}

.box {
  @include border(1px, solid, blue);
  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
}
.circle {
  @include border(
    $width: 5px,
    $color: green,
    $style: dashed,
    $radius: 50%
  );
  // keyword arguments
}
          `.trim()}
        </Highlight>
        <Typography paragraph>Mixins using a Content Block</Typography>
        <Highlight language='scss'>
          {`
@mixin apply-to-main {
  #main {
    @content;
  }
}
@include apply-to-main {
  background-color: blue; // #main
  #logo { // #main #logo
    background-image: url(/logo.gif);
  }
}
          `.trim()}
        </Highlight>

        <Typography variant='h3' gutterBottom>Functions</Typography>
        <Typography paragraph>Functions supports var-args and keyword arguments similar to mixins. For the list of built-in Sass functions: <a href='http://sass-lang.com/documentation/Sass/Script/Functions.html'>http://sass-lang.com/documentation/Sass/Script/Functions.html</a></Typography>
        <Highlight language='scss'>
          {`
$grid-width: 40px;
$gutter-width: 10px;
@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}
#sidebar {
  width: grid-width(5); // 240px
}
          `.trim()}
        </Highlight>

        <Typography variant='h3' gutterBottom>Control Directives</Typography>
        <Typography paragraph>All values are "truthy" except for <code>false</code> and <code>null</code>.</Typography>
        <Typography paragraph>The <code>@if</code>, <code>@else if</code>, and <code>@else</code> directives:</Typography>
        <Highlight language='scss'>
          {`
p {
  @if 1 + 1 == 2 { border: 1px solid; }  // true
  @if "cheese"   { border: 2px solid; }  // true
  @if 5 < 3      { border: 2px dotted; } // false
  @if null       { border: 3px double; } // false
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else {
    color: black;
  }
}
          `.trim()}
        </Highlight>
        <Typography paragraph>The <code>@for</code> directive loops (incrementally or decrementally) a variable through a range of integers.</Typography>
        <Highlight language='scss'>
          {`
@for $i from 1 through 3 {
  .size-#{$i} { width: 2em * $i; }
}
          `.trim()}
        </Highlight>
        <Typography paragraph>The <code>@each</code> directive loops through lists or maps. Also supports multiple assignment.</Typography>
        <Highlight language='scss'>
          {`
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
@each $animal, $color, $cursor in (puma, black, default),
                                  (sea-slug, blue, pointer),
                                  (egret, white, move) {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
    border: 2px solid $color;
    cursor: $cursor;
  }
}
          `.trim()}
        </Highlight>
        <Typography paragraph>The <code>@while</code> directive loops while a condition is true.</Typography>
        <Highlight language='scss'>
          {`
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
          `.trim()}
        </Highlight>
      </Section>
    </Blog>
  )
}

export default SCSSInANutshell
