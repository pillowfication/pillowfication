import React, { Component } from 'react'
import classnames from 'classnames'

import { registerBlog } from '../Blog.jsx'
import Code from '../../../shared/Code.jsx'

import zf from '../../../foundation.scss'

class CssInANutshell extends Component {
  render () {
    return (
      <>
        <div className={classnames(zf.callout, zf.primary)}>
          <p>This article is old and may contain information or advice that is deprecated.</p>
        </div>
        <section>
          <h2>CSS in a nutshell</h2>
          <p>CSS stands for Cascading Style Sheet and is pretty much just a list of rules that govern how an HTML page appears. A rule in CSS looks like:</p>
          <Code
            lang='css'
            $={(
              'selector {property: value;}'
            )}
          />
          <p><code>selector</code> determines which elements the rules apply to. The most important selectors are <code>element</code>, <code>.class</code>, and <code>#id</code>. A selector of h1 would apply to all <code>{'<h1>'}</code> tags, and a selector of <code>#potato</code> would apply to all elements with <code>id="potato"</code>.</p>

          <p>You can also chain selectors together in several ways</p>
          <Code
            lang='css'
            $={(
              'p#id.class1.class2    All <p> with id="id" AND class="class1 class2"\n' +
              'div p b               All <b> that is a child of a <p> that is a child of a <div>\n' +
              'body > div            All <div> that is a direct child of a <body>\n' +
              'h1, h2, h3            All <h1>, and all <h2>, and all <h3>'
            )}
          />

          <p>There are also pseudo-classes that are prefixed with a colon. For example, <code>:hover</code> is a pseudo-class that is applied onto an element when the user’s mouse is over it.</p>
          <Code
            lang='css'
            $={(
              'a:hover               All <a> that have a mouse hovering over them'
            )}
          />

          <p>There are also pseudo-elements that are prefixed with a double colon. For example, <code>::first-letter</code> corresponds to the pseudo-element that is the first letter of another element.</p>
          <Code
            lang='css'
            $={(
              'p::first-letter       All ::first-letter’s of all <p> elements'
            )}
          />
          <p>For a list of all CSS selectors: <a href='http://www.w3schools.com/cssref/css_selectors.asp'>http://www.w3schools.com/cssref/css_selectors.asp</a></p>

          <p>Another important aspect of CSS selectors has to do with precedence (a.k.a. specificity). Suppose you had the following element in HTML</p>
          <Code
            lang='html'
            $={(
              '<div id="potato"> … </div>'
            )}
          />
          <p>Coupled with the following CSS</p>
          <Code
            lang='css'
            $={(
              'div        {color: red;}\n' +
              'div#potato {color: blue;}'
            )}
          />
          <p>Our <code>{'<div id="potato">'}</code> would appear blue and not red, because <code>div#potato</code> takes precedence over <code>div</code>. Generally, the more specific rule always takes precedence and</p>
          <Code
            $={(
              'inline CSS > #id > .class > element'
            )}
          />
          <p>in terms of precedence. (This idea of precedence is what “Cascading” in CSS refers to). When two or more rules with the same precedence are defined for an object, the rule defined latest will be used.</p>
          <p>For a more extensive understanding of precedence: <a href='http://www.vanseodesign.com/css/css-specificity-inheritance-cascaade/'>http://www.vanseodesign.com/css/css-specificity-inheritance-cascaade/</a></p>

          <p>Now that selectors are all taken care of, let’s talk about the <code>{'{property: value;}'}</code> portion of a CSS rule. <code>property</code> is any one of many properties an element can have. (Not all elements support the same properties. Only <code>{'<ul>'}</code> and <code>{'<ol>'}</code> support the <code>list-style-type</code> property). <code>value</code> is whatever values the property can take on. Every property-value pair should end with a semicolon (this is optional for the very last pair)</p>
          <Code
            lang='css'
            $={(
              'p.error {color: red; font-weight: bold; font-size: 16px}'
            )}
          />
          <p>Each property usually takes on only one value, but some allow for multiple values. The values must be comma separated.</p>
          <Code
            lang='css'
            $={(
              'font-family: "Times New Roman", Georgia, serif;'
            )}
          />
          <p>(Note: values that contain spaces must be enclosed in quotes). In the above line, CSS would first try to apply <code>font-family: "Times New Roman"</code>, but if the font <code>"Times New Roman"</code> doesn’t exist, then it will fallback to <code>font-family: Georgia</code>, and if that doesn’t work either, it will finally try <code>font-family: serif</code>.</p>

          <p>CSS also includes shorthand properties which are used to set multiple properties at once. The values of shorthand properties are space separated.</p>
          <Code
            lang='css'
            $='margin: 60px 20px;'
          />
          <p>Is exactly equivalent to</p>
          <Code
            lang='css'
            $={(
              'margin-top: 60px;\n' +
              'margin-right: 20px;\n' +
              'margin-bottom: 60px;\n' +
              'margin-left: 20px;'
            )}
          />
          <p>For a list of all CSS properties: <a href='http://www.w3schools.com/cssref/'>http://www.w3schools.com/cssref/</a></p>
        </section>
        <hr />
        <section>
          <h2>CSS misc.</h2>

          <h3><code>inherit</code> and <code>initial</code></h3>
          <p>All properties can take on a value of <code>inherit</code> and <code>initial</code>. <code>inherit</code> will cause the property to inherit its value from its parent element. <code>initial</code> will cause the property to use its default value. Sometimes this default value may vary depending on the browser.</p>

          <h3><code>!important</code></h3>
          <p>All values can be given the <code>!important</code> flag, which pretty much overrides all orders of precedence. For example</p>
          <Code
            lang='css'
            $={(
              '.error {color: red !important;}'
            )}
          />
          <p>will cause any element with <code>class="error"</code> to be displayed as red regardless of any other rules. Please try to avoid using this flag.</p>

          <h3>Vendor prefixes</h3>
          <p>When a browser implements a property that is not in the CSS spec, or is part of a CSS spec that is experimental or subject to change, then they will usually attach a vendor prefix to that property value. (Unprefixed properties are guaranteed not to change). For example, <code>column-rule</code> is a fairly new property, and some browsers haven’t implemented it yet, but do include the vendor-prefixed versions. So to use <code>column-rule</code>, it would look something like</p>
          <Code
            lang='css'
            $={(
              'column-rule: 3px outset blue;           For browsers that support this\n' +
              '-webkit-column-rule: 3px outset blue;   For webkit browsers\n' +
              '-moz-column-rule: 3px outset blue;      For Mozilla\n'
            )}
          />
          <p>Generally, using vendor prefixes are unnecessary, and having to include them may cause discrepancies between browsers. But for standardized CSS3 properties like <code>border-radius</code>, it may be good to also include their vendor prefixed counterparts to support older browsers.</p>

          <h3>Units</h3>
          <p>There are two types of CSS units: Absolute and Relative. Absolute units appear the same size no matter what device you are on. Avoid using these units since screen size can vary drastically.</p>
          <blockquote>
            Absolute: <code>mm</code>, <code>cm</code>, <code>in</code>, <code>pt</code>
          </blockquote>
          <p>Relative units are measured relative to the screen or relative to another element.</p>
          <blockquote>
            Relative: <code>%</code>, <code>px</code>, <code>em</code>, <code>rem</code>
          </blockquote>
          <p>The <code>%</code> unit is measured relative to the parent element. The <code>px</code> unit corresponds to pixels on the screen. (Not exactly. There’s a slight difference between a CSS pixel and a screen pixel. See <a href='http://www.quirksmode.org/blog/archives/2010/04/a_pixel_is_not.html'>http://www.quirksmode.org/blog/archives/2010/04/a_pixel_is_not.html</a>). The <code>em</code> unit is measured relative to the font size of the parent element. The <code>rem</code> unit is measured relative to the font size of the <code>{'<html>'}</code> element (the root element).</p>

          <p>If we had the following HTML structure</p>
          <Code
            lang='html'
            $={(
              '<html>\n' +
              '…\n' +
              '  <div id="outer">\n' +
              '    <div id="inner">\n' +
              '    </div>\n' +
              '  </div>\n' +
              '…\n' +
              '</html>'
            )}
          />
          <p>And the following CSS</p>
          <Code
            lang='css'
            $={(
              'html   {font-size: 10px;}\n' +
              '#outer {font-size: 2em;}    // font-size: 20px\n' +
              '#inner {font-size: 1em;}    // font-size: 20px'
            )}
          />
          <p>Then <code>#outer</code> would have a font size twice the size of its parent, and <code>#inner</code> would have a font size equal to its parent. If we used <code>rem</code> instead</p>
          <Code
            lang='css'
            $={(
              'html   {font-size: 10px;}\n' +
              '#outer {font-size: 2rem;}    // font-size: 20px\n' +
              '#inner {font-size: 1rem;}    // font-size: 10px'
            )}
          />
          <p><code>#outer</code> would have a font size twice that of the root element, and <code>#inner</code> would have a font size equal to that of the root element.</p>

          <p>Browsers also allow using <code>calc()</code> as a CSS unit.</p>
          <Code
            lang='css'
            $={(
              'div.potato {width: calc(50%+20em);}'
            )}
          />
          <p>For browser compatibility, see <a href='http://caniuse.com/#feat=calc'>http://caniuse.com/#feat=calc</a></p>

          <h3>Colors</h3>
          <p>A color can be represented using <code>rgb()</code></p>
          <Code
            lang='css'
            $={(
              'rgb(0, 100, 255)        integer values from 0 to 255\n' +
              'rgb(5%, 50%, 0%)        percentages from 0% to 100%\n' +
              'rgb(0.0, 70.5, 10.0)    float values from 0.0 to 100.0 corresponding to percentages'
            )}
          />
          <p>You can also use <code>rgba()</code>. The first 3 parameters correspond to <code>rgb()</code> as above, and the 4th parameter is a float or percentage value corresponding to the alpha of the color.</p>
          <Code
            lang='css'
            $={(
              'rgba(50, 20, 200, .5)\n' +
              'rgba(50.0, 100.0, 0.0, 90%)'
            )}
          />
          <p>Colors are also represented as 3, 4, 6, or 8 digit hexadecimal numbers (With the hexadecimal prefix <code>#</code>).</p>
          <Code
            lang='css'
            $={(
              '#00FF00      same as rgb(0, 255, 0)\n' +
              '#0000FFCC    same as rgba(0%, 0%, 100%, 80%)\n' +
              '#123         same as #112233\n' +
              '#A54E        same as #AA5544EE'
            )}
          />
          <p>Some colors also have names</p>
          <Code
            lang='css'
            $={(
              'blue         same as #0000FF\n' +
              'chocolate    same as #D2691E'
            )}
          />
          <p>Other ways to specify a color include <code>hsl()</code>, <code>hsla()</code>, <code>hwb()</code>, and <code>gray()</code>.</p>
          <p>For the full color specification, see <a href='http://dev.w3.org/csswg/css-color-4/'>http://dev.w3.org/csswg/css-color-4/</a></p>

          <h3><code>@font-face</code></h3>
          <p>CSS also has a <code>@font-face</code> rule for defining new fonts to use.</p>
          <Code
            lang='css'
            $={(
              '@font-face {font-family: SexyFont; url("sexyfont.ttf");}'
            )}
          />
          <p>You can then use the font like</p>
          <Code
            lang='css'
            $={(
              'p.sexy {font-family: SexyFont;}'
            )}
          />

          <h3>Media queries</h3>
          <p>CSS also includes ways to detect what sort of device the website is being viewed on, using the <code>@media</code> rule. The only media query you need to know is detecting the size of the screen (useful for responsive design).</p>
          <Code
            lang='css'
            $={(
              '#potato {width: 50%;}\n' +
              '@media only screen and (max-width: 500px) {\n' +
              '  #potato {width: 100%;}\n' +
              '}'
            )}
          />
          <p><code>#potato</code> will have <code>width: 50%</code> unless the width of the screen is less than or equal to <code>500px</code>. In that case, <code>#potato</code> will have <code>width: 100%</code>.</p>
          <p>For a full list of media queries, see <a href='http://www.w3schools.com/cssref/css3_pr_mediaquery.asp'>http://www.w3schools.com/cssref/css3_pr_mediaquery.asp</a></p>
        </section>
      </>
    )
  }
}

export default registerBlog(CssInANutshell, '2015/03/08', 'CSS in a Nutshell')
