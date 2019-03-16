import React, { Component } from 'react'

import { registerBlog } from '../Blog.jsx'
import Footnotes from '../../../shared/Footnotes.jsx'
import $ from '../../../shared/Math.jsx'
import styles from './GodelsIncompletenessTheorems.scss'

class GodelsIncompletenessTheorems extends Component {
  render () {
    const { createFootnote, displayFootnotes } = new Footnotes()

    return (
      <>
        <h2>An Incomplete History of Logic</h2>
        <p>
          In the 18th and 19th century, the rapid expansion of exact sciences necessitated the creation for a general method to reason about and solve problems. Mathematicians utilized the axiomatic method used by ancient Greeks to create and analyze new branches of mathematics. Axioms of these systems were regarded to be self-evident. In the case of Euclidean geometry, the axioms modelled space, and the system was thus considered true and consistent. However, Euclid’s parallel axiom was not immediately self-evident like his first four, yet it was shown to still be independent of the others. This meant that different geometries, like Riemannian geometry, could be constructed by rejecting the parallel axiom.
        </p>
        <p>
          Riemannian geometry unravelled new and interesting theorems, but as a deviant to “true” Euclidean geometry, its consistency was no longer apparent. Fortunately, Riemannian geometry could be modelled by Euclidean geometry, and thus its consistency depends only on the consistency of Euclidean geometry. David Hilbert took it a step further and interpreted Euclid’s axioms into algebraic truths. This again only deferred the question of consistency by appealing to another axiomatic system. At the same time, as the formalization of mathematics created great variety and broader terms, the foundation of mathematics began to suffer from a lack of clarity made apparent by Russell’s paradox. So Hilbert proposed a program that contained a finite set of axioms to ground all of mathematics and contained an “absolute proof” of its own consistency.
        </p>
        <p>
          The first step towards an absolute proof of consistency involved the “complete formalization” of some deductive system. This system or calculus involved “signs” and “strings” of “signs” completely devoid of meaning, but could be manipulated into other “strings” in some well-defined manner. By analyzing the structure of a given calculus, Hilbert hoped to show that contradictory “strings” as defined by the system could not both be constructed. But in 1931, Kurt Gödel published his incompleteness theorems stating
        </p>
        <blockquote>
          <ol>
            <li>
              Any consistent formal system contains true statements that it cannot prove nor disprove.
            </li>
            <li>
              Any consistent formal system cannot prove its own consistency.
            </li>
          </ol>
        </blockquote>
        <p>
          This implied that such undertakings like Principia Mathematica by Alfred Whitehead and Bertrand Russell or Leibniz’s “universal mathematics” were flawed and impossible contrary to the general belief at the time.
        </p>
        <hr />
        <h2>On Formally Undecidable Propositions of <i>Principia Mathematica</i> and Related Systems</h2>
        <p>
          Gödel’s proof is applied to some calculus strong enough to describe arithmetic. In his original paper, Gödel used an adaptation of <i>Principia Mathematica</i>. The system assumed here is Hofstadter’s Typographical Number Theory (TNT).{createFootnote(<>The exact system is called <i>austere</i> TNT and is described in full in chapter 8 of <i>Gödel, Escher, Bach: an Eternal Golden Braid</i>.</>)} TNT contains 20 symbols, 5 axioms, 8 rules of inference, and it can codify all of arithmetic. For example, the phrase <span className={styles.statement}><$ $='x' /> is an even number</span> in TNT could be <span className={styles.statement}><$ $={`\\exists a' : (\\text{SS}0 \\cdot a') = a`} /></span> where <$ $='x' /> is represented by the free variable <$ $='a' />.
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
          where <$ $='p_i' /> indicates the <$ $='i' /><sup>th</sup> prime number. Thus the symbol <span className={styles.statement}><$ $='\sim' /></span> has Gödel number <$ $='2^{17} = 131,072' />. The statement <span className={styles.statement}><$ $='a = a' /></span> has Gödel number <$ $='2^{12} \cdot 3^{3} \cdot 5^{12} = 2.7 \times 10^{13}' />. Similarly, proofs, which are just sequences of statements, have unique Gödel numbers constructed the same way.{createFootnote(<>Every Gödel number is unique due to the fundamental theorem of arithmetic.</>, <>To make the Gödel number of a proof, an additional 21<sup>st</sup> symbol is needed to act as a punctuation mark delimiting each statement or line of a proof.</>)}
        </p>
        <p>
          Thus all the rules of inference which state which strings can be transformed into which strings, can be reinterpreted as statement about numbers, specifically the Gödel numbers of those strings. Every well defined operation on strings, has an equivalent well defined arithmetical operation on numbers. Subsequently, a proof with Gödel number <$ $='a' /> being a valid proof for a theorem with Gödel number <$ $={'a\''} /> represents some mathematical relationship between <$ $='a' /> and <$ $={'a\''} />{createFootnote(<>The process of checking if two Gödel numbers form a “proof-pair” involves 1) translating both numbers to their TNT-counterparts, 2) verifying that the last statement of the proof matches the theorem to be proved, 3) verifying that each statement in the proof is either an axiom or can be obtained by combining previous lines through valid rules. This algorithm is primitive recursive and is therefore provably representable in TNT.</>)} denoted as
        </p>
        <$ $$={'\\operatorname{Prf}_{\\text{TNT}}\\langle a, a\' \\rangle.'} />
        <p>
          TNT is now equipped to do some meta-mathematical introspection. The phrase <span className={styles.statement}><$ $='\text{$T$ is a theorem in TNT}' /></span> is logically equivalent to the TNT-statement <span className={styles.statement}><$ $={'\\exists a : \\operatorname{Prf}_{\\text{TNT}}\\langle a, \\operatorname{GN}(T) \\rangle'} />.</span>
        </p>
        <p>
          One last piece of machinery is required to complete the proof. Suppose <$ $='e' /> is a TNT-statement with one free variable <$ $='a' /> and has Gödel number <$ $={'a\''} />. The process of replacing all free variables with a specified constant <$ $={'a\'\''} /> results in a new statement whose Gödel number is denoted as
        </p>
        <$ $$={'\\operatorname{Sub}(a\', \\operatorname{GN}(\\text{“$a$”}), a\'\').'} />
        <p>
          Take for example the statement <span className={styles.statement}><$ $='a = a' /></span> with Gödel number <$ $='2^{12} \cdot 3^{3} \cdot 5^{12}' />. Then
        </p>
        <$ $$='\operatorname{Sub}(2^{12} \cdot 3^{3} \cdot 5^{12}, 2^{12}, 1) = 2^{2} \cdot 3^{1} \cdot 5^{3} \cdot 7^{2} \cdot 11^{1}.' />
        <p>
          This corresponds to replacing the free variable <span className={styles.statement}><$ $='a' /></span> with the numeral <span className={styles.statement}><$ $='\text{S}0' /></span> to obtain <span className={styles.statement}><$ $='\text{S}0 = \text{S}0' />.</span> This is again an arithmetical function describable by TNT.{createFootnote(<>The exact formulation of this function is extremely complex and is done in Gödel’s papers. Page 81 of <i>Gödel’s Proof</i> offers a brief attempt.</>)}
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
          This new statement called <$ $='G' /> has a Gödel number, and this number is equal to <$ $='\operatorname{Sub}(n, 2^{12}, n)' />. Furthermore, <$ $='G' /> is a statement in the calculus of TNT that represents the meta-mathematical statement <span className={styles.statement}>The statement whose Gödel number is <$ $='\operatorname{Sub}(n, 2^{12}, n)' /> is not a theorem in TNT</span> In other words, <span className={styles.statement}><$ $='\text{$G$ is not provable}' />.</span> Gödel further proved that <$ $='G' /> is provable if and only if its formal negation <$ $='{\sim}G' /> is provable.{createFootnote(<>This statement is a simpler, but stronger assertion than what Gödel actually proved. Gödel showed that if <$ $='G' /> is provable, then <$ $='{\sim}G' /> is provable; and if <$ $='{\sim}G' /> is provable, then arithmetic is <$ $='\omega' />-inconsistent.</>)} Since TNT is a consistent system,{createFootnote(<>Proving consistency of a system usually involves finding a formula in that system that cannot be proven, since if a system were inconsistent, then all formulas could be proven. In TNT, all axioms are tautological, and all rules of inference preserve tautologicalness. Thus the formula <span className={styles.statement}><$ $={'a = a\''} /></span> which is not a tautology, cannot be proven.</>)} neither <$ $='G' /> nor <$ $='{\sim}G' /> are provable. By meta-mathematical reasoning, this implies that <$ $='G' />, which asserts a definite numerical property of the natural numbers, is true. <$ $='G' /> is a true TNT-statement that cannot be proven in TNT.
        </p>
        <p>
          TNT is incomplete, and this proof is not unique to TNT. Even if <$ $='G' /> was added as an axiom to TNT to create TNT-<$ $='G' />, this new system has its own Gödel sentence <$ $='G_1' /> that is also true and not provable. Every consistent system is incomplete.
        </p>
        <hr />
        {displayFootnotes()}
      </>
    )
  }
}

export default registerBlog(GodelsIncompletenessTheorems, '2019/03/12', 'Gödel’s Incompleteness Theorems')