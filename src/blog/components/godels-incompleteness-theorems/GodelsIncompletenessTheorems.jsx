import React, { Component } from 'react'

import { registerBlog } from '../Blog.jsx'
import $ from '../../../shared/Math.jsx'

class GodelsIncompletenessTheorems extends Component {
  render () {
    return (
      <>
        <p>
          Gödel’s proof is applied to some calculus strong enough to describe arithmetic. In his original paper, Gödel used an adaptation of <i>Principia Mathematica</i>. The system assumed here is Hofstadter’s Typographical Number Theory (<$ $='\text{TNT}' />).<sup>1</sup> <$ $='\text{TNT}' /> contains 20 symbols, 5 axioms, 8 rules of inference, and it can codify all of arithmetic. For example, the phrase “<$ $='\text{$x$ is an even number}' />” in <$ $='\text{TNT}' /> could be “<$ $={`\\exists a' : (\\text{SS}0 \\cdot a') = a`} />” where <$ $='x' /> is represented by the free variable <$ $={'a'} />.
        </p>
        <p>
          The first step is to assign a unique code number to each symbol as in the following table:
        </p>
        <$ $$={`
          \\begin{array}{}
            0 & \\text{S} & = & + & \\cdot & ( & ) & \\langle & \\rangle & [ & ] & a & ' & \\land & \\lor & \\supset & \\sim & \\exists & \\forall & : \\\\
            1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 & 13 & 14 & 15 & 16 & 17 & 18 & 19 & 20
          \\end{array}
        `} />
        <p>
          Then for any sequence <$ $='e' /> of symbols <$ $='s_1, \ldots, s_k' /> with corresponding code numbers <$ $='c_1, \ldots, c_k' />, let the Gödel number for <$ $='e' /> be
        </p>
        <$ $$='\operatorname{GN}(e) = 2^{c_1} \times 3^{c_2} \times 5^{c_3} \times \cdots \times p_k^{c_k} = \prod_{i=1}^k p_i^{c_i}' />
        <p>
          where <$ $='p_i' /> indicates the <$ $='i' /><sup>th</sup> prime number. Thus the symbol “<$ $='\sim' />” has Gödel number <$ $='2^{17} = 131,072' />. The statement “<$ $='a = a' />” has Gödel number <$ $='2^{12} \cdot 3^{3} \cdot 5^{12} = 2.7 \times 10^{13}' />. Similarly, proofs, which are just sequences of statements, have unique Gödel numbers constructed the same way.<sup>2,3</sup>
        </p>
        <p>
          Thus all the rules of inference which state which strings can be transformed into which strings, can be reinterpreted as statement about numbers, specifically the Gödel numbers of those strings. Every well defined operation on strings, has an equivalent well defined arithmetical operation on numbers. Subsequently, a proof with Gödel number <$ $='a' /> being a valid proof for a theorem with Gödel number <$ $={'a\''} /> represents some mathematical relationship between <$ $='a' /> and <$ $={'a\''} /><sup>4</sup> denoted as
        </p>
        <$ $$={'\\operatorname{Prf}_{\\text{TNT}}\\langle a, a\' \\rangle.'} />
        <p>
          <$ $='\text{TNT}' /> is now equipped to do some meta-mathematical introspection. The phrase “<$ $='\text{$T$ is a theorem in TNT}' />” is logically equivalent to the <$ $='\text{TNT}' />-statement “<$ $={'\\exists a : \\operatorname{Prf}_{\\text{TNT}}\\langle a, \\operatorname{GN}(T) \\rangle'} />.”
        </p>
        <p>
          One last piece of machinery is required to complete the proof. Suppose <$ $='e' /> is a <$ $='\text{TNT}' />-statement with one free variable <$ $='a' /> and has Gödel number <$ $={'a\''} />. The process of replacing all free variables with a specified constant <$ $={'a\'\''} /> results in a new statement whose Gödel number is denoted as
        </p>
        <$ $$={'\\operatorname{Sub}(a\', \\operatorname{GN}(\\text{“$a$”}), a\'\').'} />
        <p>
          Take for example the statement “<$ $='a = a' />” with Gödel number <$ $='2^{12} \cdot 3^{3} \cdot 5^{12}' />. Then
        </p>
        <$ $$='\operatorname{Sub}(2^{12} \cdot 3^{3} \cdot 5^{12}, 2^{12}, 1) = 2^{2} \cdot 3^{1} \cdot 5^{3} \cdot 7^{2} \cdot 11^{1}.' />
        <p>
          This corresponds to replacing the free variable “<$ $='a' />” with the numeral “<$ $='\text{S}0' />” to obtain “<$ $='\text{S}0 = \text{S}0' />.” This is again an arithmetical function describable by <$ $='\text{TNT}' />.<sup>5</sup>
        </p>
        <p>
          Now we can consider the statement
        </p>
        <$ $$={'\\forall a\' : {\\sim}\\operatorname{Prf}_{\\text{TNT}}\\langle a\', \\operatorname{Sub}(a, \\overbrace{\\text{S $\\cdots$ S}}^{\\large{2^{12}}}0, a) \\rangle'} />
        <p>
          with Gödel number <$ $='n' />. Replacing the free variable <$ $='a' /> with the number <$ $='n' /> results in
        </p>
        <$ $$={'\\forall a\' : {\\sim}\\operatorname{Prf}_{\\text{TNT}}\\langle a\', \\operatorname{Sub}(\\overbrace{\\text{S $\\cdots$ S}}^{\\large{n}}0, \\overbrace{\\text{S $\\cdots$ S}}^{\\large{2^{12}}}0, \\overbrace{\\text{S $\\cdots$ S}}^{\\large{n}}0) \\rangle.'} />
        <p>
          This new statement called <$ $='G' /> has a Gödel number, and this number is equal to <$ $='\operatorname{Sub}(n, 2^{12}, n)' />. Furthermore, <$ $='G' /> is a statement in the calculus of <$ $='\text{TNT}' /> that represents the meta-mathematical statement “<$ $='\text{The statement whose Gödel number is $\operatorname{Sub}(n, 2^{12}, n)$ is not a theorem in TNT}' />.” In other words, “<$ $='\text{$G$ is not provable}' />.” Gödel further proved that <$ $='G' /> is provable if and only if its formal negation <$ $='{\sim}G' /> is provable.<sup>6</sup> Since <$ $='\text{TNT}' /> is a consistent system,<sup>7</sup> neither <$ $='G' /> nor <$ $='{\sim}G' /> are provable. By meta-mathematical reasoning, this implies that <$ $='G' />, which asserts a definite numerical property of the natural numbers, is true. <$ $='G' /> is a true <$ $='\text{TNT}' />-statement that cannot be proven in <$ $='\text{TNT}' />.
        </p>
        <p>
          <$ $='\text{TNT}' /> is incomplete, and this proof is not unique to <$ $='\text{TNT}' />. Even if <$ $='G' /> was added as an axiom to <$ $='\text{TNT}' /> to create <$ $='\text{TNT}' />-<$ $='G' />, this new system has its own Gödel sentence <$ $='G_1' /> that is also true and not provable. Every consistent system is incomplete.
        </p>
        <hr />
        <small>
          <ol>
            <li>
              The exact system is called <i>austere</i> <$ $='\text{TNT}' /> and is described in full in chapter 8 of <i>Gödel, Escher, Bach: an Eternal Golden Braid</i>.
            </li>
            <li>
              Every Gödel number is unique due to the fundamental theorem of arithmetic.
            </li>
            <li>
              To make the Gödel number of a proof, an additional 21<sup>st</sup> symbol is needed to act as a punctuation mark delimiting each statement or line of a proof.
            </li>
            <li>
              The process of checking if two Gödel numbers form a “proof-pair” involves 1) translating both numbers to their <$ $='\text{TNT}' />-counterparts, 2) verifying that the last statement of the proof matches the theorem to be proved, 3) verifying that each statement in the proof is either an axiom or can be obtained by combining previous lines through valid rules. This algorithm is primitive recursive and is therefore provably representable in <$ $='\text{TNT}' />.
            </li>
            <li>
              The exact formulation of this function is extremely complex and is done in Gödel’s papers. Page 81 of <i>Gödel’s Proof</i> offers a brief attempt.
            </li>
            <li>
              This statement is a simpler, but stronger assertion than what Gödel actually proved. Gödel showed that if <$ $='G' /> is provable, then <$ $='{\sim}G' /> is provable; and if <$ $='{\sim}G' /> is provable, then arithmetic is <$ $='\omega' />-inconsistent.
            </li>
            <li>
              Proving consistency of a system usually involves finding a formula in that system that cannot be proven, since if a system were inconsistent, then all formulas could be proven. In <$ $='\text{TNT}' />, all axioms are tautological, and all rules of inference preserve tautologicalness. Thus the formula “<$ $={'a = a\''} />” which is not a tautology, cannot be proven.
            </li>
          </ol>
        </small>
      </>
    )
  }
}

export default registerBlog(GodelsIncompletenessTheorems, '2019/03/12', 'Gödel’s Incompleteness Theorems')
