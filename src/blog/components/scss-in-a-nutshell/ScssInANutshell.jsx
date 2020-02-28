import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import { registerBlog } from '../Blog.jsx'
import Code from '../../../shared/Code.jsx'

import zf from '../../../foundation.scss'

class ScssInANutshell extends Component {
  render () {
    return (
      <>
        <div className={classnames(zf.callout, zf.primary)}>
          <p>This article is old and may contain information or advice that is deprecated.</p>
        </div>
        <section>
          <h2>SCSS in a nutshell</h2>
          <p>The complete Sass/SCSS reference is located <a href='http://sass-lang.com/documentation/file.SASS_REFERENCE.html'>http://sass-lang.com/documentation/file.SASS_REFERENCE.html</a></p>

          <h3>Installation</h3>
          <p>Install Sass using Ruby</p>
          <Code $='gem install sass' />
          <p>Have Sass watch over a file, and specify the output destination</p>
          <Code $='sass --watch main.scss:main.css' />
          <p>You will almost never use this command. Instead we use Grunt to handle this.</p>
          <p>Install Sass syntax highlighting in Sublime Text via Package Control <a href='https://packagecontrol.io/packages/Syntax%20Highlighting%20for%20Sass'>https://packagecontrol.io/packages/Syntax%20Highlighting%20for%20Sass</a></p>
          <ul>
            <li>
              Enable Package Control
              <ul>
                <li>
                  Open the Sublime Text console. <code>ctrl+`</code> OR <code>View > Show Console</code>
                </li>
                <li>
                  Run the Python code found at <a href='https://packagecontrol.io/installation'>https://packagecontrol.io/installation</a>
                </li>
              </ul>
            </li>
            <li>
              Install the Syntax Highlighting for Sass package
              <ul>
                <li>
                  Open the Command Pallete. <code>ctrl+shift+p</code> (Win/Linux) OR <code>cmd+shift+p</code> (OSX)
                </li>
                <li>
                  Select Package Control: Install Package (and wait a bit)
                </li>
                <li>
                  Select Syntax Highlighting for Sass
                </li>
              </ul>
            </li>
          </ul>

          <h3>Partials</h3>
          <p>All <code>.scss</code> files are compiled into their respective <code>.css</code> file. Partials which are prefixed with an underscore will not generate their own <code>.css</code> file. They exist for inclusion from other files.</p>
          <Code
            lang='css'
            $={(
              '// _partial.scss\n' +
              '@import \'partial\'; // underscore and extension omitted'
            )}
          />

          <h3>CSS Compliant</h3>
          <p>All CSS rules and syntax work in Sass. CSS in a Nutshell: <Link to='/css-in-a-nutshell'>/css-in-a-nutshell</Link></p>

          <h3>Nesting</h3>
          <p>Selectors can be nested within others and are equivalent to CSS’s space separated selectors.</p>
          <Code
            lang='css'
            $={(
              'ul {\n' +
              '  list-style-type: none;\n' +
              '\n' +
              '  li { // equivalent to the selector \'ul li\'\n' +
              '    display: block;\n' +
              '  }\n' +
              '}'
            )}
          />

          <h3>Parent Selector</h3>
          <p>The <code>&</code> character represents the current parent selector and allows selectors to be made relative to it.</p>
          <Code
            lang='css'
            $={(
              '.button {\n' +
              '  background-color: blue;\n' +
              '\n' +
              '  &:hover { // .button:hover\n' +
              '    background-color: red;\n' +
              '  }\n' +
              '  footer & { // footer .button\n' +
              '    background-color: green;\n' +
              '  }\n' +
              '  &-black { // .button-black\n' +
              '    background-color: black;\n' +
              '  }\n' +
              '}'
            )}
          />

          <h3>Nested Properties</h3>
          <p>Certain properties can also be nested.</p>
          <Code
            lang='css'
            $={(
              'blockquote {\n' +
              '  font: {\n' +
              '    family: "Times New Roman", serif; // font-family\n' +
              '    style: italics; // font-style\n' +
              '    size: 2rem; // font-size\n' +
              '  }\n' +
              '}'
            )}
          />

          <h3>Extend/Inheritance</h3>
          <p>Selectors can inherit from other selectors using <code>@extend</code>. If the <code>!optional</code> tag is included, <code>@extend</code> will be ignored if it were to cause an error (eg. the selector doesn't exist or is conflictory). The <code>%</code> selector is similar to <code>.</code>/<code>#</code> for classes/id's, but exists for the purpose of inheritance and won't be rendered into the output css.</p>
          <Code
            lang='css'
            $={(
              'p%awesome { // This ruleset won\'t be rendered explicitly\n' +
              '  font-weight: bold;\n' +
              '}\n' +
              '.message {\n' +
              '  border: 1px solid #CCCCCC;\n' +
              '  color: #333333;\n' +
              '}\n' +
              '.message-success {\n' +
              '  @extend .message;\n' +
              '  border-color: green;\n' +
              '  p {\n' +
              '    @extend %awesome; // @extend successfully runs\n' +
              '    @extend .something !optional; // .something doesn\'t exist; @extend is ignored.\n' +
              '  }\n' +
              '  a {\n' +
              '    @extend %awesome !optional;\n' +
              '    // %awesome is defined only for p\n' +
              '    // @extend is ignored.\n' +
              '  }\n' +
              '}'
            )}
          />

          <h3>Variables</h3>
          <p>Variables' scopes are within the level of selectors they are defined in, unless given the <code>!global</code> flag. The <code>!default</code> flag will set the variable if it isn't already defined.</p>
          <Code
            lang='css'
            $={(
              '$size: 15px;\n' +
              '$size: 30px !default; // $size is still 15px\n' +
              'html {\n' +
              '  $color: #335544 !global;\n' +
              '  background-color: $color;\n' +
              '}\n' +
              'div {\n' +
              '  background-color: white;\n' +
              '  color: $color;\n' +
              '}'
            )}
          />
          <p>Allowed variable types:</p>
          <ul>
            <li>Numbers: <code>1.2</code>, <code>13</code>, <code>10px</code></li>
            <li>Strings: <code>"foo"</code>, <code>'bar'</code>, <code>baz</code></li>
            <li>Colors: <code>blue</code>, <code>#04A3F9</code>, <code>rgba(255, 0, 0, .5)</code></li>
            <li>Booleans: <code>true</code>, <code>false</code></li>
            <li>Nulls: <code>null</code></li>
            <li>Lists (space or comma separated): <code>1.5em 0 2em</code>, <code>Helvetica, Arial, san-serif</code></li>
            <li>Maps: <code>(key1: value1, key2: value2)</code></li>
          </ul>

          <h3>Interpolation</h3>
          <p>Interpolation is mainly for using variables in selectors or strings.</p>
          <Code
            lang='css'
            $={(
              '$name: foo;\n' +
              '$attr: border;\n' +
              'p.#{$name} { // p.foo\n' +
              '  #{$attr}-color: blue; // border-color\n' +
              '}\n' +
              '$text: "#{$name}#{$attr}"; // "fooborder"'
            )}
          />

          <h3>Operations</h3>
          <p>Take care that agreeable units are in the arguments.</p>
          <p>Numbers and Colors: <code>+</code> <code>-</code> <code>*</code> <code>/</code> <code>%</code> <code>{'<'}</code> <code>{'>'}</code> <code>{'<='}</code> <code>{'>='}</code> <code>==</code> <code>!=</code></p>
          <Code
            lang='css'
            $={(
              '80px / 320px * 100% == 25%\n' +
              '#010203 + #040506 == #050709 // computed piecewise\n' +
              '16px + 1em // Invalid operation\n' +
              '10px * 10px == 100px*px // Note px*px is not a CSS unit'
            )}
          />
          <p>Strings: <code>+</code> <code>==</code> <code>!=</code></p>
          <Code
            lang='css'
            $={(
              '"Foo " + Bar == "Foo Bar"\n' +
              'sans + -serif == sans-serif'
            )}
          />
          <p>Booleans: <code>and</code> <code>or</code> <code>not</code> <code>==</code> <code>!=</code></p>

          <h3>Mixins</h3>
          <p>Mixins are reusable groups of CSS declarations which allow variable parameters. (Also accepts the parameters as lists and maps).</p>
          <Code
            lang='css'
            $={(
              '@mixin border($width, $style, $color, $radius: 0px) {\n' +
              '  // $radius uses default value of 0px if not passed\n' +
              '  border: {\n' +
              '    color: $color;\n' +
              '    style: $style;\n' +
              '    width: $width;\n' +
              '  }\n' +
              '  -webkit-border-radius: $radius;\n' +
              '     -moz-border-radius: $radius;\n' +
              '      -ms-border-radius: $radius;\n' +
              '          border-radius: $radius;\n' +
              '  }\n' +
              '}\n' +
              '@mixin box-shadow($shadows...) { // supports var-args\n' +
              '  -webkit-box-shadow: $shadows;\n' +
              '     -moz-box-shadow: $shadows;\n' +
              '          box-shadow: $shadows;\n' +
              '}\n' +
              '\n' +
              '.box {\n' +
              '  @include border(1px, solid, blue);\n' +
              '  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);\n' +
              '}\n' +
              '.circle {\n' +
              '  @include border(\n' +
              '    $width: 5px,\n' +
              '    $color: green,\n' +
              '    $style: dashed,\n' +
              '    $radius: 50%\n' +
              '  );\n' +
              '  // keyword arguments\n' +
              '}'
            )}
          />
          <p>Mixins using a Content Block</p>
          <Code
            lang='css'
            $={(
              '@mixin apply-to-main {\n' +
              '  #main {\n' +
              '    @content;\n' +
              '  }\n' +
              '}\n' +
              '@include apply-to-main {\n' +
              '  background-color: blue; // #main\n' +
              '  #logo { // #main #logo\n' +
              '    background-image: url(/logo.gif);\n' +
              '  }\n' +
              '}'
            )}
          />

          <h3>Functions</h3>
          <p>Functions supports var-args and keyword arguments similar to mixins. For the list of built-in Sass functions: <a href='http://sass-lang.com/documentation/Sass/Script/Functions.html'>http://sass-lang.com/documentation/Sass/Script/Functions.html</a></p>
          <Code
            lang='css'
            $={(
              '$grid-width: 40px;\n' +
              '$gutter-width: 10px;\n' +
              '@function grid-width($n) {\n' +
              '  @return $n * $grid-width + ($n - 1) * $gutter-width;\n' +
              '}\n' +
              '#sidebar {\n' +
              '  width: grid-width(5); // 240px\n' +
              '}'
            )}
          />

          <h3>Control Directives</h3>
          <p>All values are "truthy" except for <code>false</code> and <code>null</code>.</p>
          <p>The <code>@if</code>, <code>@else if</code>, and <code>@else</code> directives:</p>
          <Code
            lang='css'
            $={(
              'p {\n' +
              '  @if 1 + 1 == 2 { border: 1px solid; } // true\n' +
              '  @if "cheese"   { border: 2px solid; } // true\n' +
              '  @if 5 < 3      { border: 2px dotted; } // false\n' +
              '  @if null       { border: 3px double; } // false\n' +
              '  @if $type == ocean {\n' +
              '    color: blue;\n' +
              '  } @else if $type == matador {\n' +
              '    color: red;\n' +
              '  } @else {\n' +
              '    color: black;\n' +
              '  }\n' +
              '}'
            )}
          />
          <p>The <code>@for</code> directive loops (incrementally or decrementally) a variable through a range of integers.</p>
          <Code
            lang='css'
            $={(
              '@for $i from 1 through 3 {\n' +
              '  .size-#{$i} { width: 2em * $i; }\n' +
              '}'
            )}
          />
          <p>The <code>@each</code> directive loops through lists or maps. Also supports multiple assignment.</p>
          <Code
            lang='css'
            $={(
              '@each $animal in puma, sea-slug, egret, salamander {\n' +
              '  .#{$animal}-icon {\n' +
              '    background-image: url(\'/images/#{$animal}.png\');\n' +
              '  }\n' +
              '}\n' +
              '@each $animal, $color, $cursor in (puma, black, default),\n' +
              '                                  (sea-slug, blue, pointer),\n' +
              '                                  (egret, white, move) {\n' +
              '  .#{$animal}-icon {\n' +
              '    background-image: url(\'/images/#{$animal}.png\');\n' +
              '    border: 2px solid $color;\n' +
              '    cursor: $cursor;\n' +
              '  }\n' +
              '}'
            )}
          />
          <p>The <code>@while</code> directive loops while a condition is true.</p>
          <Code
            lang='css'
            $={(
              '$i: 6;\n' +
              '@while $i > 0 {\n' +
              '  .item-#{$i} { width: 2em * $i; }\n' +
              '  $i: $i - 2;\n' +
              '}'
            )}
          />
        </section>
      </>
    )
  }
}

export default registerBlog(ScssInANutshell, '2015/07/20', 'SCSS in a Nutshell')
