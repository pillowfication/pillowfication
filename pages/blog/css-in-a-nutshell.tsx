import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Alert from '@material-ui/lab/Alert'
import Blog from '../../src/blog/Blog'
import Section from '../../src/blog/Section'
import Highlight from '../../src/Highlight'

const CSSInANutshell = (): React.ReactElement => {
  return (
    <Blog title='CSS in a Nutshell' date='2015/03/08'>
      <Section>
        <Alert severity='info'>
          This article is old and may contain information or advice that is deprecated.
        </Alert>
      </Section>
      <Section>
        <Typography paragraph>CSS stands for Cascading Style Sheet and is pretty much just a list of rules that govern how an HTML page appears. A rule in CSS looks like:</Typography>
        <Highlight language='css'>
          {'selector {property: value;}'}
        </Highlight>
        <Typography paragraph><code>selector</code> determines which elements the rules apply to. The most important selectors are <code>element</code>, <code>.class</code>, and <code>#id</code>. A selector of h1 would apply to all <code>{'<h1>'}</code> tags, and a selector of <code>#potato</code> would apply to all elements with <code>id="potato"</code>.</Typography>

        <Typography paragraph>You can also chain selectors together in several ways</Typography>
        <Highlight language='css'>
          {`
p#id.class1.class2    All <p> with id="id" AND class="class1 class2"
div p b               All <b> that is a child of a <p> that is a child of a <div>
body > div            All <div> that is a direct child of a <body>
h1, h2, h3            All <h1>, and all <h2>, and all <h3>
          `.trim()}
        </Highlight>

        <Typography paragraph>There are also pseudo-classes that are prefixed with a colon. For example, <code>:hover</code> is a pseudo-class that is applied onto an element when the user’s mouse is over it.</Typography>
        <Highlight language='css'>
          {`
a:hover               All <a> that have a mouse hovering over them
          `.trim()}
        </Highlight>

        <Typography paragraph>There are also pseudo-elements that are prefixed with a double colon. For example, <code>::first-letter</code> corresponds to the pseudo-element that is the first letter of another element.</Typography>
        <Highlight language='css'>
          {`
p::first-letter       All ::first-letter’s of all <Typography paragraph> elements
          `.trim()}
        </Highlight>
        <Typography paragraph>For a list of all CSS selectors: <Link href='http://www.w3schools.com/cssref/css_selectors.asp'>http://www.w3schools.com/cssref/css_selectors.asp</Link></Typography>

        <Typography paragraph>Another important aspect of CSS selectors has to do with precedence (a.k.a. specificity). Suppose you had the following element in HTML</Typography>
        <Highlight language='html'>
          {'<div id="potato"> ... </div>'}
        </Highlight>
        <Typography paragraph>Coupled with the following CSS</Typography>
        <Highlight language='css'>
          {`
div        {color: red;}
div#potato {color: blue;}
          `.trim()}
        </Highlight>
        <Typography paragraph>Our <code>{'<div id="potato">'}</code> would appear blue and not red, because <code>div#potato</code> takes precedence over <code>div</code>. Generally, the more specific rule always takes precedence and</Typography>
        <Highlight>
          {'inline CSS > #id > .class > element'}
        </Highlight>
        <Typography paragraph>in terms of precedence. (This idea of precedence is what “Cascading” in CSS refers to). When two or more rules with the same precedence are defined for an object, the rule defined latest will be used.</Typography>
        <Typography paragraph>For a more extensive understanding of precedence: <Link href='http://www.vanseodesign.com/css/css-specificity-inheritance-cascaade/'>http://www.vanseodesign.com/css/css-specificity-inheritance-cascaade/</Link></Typography>

        <Typography paragraph>Now that selectors are all taken care of, let’s talk about the <code>{'{property: value;}'}</code> portion of a CSS rule. <code>property</code> is any one of many properties an element can have. (Not all elements support the same properties. Only <code>{'<ul>'}</code> and <code>{'<ol>'}</code> support the <code>list-style-type</code> property). <code>value</code> is whatever values the property can take on. Every property-value pair should end with a semicolon (this is optional for the very last pair)</Typography>
        <Highlight language='css'>
          {'p.error {color: red; font-weight: bold; font-size: 16px}'}
        </Highlight>
        <Typography paragraph>Each property usually takes on only one value, but some allow for multiple values. The values must be comma separated.</Typography>
        <Highlight language='css'>
          {'font-family: "Times New Roman", Georgia, serif;'}
        </Highlight>
        <Typography paragraph>(Note: values that contain spaces must be enclosed in quotes). In the above line, CSS would first try to apply <code>font-family: "Times New Roman"</code>, but if the font <code>"Times New Roman"</code> doesn’t exist, then it will fallback to <code>font-family: Georgia</code>, and if that doesn’t work either, it will finally try <code>font-family: serif</code>.</Typography>

        <Typography paragraph>CSS also includes shorthand properties which are used to set multiple properties at once. The values of shorthand properties are space separated.</Typography>
        <Highlight language='css'>
          {'margin: 60px 20px;'}
        </Highlight>
        <Typography paragraph>Is exactly equivalent to</Typography>
        <Highlight language='css'>
          {`
margin-top: 60px;
margin-right: 20px;
margin-bottom: 60px;
margin-left: 20px;
          `.trim()}
        </Highlight>
        <Typography paragraph>For a list of all CSS properties: <Link href='http://www.w3schools.com/cssref/'>http://www.w3schools.com/cssref/</Link></Typography>
      </Section>

      <Section title='CSS misc.'>
        <h3><code>inherit</code> and <code>initial</code></h3>
        <Typography paragraph>All properties can take on a value of <code>inherit</code> and <code>initial</code>. <code>inherit</code> will cause the property to inherit its value from its parent element. <code>initial</code> will cause the property to use its default value. Sometimes this default value may vary depending on the browser.</Typography>

        <h3><code>!important</code></h3>
        <Typography paragraph>All values can be given the <code>!important</code> flag, which pretty much overrides all orders of precedence. For example</Typography>
        <Highlight language='css'>
          {'.error {color: red !important;}'}
        </Highlight>
        <Typography paragraph>will cause any element with <code>class="error"</code> to be displayed as red regardless of any other rules. Please try to avoid using this flag.</Typography>

        <h3>Vendor prefixes</h3>
        <Typography paragraph>When a browser implements a property that is not in the CSS spec, or is part of a CSS spec that is experimental or subject to change, then they will usually attach a vendor prefix to that property value. (Unprefixed properties are guaranteed not to change). For example, <code>column-rule</code> is a fairly new property, and some browsers haven’t implemented it yet, but do include the vendor-prefixed versions. So to use <code>column-rule</code>, it would look something like</Typography>
        <Highlight language='css'>
          {`
column-rule: 3px outset blue;           For browsers that support this
-webkit-column-rule: 3px outset blue;   For webkit browsers
-moz-column-rule: 3px outset blue;      For Mozilla
          `.trim()}
        </Highlight>
        <Typography paragraph>Generally, using vendor prefixes are unnecessary, and having to include them may cause discrepancies between browsers. But for standardized CSS3 properties like <code>border-radius</code>, it may be good to also include their vendor prefixed counterparts to support older browsers.</Typography>

        <h3>Units</h3>
        <Typography paragraph>There are two types of CSS units: Absolute and Relative. Absolute units appear the same size no matter what device you are on. Avoid using these units since screen size can vary drastically.</Typography>
        <blockquote>
          Absolute: <code>mm</code>, <code>cm</code>, <code>in</code>, <code>pt</code>
        </blockquote>
        <Typography paragraph>Relative units are measured relative to the screen or relative to another element.</Typography>
        <blockquote>
          Relative: <code>%</code>, <code>px</code>, <code>em</code>, <code>rem</code>
        </blockquote>
        <Typography paragraph>The <code>%</code> unit is measured relative to the parent element. The <code>px</code> unit corresponds to pixels on the screen. (Not exactly. There’s a slight difference between a CSS pixel and a screen pixel. See <Link href='http://www.quirksmode.org/blog/archives/2010/04/a_pixel_is_not.html'>http://www.quirksmode.org/blog/archives/2010/04/a_pixel_is_not.html</Link>). The <code>em</code> unit is measured relative to the font size of the parent element. The <code>rem</code> unit is measured relative to the font size of the <code>{'<html>'}</code> element (the root element).</Typography>

        <Typography paragraph>If we had the following HTML structure</Typography>
        <Highlight language='html'>
          {`
<html>
...
  <div id="outer">
    <div id="inner">
    </div>
  </div>
...
</html>
          `.trim()}
        </Highlight>
        <Typography paragraph>And the following CSS</Typography>
        <Highlight language='css'>
          {`
html   {font-size: 10px;}
#outer {font-size: 2em;}    // font-size: 20px
#inner {font-size: 1em;}    // font-size: 20px
          `.trim()}
        </Highlight>
        <Typography paragraph>Then <code>#outer</code> would have a font size twice the size of its parent, and <code>#inner</code> would have a font size equal to its parent. If we used <code>rem</code> instead</Typography>
        <Highlight language='css'>
          {`
html   {font-size: 10px;}
#outer {font-size: 2rem;}    // font-size: 20px
#inner {font-size: 1rem;}    // font-size: 10px
          `.trim()}
        </Highlight>
        <Typography paragraph><code>#outer</code> would have a font size twice that of the root element, and <code>#inner</code> would have a font size equal to that of the root element.</Typography>

        <Typography paragraph>Browsers also allow using <code>calc()</code> as a CSS unit.</Typography>
        <Highlight language='css'>
          {'div.potato {width: calc(50%+20em);}'}
        </Highlight>
        <Typography paragraph>For browser compatibility, see <Link href='http://caniuse.com/#feat=calc'>http://caniuse.com/#feat=calc</Link></Typography>

        <h3>Colors</h3>
        <Typography paragraph>A color can be represented using <code>rgb()</code></Typography>
        <Highlight language='css'>
          {`
rgb(0, 100, 255)        integer values from 0 to 255
rgb(5%, 50%, 0%)        percentages from 0% to 100%
rgb(0.0, 70.5, 10.0)    float values from 0.0 to 100.0 corresponding to percentages
          `.trim()}
        </Highlight>
        <Typography paragraph>You can also use <code>rgba()</code>. The first 3 parameters correspond to <code>rgb()</code> as above, and the 4th parameter is a float or percentage value corresponding to the alpha of the color.</Typography>
        <Highlight language='css'>
          {`
rgba(50, 20, 200, .5)
rgba(50.0, 100.0, 0.0, 90%)
          `.trim()}
        </Highlight>
        <Typography paragraph>Colors are also represented as 3, 4, 6, or 8 digit hexadecimal numbers (With the hexadecimal prefix <code>#</code>).</Typography>
        <Highlight language='css'>
          {`
#00FF00      same as rgb(0, 255, 0)
#0000FFCC    same as rgba(0%, 0%, 100%, 80%)
#123         same as #112233
#A54E        same as #AA5544EE
          `.trim()}
        </Highlight>
        <Typography paragraph>Some colors also have names</Typography>
        <Highlight language='css'>
          {`
blue         same as #0000FF
chocolate    same as #D2691E
          `.trim()}
        </Highlight>
        <Typography paragraph>Other ways to specify a color include <code>hsl()</code>, <code>hsla()</code>, <code>hwb()</code>, and <code>gray()</code>.</Typography>
        <Typography paragraph>For the full color specification, see <Link href='http://dev.w3.org/csswg/css-color-4/'>http://dev.w3.org/csswg/css-color-4/</Link></Typography>

        <h3><code>@font-face</code></h3>
        <Typography paragraph>CSS also has a <code>@font-face</code> rule for defining new fonts to use.</Typography>
        <Highlight language='css'>
          {'@font-face {font-family: SexyFont; url("sexyfont.ttf");}'}
        </Highlight>
        <Typography paragraph>You can then use the font like</Typography>
        <Highlight language='css'>
          {'p.sexy {font-family: SexyFont;}'}
        </Highlight>

        <h3>Media queries</h3>
        <Typography paragraph>CSS also includes ways to detect what sort of device the website is being viewed on, using the <code>@media</code> rule. The only media query you need to know is detecting the size of the screen (useful for responsive design).</Typography>
        <Highlight language='css'>
          {`
#potato {width: 50%;}
@media only screen and (max-width: 500px) {
  #potato {width: 100%;}
}
          `.trim()}
        </Highlight>
        <Typography paragraph><code>#potato</code> will have <code>width: 50%</code> unless the width of the screen is less than or equal to <code>500px</code>. In that case, <code>#potato</code> will have <code>width: 100%</code>.</Typography>
        <Typography paragraph>For a full list of media queries, see <Link href='http://www.w3schools.com/cssref/css3_pr_mediaquery.asp'>http://www.w3schools.com/cssref/css3_pr_mediaquery.asp</Link></Typography>
      </Section>
    </Blog>
  )
}

export default CSSInANutshell
