import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Blog from '../../src/blog/Blog'
import Section from '../../src/blog/Section'
import Footnotes from '../../src/Footnotes'
import { $, $$ } from '../../src/MathJax'

const useStyles = makeStyles(() => ({
  statement: {
    '& > span': {
      whiteSpace: 'nowrap'
    },
    '&::before': {
      content: '"“"',
      whiteSpace: 'nowrap'
    },
    '&::after': {
      content: '"”"',
      whiteSpace: 'nowrap'
    }
  }
}))

const GodelsIncompletenessTheorems = (): React.ReactElement => {
  const classes = useStyles()
  const { createReference, createFootnote } = new Footnotes()

  return (
    <Blog title='Gödel’s Incompleteness Theorems' date='2019/03/12'>
      <Section title='An Incomplete History of Logic'>
        <Typography paragraph>
          In the 18th and 19th century, the rapid expansion of exact sciences necessitated the creation for a general method to reason about and solve problems. Mathematicians utilized the axiomatic method used by ancient Greeks to create and analyze new branches of mathematics. Axioms of these systems were regarded to be self-evident. In the case of Euclidean geometry, the axioms modelled space, and the system was thus considered true and consistent. However, Euclid’s parallel axiom was not immediately self-evident like his first four, yet it was shown to still be independent of the others. This meant that different geometries, like Riemannian geometry, could be constructed by rejecting the parallel axiom.
        </Typography>
        <Typography paragraph>
          Riemannian geometry unravelled new and interesting theorems, but as a deviant to “true” Euclidean geometry, its consistency was no longer apparent. Fortunately, Riemannian geometry could be modelled by Euclidean geometry, and thus its consistency depends only on the consistency of Euclidean geometry. David Hilbert took it a step further and interpreted Euclid’s axioms into algebraic truths. This again only deferred the question of consistency by appealing to another axiomatic system. At the same time, as the formalization of mathematics created great variety and broader terms, the foundation of mathematics began to suffer from a lack of clarity made apparent by Russell’s paradox. So Hilbert proposed a program that contained a finite set of axioms to ground all of mathematics and contained an “absolute proof” of its own consistency.
        </Typography>
        <Typography paragraph>
          The first step towards an absolute proof of consistency involved the “complete formalization” of some deductive system. This system or calculus involved “signs” and “strings” of “signs” completely devoid of meaning, but could be manipulated into other “strings” in some well-defined manner. By analyzing the structure of a given calculus, Hilbert hoped to show that contradictory “strings” as defined by the system could not both be constructed. But in 1931, Kurt Gödel published his incompleteness theorems stating
        </Typography>
        <blockquote>
          <ol>
            <Typography component='li'>
              Any consistent formal system contains true statements that it cannot prove nor disprove.
            </Typography>
            <Typography component='li'>
              Any consistent formal system cannot prove its own consistency.
            </Typography>
          </ol>
        </blockquote>
        <Typography paragraph>
          This implied that such undertakings like <i>Principia Mathematica</i> by Alfred Whitehead and Bertrand Russell or Leibniz’s “universal mathematics” were flawed and impossible contrary to the general belief at the time.
        </Typography>
      </Section>

      <Section title={<Typography variant='h2' gutterBottom>On Formally Undecidable Propositions of <i>Principia Mathematica</i> and Related Systems</Typography>}>
        <Typography paragraph>
          Gödel’s proof is applied to some system strong enough to describe arithmetic. In his original paper, Gödel used an adaptation of <i>Principia Mathematica</i>. The system assumed here is Hofstadter’s Typographical Number Theory (TNT).{createReference('tnt')} TNT contains 20 symbols, 5 axioms, 8 rules of inference, and it can codify all of arithmetic. For example, the phrase <span className={classes.statement}>{$('x')} is an even number</span> in TNT could be <span className={classes.statement}>{$('\\exists a\' : (\\text{SS}0 \\cdot a\') = a')}</span> where {$('x')} is represented by the free variable {$('a')}.
        </Typography>
        <Typography>
          The first step is to assign a unique code number to each symbol as in the following table:
        </Typography>
        {$$(`
          \\begin{array}{c}
            0 & \\text{S} & = & + & \\cdot & ( & ) & \\langle & \\rangle & [ \\\\
            1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\\\
            \\\\
            ] & a & ' & \\land & \\lor & \\supset & \\sim & \\exists & \\forall & : \\\\
            11 & 12 & 13 & 14 & 15 & 16 & 17 & 18 & 19 & 20
          \\end{array}
        `)}
        <Typography>
          Then for any sequence {$('\\varphi')} of symbols {$('s_1, \\ldots, s_k')} with corresponding code numbers {$('c_1, \\ldots, c_k')}, let the Gödel number for {$('\\varphi')} be
        </Typography>
        {$$('\\ulcorner\\varphi\\urcorner = 2^{c_1} \\times 3^{c_2} \\times 5^{c_3} \\times \\cdots \\times \\pi_k^{c_k} = \\prod_{i=1}^k \\pi_i^{c_i}')}
        <Typography paragraph>
          where {$('\\pi_i')} indicates the {$('i')}<sup>th</sup> prime number.{createReference('gnn')} Thus the symbol <span className={classes.statement}>{$('\\sim')}</span> has Gödel number {$('2^{17} = 131,072')}. The statement <span className={classes.statement}>{$('a = a')}</span> has Gödel number {$('2^{12} \\cdot 3^{3} \\cdot 5^{12} = 2.7 \\times 10^{13}')}. Similarly, proofs, which are just sequences of statements, have unique Gödel numbers constructed the same way.{createReference('gnu', 'gnp')}
        </Typography>
        <Typography>
          Thus all the rules of inference which state which strings can be transformed into which strings, can be reinterpreted as statements about numbers, specifically the Gödel numbers of those strings. Every well defined operation on strings, has an equivalent well defined arithmetical{createReference('art')} operation on numbers. Subsequently, a proof with Gödel number {$('a')} being a valid proof for a theorem with Gödel number {$('a\'')} represents some arithmetical relationship between {$('a')} and {$('a\'')}{createReference('ppa')} denoted as
        </Typography>
        {$$('\\operatorname{Prf}_{\\text{TNT}}\\langle a, a\' \\rangle.')}
        <Typography paragraph>
          TNT is now equipped to do some meta-mathematical introspection. The phrase <span className={classes.statement}>{$('\\varphi')} is a theorem in TNT</span> is logically equivalent to the TNT-statement <span className={classes.statement}>{$('\\exists a : \\operatorname{Prf}_{\\text{TNT}}\\langle a, \\ulcorner\\varphi\\urcorner \\rangle')}.</span>
        </Typography>
        <Typography>
          One last piece of machinery is required to complete Gödel’s proof. Suppose {$('\\varphi')} is a TNT-statement with one free variable {$('a')}. The process of replacing all instances of {$('a')} with a specified constant {$('a\'')} results in a new statement whose Gödel number is denoted as
        </Typography>
        {$$('\\operatorname{Sub}(\\ulcorner\\varphi\\urcorner, \\ulcorner a \\urcorner, a\').')}
        <Typography>
          Take for example the statement <span className={classes.statement}>{$('a = a')}</span> with Gödel number {$('2^{12} \\cdot 3^{3} \\cdot 5^{12}')}. Then
        </Typography>
        {$$('\\operatorname{Sub}(\\overbrace{\\text{S $\\cdots$ S}}^{\\llap{\\large{2^{12} \\cdot}\\rlap{3^{3} \\cdot 5^{12}}}}0, \\overbrace{\\text{S $\\cdots$ S}}^{\\large{2^{12}}}0, \\text{S}0) = 2^{2} \\cdot 3^{1} \\cdot 5^{3} \\cdot 7^{2} \\cdot 11^{1}.')}
        <Typography paragraph>
          This corresponds to replacing the free variable <span className={classes.statement}>{$('a')}</span> with the numeral <span className={classes.statement}>{$('\\text{S}0')}</span> to obtain <span className={classes.statement}>{$('\\text{S}0 = \\text{S}0')}.</span> This is again an arithmetical function describable by TNT.{createReference('sba')}
        </Typography>
        <Typography>
          Now we can consider the statement
        </Typography>
        {$$('\\forall a\' : {\\sim}\\operatorname{Prf}_{\\text{TNT}}\\langle a\', \\operatorname{Sub}(a, \\overbrace{\\text{S $\\cdots$ S}}^{\\large{2^{12}}}0, a) \\rangle')}
        <Typography>
          with Gödel number {$('n')}. Replacing the free variable {$('a')} with the number {$('n')} results in
        </Typography>
        {$$('\\forall a\' : {\\sim}\\operatorname{Prf}_{\\text{TNT}}\\langle a\', \\operatorname{Sub}(\\overbrace{\\text{S $\\cdots$ S}}^{\\large{n}}0, \\overbrace{\\text{S $\\cdots$ S}}^{\\large{2^{12}}}0, \\overbrace{\\text{S $\\cdots$ S}}^{\\large{n}}0) \\rangle.')}
        <Typography paragraph>
          This new statement called {$('G')} has a Gödel number, and this number is equal to {$('\\operatorname{Sub}(n, 2^{12}, n)')}. Furthermore, {$('G')} is a statement in the system of TNT that represents the meta-mathematical statement <span className={classes.statement}>The statement whose Gödel number is {$('\\operatorname{Sub}(n, 2^{12}, n)')} is not a theorem in TNT.</span> In other words, {$('G')} says, <span className={classes.statement}>{$('\\text{$G$ is not provable}')}.</span> Gödel further proved that {$('G')} is provable if and only if its formal negation {$('{\\sim}G')} is provable.{createReference('gng')} Since TNT is a consistent system,{createReference('icp')} neither {$('G')} nor {$('{\\sim}G')} are provable. By meta-mathematical reasoning, this implies that {$('G')}, which asserts a definite numerical property of the natural numbers, is true. {$('G')} is a true TNT-statement that cannot be proven in TNT.
        </Typography>
        <Typography paragraph>
          TNT is incomplete,{createReference('inc')} and this proof is not unique to TNT. Even if {$('G')} was added as an axiom to TNT to create TNT-{$('G')}, this new system has its own Gödel sentence {$('G_1')} that is also true and not provable. Every consistent system is incomplete.
        </Typography>
      </Section>

      <Section>
        {createFootnote({
          tnt: (
            <Typography variant='body2'>
              The exact system is called <i>austere</i> TNT and is described in full in Chapter 8 of <i>Gödel, Escher, Bach: an Eternal Golden Braid</i>.
            </Typography>
          ),
          gnn: (
            <Typography variant='body2'>
              For a system of {$('n')} symbols, it’s common to just assign each symbol a single base {$('n')} numeral. Then for any string of symbols, replace each by its corresponding base {$('n')} numeral, and the resulting base {$('n')} number is the Gödel number for that string. The numeral {$('0')} must be assigned to a symbol that can never appear first in a valid formula of the system. For TNT, Hofstadter assigns each symbol a 3-digit “codon,” and Gödel numbers are constructed by concatenating codons into a single base 10 number.
            </Typography>
          ),
          gnu: (
            <Typography variant='body2'>
              Every Gödel number is unique due to the fundamental theorem of arithmetic.
            </Typography>
          ),
          gnp: (
            <Typography variant='body2'>
              To make the Gödel number of a proof, an additional 21<sup>st</sup> symbol is needed to act as a punctuation mark delimiting each statement or line of a proof. Alternatively, the standard method is to translate the sequence of statements into a sequence of their Gödel numbers {$('g_1, \\ldots, g_k')}, and let the “super Gödel number” of the sequence to be {$('\\prod_{i=1}^k \\pi_i^{g_i}')}.
            </Typography>
          ),
          art: (
            <Typography variant='body2'>
              “arithMETical” is used in place of “arithMETic” to distinguish it from “aRITHmetic” as is used elsewhere.
            </Typography>
          ),
          ppa: (
            <Typography variant='body2'>
              The process of checking if two Gödel numbers form a “proof-pair” involves 1) translating both numbers to their TNT-counterparts, 2) verifying that the last statement of the proof matches the theorem to be proved, and 3) verifying that each statement in the proof is either an axiom or can be obtained by combining previous lines through valid rules. This algorithm is primitive recursive and is therefore provably representable in TNT.
            </Typography>
          ),
          sba: (
            <Typography variant='body2'>
              The exact formulation of this function is extremely complex and is done in Gödel’s papers. Page 81 of <i>Gödel’s Proof</i> offers a brief attempt.
            </Typography>
          ),
          gng: (
            <Typography variant='body2'>
              This statement is a simpler, but stronger assertion than what Gödel actually proved. Gödel showed that if {$('G')} is provable, then {$('{\\sim}G')} is provable; and if {$('{\\sim}G')} is provable, then arithmetic is <span style={{ whiteSpace: 'nowrap' }}>{$('\\omega')}-inconsistent</span>.
            </Typography>
          ),
          icp: (
            <Typography variant='body2'>
              Proving consistency of a system usually involves finding a formula in that system that cannot be proven, since if a system were inconsistent, then all formulas could be proven. In TNT, all axioms are tautological, and all rules of inference preserve tautologicalness. Thus the formula <span className={classes.statement}>{$('a = a\'')}</span> which is not a tautology, cannot be proven.
            </Typography>
          ),
          inc: (
            <Typography variant='body2'>
              TNT is <i>syntactically</i> incomplete. A system is syntactically complete if for every sentence {$('\\varphi')} of the system, either {$('\\varphi')} or {$('{\\sim}\\varphi')} is a theorem. This property is also called Gödel completeness.
            </Typography>
          )
        })}
      </Section>

      <Section title='References'>
        <Typography paragraph>
          Berto, Francesco. <i>There’s Something about Gödel: the Complete Guide to the Incompleteness Theorem</i>. Wiley-Blackwell, 2009.
        </Typography>
        <Typography paragraph>
          Detlefsen, Michael. “Completeness and the ends of axiomatization.” <i>Interpreting Gödel</i>. Ed. Juliette Kennedy. Cambridge: Cambridge UP, 2014.
        </Typography>
        <Typography paragraph>
          Hofstadter, Douglas R. <i>Gödel, Escher, Bach: An Eternal Golden Braid</i>. New York: Basic Books, Inc., 1979.
        </Typography>
        <Typography paragraph>
          Nagel, Ernest, and James R. Newman. <i>Gödel's Proof</i>. New York: New York UP, 1958.
        </Typography>
        <Typography paragraph>
          Smith, Peter. <i>An Introduction to Gödel’s Theorems</i>. 2nd ed., Cambridge University Press, 2013.
        </Typography>
        <Typography paragraph>
          Smullyan, Raymond M. <i>Gödel’s Incompleteness Theorems</i>. Oxford University Press, 1992.
        </Typography>
        <Typography paragraph>
          Styazhkin, N. I. <i>History of Mathematical Logic from Leibniz to Peano</i>. Cambridge: The M.I.T. P, 1969.
        </Typography>
      </Section>
    </Blog>
  )
}

export default GodelsIncompletenessTheorems
