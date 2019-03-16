import React, { Component } from 'react'

import { registerBlog } from '../Blog.jsx'
import $ from '../../../shared/Math.jsx'
import styles from './SwapSorting.scss'

class SwapSorting extends Component {
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.definition}>
          <p>
            A <b>list</b> of length <$ $='n' /> is defined as any bijective function <$ $='f: \Bbb{N}^n \to \Bbb{N}^n' /> where <$ $='\Bbb{N}^n = \{ 1,\ 2,\ \ldots,\ n \}' />. A <b>swap</b> on a list <$ $='f' /> at two indices <$ $='1 \leq i, j \leq n' /> denoted <$ $='\operatorname{swap}_f(i, j)' /> results in another list defined by
          </p>
          <$ $$={`
            \\operatorname{swap}_f(i, j)(x) =
            \\begin{cases}
              f(x),&x \\neq i, j\\\\
              f(j),&x = i\\\\
              f(i),&x = j.
            \\end{cases}
          `} />
        </div>
        <p>
          Since a list is bijective, any swap on a list results in a bijection and is a list. The unique identity list of length <$ $='n' /> is denoted as <$ $='I_n' /> and is defined as <$ $='I_n(x) = x' />.
        </p>
        <div className={styles.definition}>
          <p>
            The <b>loop</b> of a list <$ $='f' /> at index <$ $='i' /> denoted <$ $='\operatorname{loop}_f(i)' /> is defined as the sequence <$ $='(s_n)' /> where
          </p>
          <$ $$={`
            \\begin{align}
              s_1 &= f(i)\\\\
              s_{n} &= f(s_{n-1}).
            \\end{align}
          `} />
        </div>
        <div className={styles.corollary}>
          <p>
            Every loop is periodic.
          </p>
        </div>
        <div className={styles.proof}>
          <p>
            For a given loop <$ $='(s_i)' /> of a list <$ $='f' /> of length <$ $='n' />, if <$ $='s_i = s_j' />, then since <$ $='f' /> is well defined, <$ $='s_{i+1} = s_{j+1}' />. Since <$ $='l' /> is bijective, it is also true that if <$ $='i, j > 1' />, then <$ $='s_{i-1} = s_{j-1}' />. Suppose there does not exist a <$ $='u > 1' /> where <$ $='s_u = s_1' />. Then there does not exist a <$ $='v > 2' /> where <$ $='s_v = s_2' />. Continuing by induction, the loop must have no repeating values. But every value of the infinite loop must be one from the finite set <$ $='\Bbb{N}^n' />, which is a contradiction. Thus such a <$ $='u' /> exists, and the loop is periodic.
          </p>
        </div>
        <p>
          Let <$ $='u_0' /> be the smallest such <$ $='u' />, and define the <b>length</b> of a loop to be <$ $='|(s_i)| = u_0-1' />.
        </p>
        <p>
          Two loops <$ $='(s_i)' /> and <$ $='(t_i)' /> are considered <b>equivalent</b> if there exists an <$ $='n' /> where <$ $='s_i = t_{i+n}' /> for all <$ $='i' />. This relation is an equivalence relation, so it can be denoted <$ $='(s_i) = (t_i)' />.
        </p>
        <div className={styles.corollary}>
          <p>
            For any index <$ $='i' />, the <$ $='\operatorname{loop}_f(i) = \operatorname{loop}_f(f(i)) = \operatorname{loop}_f(f^{-1}(i))' />.
          </p>
        </div>
        <p>
          This follows from <$ $='n = 1' /> and <$ $='n = |\operatorname{loop}_f(i)| - 1' />.
        </p>
        <div className={styles.corollary}>
          <p>
            <$ $='\operatorname{loop}_f(i) = \operatorname{loop}_f(j)' /> if and only if <$ $='f(j) \in \operatorname{loop}_f(i)' />.
          </p>
        </div>
        <p>
          Since <$ $='f(j) \in \operatorname{loop}_f(i)' />, then <$ $='f(j) = [\overbrace{f \circ \cdots \circ f}^n](i)' /> for some <$ $='n \in \Bbb{N}' />. Then <$ $='\text{Corollary 2}' /> can be applied <$ $='n' /> times.
        </p>
        <div className={styles.corollary}>
          <p>
            If <$ $='f(i), f(j) \not\in \operatorname{loop}_f(k)' />, then <$ $='\operatorname{loop}_f(k) = \operatorname{loop}_g(k)' /> where <$ $='g = \operatorname{swap}_f(i, j)' />.
          </p>
        </div>
        <p>
          This follows from <$ $='n = 1' />.
        </p>
        <div className={styles.theorem}>
          <p>
            For a given list <$ $='f' />, if <$ $='i \neq j' /> and <$ $='\operatorname{loop}_f(i) = \operatorname{loop}_f(j)' />, then <$ $='\operatorname{swap}_f(i, j)' /> results in a list with exactly <$ $='1' /> more unique loops than in <$ $='f' />.
          </p>
        </div>
        <div className={styles.proof}>
          <p>
            Let <$ $='g = \operatorname{swap}_f(i, j)' />. By <$ $='\text{Corollary 4}' />, the number of loops not containing <$ $='f(i)' /> or <$ $='f(j)' /> are the same in both <$ $='f' /> and <$ $='g' />.
          </p>
          <p>
            Let <$ $='j_0' /> be the first index in <$ $='\operatorname{loop}_f(i)' /> where <$ $='\operatorname{loop}_f(i)_{j_0} = f(j)' />. Then for <$ $='1 \leq n < j_0' />, <$ $='\operatorname{loop}_f(i)_n = \operatorname{loop}_g(j)_n' />, but
          </p>
          <$ $$='\operatorname{loop}_f(i)_{j_0} = f(j) \neq f(i) = g(\operatorname{loop}_f(i)_{j_0-1}) = \operatorname{loop}_g(j)_{j_0}.' />
          <p>
            This indicates that <$ $='f(j) \not\in \operatorname{loop}_g(j)' /> while <$ $='f(j) \in \operatorname{loop}_g(i)' />. Therefore <$ $='\operatorname{loop}_g(i) \neq \operatorname{loop}_g(j)' /> by <$ $='\text{Corollary 3}' />, and <$ $='g' /> has one more loop than <$ $='f' /> has.
          </p>
        </div>
        <div className={styles.theorem}>
          <p>
            For a given list <$ $='f' />, if <$ $='i \neq j' /> and <$ $='\operatorname{loop}_f(i) \neq \operatorname{loop}_f(j)' />, then <$ $='\operatorname{swap}_f(i, j)' /> results in a list with exactly <$ $='1' /> fewer unique loops than in <$ $='f' />.
          </p>
        </div>
        <div className={styles.proof}>
          <p>
            Note that <$ $='j = \operatorname{loop}_f(j)_{j_0}' /> where <$ $='j_0 = |\operatorname{loop}_f(j)|' /> because of <$ $='\text{Corollary 2}' /> and <$ $='\text{Corollary 3}' />. Then for <$ $='1 \leq n < j_0' />, <$ $='\operatorname{loop}_g(i)_n = \operatorname{loop}_f(j)_n' /> and <$ $='\operatorname{loop}_g(i)_{j_0+1} = g(j)' />. Thus <$ $='g(j) \in \operatorname{loop}_g(i)' />, and by <$ $='\text{Corollary 3}' />, <$ $='\operatorname{loop}_g(i) = \operatorname{loop}_g(j)' />. <$ $='\text{Theorem 1}' /> showed that <$ $='f = \operatorname{swap}_g(i, j)' /> must contain <$ $='1' /> more unique loops than <$ $='g' />.
          </p>
        </div>
        <p>
          <$ $='\text{Theorem 1}' /> and <$ $='\text{Theorem 2}' /> together state that a swap on different indices only increases or decreases the number of loops by <$ $='1' />.
        </p>
        <div className={styles.corollary}>
          <p>
            A list of length <$ $='n' /> has <$ $='n' /> unique loops if and only if it is <$ $='I_n' />.
          </p>
        </div>
        <p>
          Since a list of length <$ $='n' /> cannot have more than <$ $='n' /> loops, <$ $='I_n' /> contains the maximum number of loops.
        </p>
        <div className={styles.corollary}>
          <p>
            A list has a loop with length greater than <$ $='1' /> if and only if it is not <$ $='I_n' />.
          </p>
        </div>
        <hr />
        <p>
          The method of finding <$ $='f^{-1}(i)' /> and performing <$ $='\operatorname{swap}_f(i, f^{-1}(i))' /> will always increase the number of loops by <$ $='1' /> until <$ $='I_n' /> is reached in the fewest possible swaps.
        </p>
      </div>
    )
  }
}

export default registerBlog(SwapSorting, '2018/09/02', 'Swap Sorting')
