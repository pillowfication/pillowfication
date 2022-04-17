import React from 'react'
import Box from '@mui/material/Box'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import * as Icons from '@mui/icons-material'
import Blog from '../../src/blog/Blog'
import Section from '../../src/blog/Section'
import { $, $$ } from '../../src/MathJax'
import SpotItCard from '../../src/blog/spot-it/SpotItCard'
import CardGroup from '../../src/blog/spot-it/CardGroup'

const DIAGRAM_WIDTH = 800
const DIAGRAM_HEIGHT = 600

function createLine (ax: number, ay: number, ar: number, bx: number, by: number, br: number): React.ReactElement {
  const theta = Math.atan2(by - ay, bx - ax)
  const dist = Math.hypot(bx - ax, by - ay)
  return (
    <line
      x1={ax + Math.cos(theta) * ar}
      y1={ay + Math.sin(theta) * ar}
      x2={ax + Math.cos(theta) * (dist - br)}
      y2={ay + Math.sin(theta) * (dist - br)}
      style={{ stroke: 'gray', strokeWidth: 4, strokeLinecap: 'round' }}
    />
  )
}

function createGrid (cx: number, cy: number, r: number = 6, size: number = 50): React.ReactElement[] {
  const grid: React.ReactElement[] = []

  for (let i = 0; i < 5; ++i) {
    for (let j = 0; j < 5; ++j) {
      grid.push(
        <circle
          key={`${i},${j}`}
          cx={cx + i * size}
          cy={cy + j * size}
          r={r}
          fill='black'
        />
      )
    }
  }

  return grid
}

const SpotIt = (): React.ReactElement => {
  return (
    <Blog title='Spot It!' date='2020/12/25'>
      <Section title='Rules of the Game'>
        <Typography paragraph><Link href='https://en.wikipedia.org/wiki/Dobble'><i>Spot It!</i></Link> or <i>Dobble</i> is a game where players must find the common symbol between two cards.</Typography>
        <Box component='figure' textAlign='center'>
          <SpotItCard size={250} symbols={[
            <Icons.Euro fontSize='large' />,
            <Icons.ElectricalServices fontSize='large' />,
            <Icons.CallSplit fontSize='large' />,
            <Icons.Audiotrack fontSize='large' />,
            <Icons.Brush fontSize='large' />,
            <Icons.AcUnit fontSize='large' />,
            <Icons.AssistantPhoto fontSize='large' />,
            <Icons.Balance fontSize='large' />
          ]} />
          <SpotItCard size={250} symbols={[
            <Icons.AirplanemodeActive fontSize='large' />,
            <Icons.AllInclusive fontSize='large' />,
            <Icons.AssistantPhoto fontSize='large' />,
            <Icons.Api fontSize='large' />,
            <Icons.Anchor fontSize='large' />,
            <Icons.BrightnessHigh fontSize='large' />,
            <Icons.Build fontSize='large' />,
            <Icons.Church fontSize='large' />
          ]} />
          <figcaption>
            <Typography variant='caption'>The only common symbol is <Icons.AssistantPhoto fontSize='inherit' />.</Typography>
          </figcaption>
        </Box>
        <Typography>Interestingly, the game’s manual states that</Typography>
        <ol>
          <Typography component='li'>There are 55 cards, with each card having 8 different symbols.</Typography>
          <Typography component='li'>Between any 2 cards, there is exactly 1 matching symbol.</Typography>
        </ol>
        <Typography paragraph>But there is no mention to how many symbols there are in the entire deck.</Typography>
        <blockquote>
          <Typography component='i' paragraph>So how many symbols are there?</Typography>
        </blockquote>
      </Section>

      <Section title='An Upper Bound'>
        <Typography paragraph>A trivial case would be if every single card had, say, a <Icons.Star fontSize='inherit' />, and each card’s other 7 symbols were all different. In this case, the deck would have {$('1 + 55 \\times 7 = 386')} total symbols.</Typography>
        <Box component='figure' textAlign='center'>
          <SpotItCard symbols={[
            <Icons.Euro />,
            <Icons.ElectricalServices />,
            <Icons.CallSplit />,
            <Icons.Audiotrack />,
            <Icons.Brush />,
            <Icons.AcUnit />,
            <Icons.Star />,
            <Icons.Balance />
          ]} />
          <SpotItCard symbols={[
            <Icons.AirplanemodeActive />,
            <Icons.AllInclusive />,
            <Icons.Star />,
            <Icons.Api />,
            <Icons.Anchor />,
            <Icons.BrightnessHigh />,
            <Icons.Build />,
            <Icons.Church />
          ]} />
          <SpotItCard symbols={[
            <Icons.Cloud />,
            <Icons.ColorLens />,
            <Icons.Commit />,
            <Icons.DoNotDisturb />,
            <Icons.Favorite />,
            <Icons.Extension />,
            <Icons.Flare />,
            <Icons.Star />
          ]} />
          <SpotItCard symbols={[
            <Icons.Functions />,
            <Icons.GroupWork />,
            <Icons.GridView />,
            <Icons.Headphones />,
            <Icons.HourglassEmpty />,
            <Icons.Star />,
            <Icons.Key />,
            <Icons.Language />
          ]} />
          <SpotItCard symbols={[
            <Icons.Star />,
            <Icons.LocalFireDepartment />,
            <Icons.Mail />,
            <Icons.Notifications />,
            <Icons.Park />,
            <Icons.Pets />,
            <Icons.Radar />,
            <Icons.Spa />
          ]} />
          <figcaption>
            <Typography variant='caption'>Every card contains a <Icons.Star fontSize='inherit' />, and here 36 unique symbols are used.</Typography>
          </figcaption>
        </Box>
        <Typography paragraph>But anyone who’s played the game knows that the deck isn’t structured like this. The answer isn’t unique, and the more interesting question is:</Typography>
        <blockquote>
          <Typography component='i' paragraph>What is the smallest possible number of unique symbols?</Typography>
        </blockquote>
        <Typography paragraph>{$('386')} is the first upper bound.</Typography>
        <Box component='figure' textAlign='center'>
          <SpotItCard symbols={[
            <Icons.Euro />,
            <Icons.ElectricalServices />,
            <Icons.CallSplit />,
            <Icons.Audiotrack />,
            <Icons.Brush />,
            <Icons.AcUnit />,
            <Icons.Star />,
            <Icons.Balance />
          ]} />
          <SpotItCard symbols={[
            <Icons.AirplanemodeActive />,
            <Icons.AllInclusive />,
            <Icons.Star />,
            <Icons.Api />,
            <Icons.Anchor />,
            <Icons.BrightnessHigh />,
            <Icons.Build />,
            <Icons.Church />
          ]} />
          <SpotItCard symbols={[
            <Icons.Cloud />,
            <Icons.ColorLens />,
            <Icons.Api />,
            <Icons.DoNotDisturb />,
            <Icons.Favorite />,
            <Icons.Extension />,
            <Icons.Flare />,
            <Icons.Audiotrack />
          ]} />
          <SpotItCard symbols={[
            <Icons.Functions />,
            <Icons.GridView />,
            <Icons.AllInclusive />,
            <Icons.Headphones />,
            <Icons.Extension />,
            <Icons.Euro />,
            <Icons.Key />,
            <Icons.Language />
          ]} />
          <SpotItCard symbols={[
            <Icons.Anchor />,
            <Icons.LocalFireDepartment />,
            <Icons.Brush />,
            <Icons.Key />,
            <Icons.Park />,
            <Icons.ColorLens />,
            <Icons.Radar />,
            <Icons.Spa />
          ]} />
          <figcaption>
            <Typography variant='caption'>Every pair of cards has a matching symbol, and only 30 unique symbols are used.</Typography>
          </figcaption>
        </Box>
      </Section>

      <Section title='A Lower Bound'>
        <Typography paragraph>Constructing cards one by one offers some more insight into the problem. Start with a card with 8 random symbols.</Typography>
        <Box component='figure' textAlign='center'>
          <SpotItCard symbols={[
            <Icons.Euro />,
            <Icons.ElectricalServices />,
            <Icons.CallSplit />,
            <Icons.Audiotrack />,
            <Icons.Brush />,
            <Icons.AcUnit />,
            <Icons.Star />,
            <Icons.Balance />
          ]} />
        </Box>
        <Typography paragraph>The next card constructed will contain a symbol from the first card, along with 7 new symbols.</Typography>
        <Box component='figure' textAlign='center'>
          <SpotItCard symbols={[
            <Icons.Euro />,
            <Icons.ElectricalServices />,
            <Icons.CallSplit />,
            <Icons.Audiotrack />,
            <Icons.Brush />,
            <Icons.AcUnit />,
            <Icons.Star style={{ color: 'crimson', border: '1px solid crimson' }} />,
            <Icons.Balance />
          ]} />
          <SpotItCard symbols={[
            <Icons.AirplanemodeActive />,
            <Icons.AllInclusive />,
            <Icons.Star style={{ color: 'crimson', border: '1px solid crimson' }} />,
            <Icons.Api />,
            <Icons.Anchor />,
            <Icons.BrightnessHigh />,
            <Icons.Build />,
            <Icons.Church />
          ]} />
        </Box>
        <Typography paragraph>The next card will contain a symbol from each of previous 2 cards, along with 6 new symbols.</Typography>
        <Box component='figure' textAlign='center'>
          <SpotItCard symbols={[
            <Icons.Euro />,
            <Icons.ElectricalServices />,
            <Icons.CallSplit />,
            <Icons.Audiotrack style={{ color: 'royalblue', border: '1px solid royalblue' }} />,
            <Icons.Brush />,
            <Icons.AcUnit />,
            <Icons.Star style={{ color: 'crimson' }} />,
            <Icons.Balance />
          ]} />
          <SpotItCard symbols={[
            <Icons.AirplanemodeActive />,
            <Icons.AllInclusive />,
            <Icons.Star style={{ color: 'crimson' }} />,
            <Icons.Api style={{ color: 'royalblue', border: '1px solid royalblue' }} />,
            <Icons.Anchor />,
            <Icons.BrightnessHigh />,
            <Icons.Build />,
            <Icons.Church />
          ]} />
          <SpotItCard symbols={[
            <Icons.Cloud />,
            <Icons.ColorLens />,
            <Icons.Api style={{ color: 'royalblue', border: '1px solid royalblue' }} />,
            <Icons.DoNotDisturb />,
            <Icons.Favorite />,
            <Icons.Extension />,
            <Icons.Flare />,
            <Icons.Audiotrack style={{ color: 'royalblue', border: '1px solid royalblue' }} />
          ]} />
        </Box>
        <Typography paragraph>Do the same to create another card.</Typography>
        <Box component='figure' textAlign='center'>
          <SpotItCard symbols={[
            <Icons.Euro style={{ color: 'green', border: '1px solid green' }} />,
            <Icons.ElectricalServices />,
            <Icons.CallSplit />,
            <Icons.Audiotrack style={{ color: 'royalblue' }} />,
            <Icons.Brush />,
            <Icons.AcUnit />,
            <Icons.Star style={{ color: 'crimson' }} />,
            <Icons.Balance />
          ]} />
          <SpotItCard symbols={[
            <Icons.AirplanemodeActive />,
            <Icons.AllInclusive style={{ color: 'green', border: '1px solid green' }} />,
            <Icons.Star style={{ color: 'crimson' }} />,
            <Icons.Api style={{ color: 'royalblue' }} />,
            <Icons.Anchor />,
            <Icons.BrightnessHigh />,
            <Icons.Build />,
            <Icons.Church />
          ]} />
          <SpotItCard symbols={[
            <Icons.Cloud />,
            <Icons.ColorLens />,
            <Icons.Api style={{ color: 'royalblue' }} />,
            <Icons.DoNotDisturb />,
            <Icons.Favorite />,
            <Icons.Extension style={{ color: 'green', border: '1px solid green' }} />,
            <Icons.Flare />,
            <Icons.Audiotrack style={{ color: 'royalblue' }} />
          ]} />
          <SpotItCard symbols={[
            <Icons.Functions />,
            <Icons.GridView />,
            <Icons.AllInclusive style={{ color: 'green', border: '1px solid green' }} />,
            <Icons.Headphones />,
            <Icons.Extension style={{ color: 'green', border: '1px solid green' }} />,
            <Icons.Euro style={{ color: 'green', border: '1px solid green' }} />,
            <Icons.Key />,
            <Icons.Language />
          ]} />
        </Box>
        <Typography paragraph>This process can go on until 9 cards have been made, utilizing 36 unique symbols, and it shows that 36 is the fewest number of symbols required to build a deck of 9 cards. Unfortunately, this algorithm stops at 9 cards. It is impossible to add a 10th card without editing the some of the 9 cards already made. (Try to add a 10th card, keeping in mind that every preexisting symbol appears exactly twice.)</Typography>
        <Typography paragraph>Thus {$('36')} is the first lower bound.</Typography>
      </Section>

      <Section title='Partitioning the Deck'>
        <Typography paragraph>The next idea to try involves splitting up the deck into small groups and analyzing those groups. First, one card is chosen at random.</Typography>
        <Box component='figure' textAlign='center'>
          <SpotItCard size={250} symbols={[
            <Icons.Extension fontSize='large' />,
            <Icons.Star fontSize='large' />,
            <Icons.Anchor fontSize='large' />,
            <Icons.Audiotrack fontSize='large' />,
            <Icons.Favorite fontSize='large' />,
            <Icons.AcUnit fontSize='large' />,
            <Icons.AssistantPhoto fontSize='large' />,
            <Icons.AirplanemodeActive fontSize='large' />
          ]} />
        </Box>
        <Typography paragraph>Every other card in the deck shares exactly one of the 8 symbols with this card. For example, one group of cards all contain a <Icons.Star fontSize='inherit' />, while another group of cards all contain a <Icons.AcUnit fontSize='inherit' />. This partitions the other 54 cards into 8 groups, based on which symbol is shared.</Typography>
        <Box component='figure'>
          <TableContainer>
            <Box sx={{
              position: 'relative',
              width: DIAGRAM_WIDTH,
              height: DIAGRAM_HEIGHT,
              margin: '0 auto'
            }}>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 250) / 2,
                top: (DIAGRAM_HEIGHT - 250) / 2
              }}>
                <SpotItCard noMargin size={250} symbols={[
                  <Icons.Extension fontSize='large' />,
                  <Icons.Star fontSize='large' />,
                  <Icons.Anchor fontSize='large' />,
                  <Icons.Audiotrack fontSize='large' />,
                  <Icons.Favorite fontSize='large' />,
                  <Icons.AcUnit fontSize='large' />,
                  <Icons.AssistantPhoto fontSize='large' />,
                  <Icons.AirplanemodeActive fontSize='large' />
                ]} />
              </Box>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 150) / 2 - 200,
                top: (DIAGRAM_HEIGHT - 150) / 2 - 200
              }}>
                <CardGroup Icon={Icons.AirplanemodeActive} />
              </Box>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 150) / 2 - 310,
                top: (DIAGRAM_HEIGHT - 150) / 2 - 80
              }}>
                <CardGroup Icon={Icons.Extension} />
              </Box>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 150) / 2 - 310,
                top: (DIAGRAM_HEIGHT - 150) / 2 + 80
              }}>
                <CardGroup Icon={Icons.AssistantPhoto} />
              </Box>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 150) / 2 - 200,
                top: (DIAGRAM_HEIGHT - 150) / 2 + 200
              }}>
                <CardGroup Icon={Icons.AcUnit} />
              </Box>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 150) / 2 + 200,
                top: (DIAGRAM_HEIGHT - 150) / 2 - 200
              }}>
                <CardGroup Icon={Icons.Star} />
              </Box>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 150) / 2 + 310,
                top: (DIAGRAM_HEIGHT - 150) / 2 - 80
              }}>
                <CardGroup Icon={Icons.Anchor} />
              </Box>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 150) / 2 + 310,
                top: (DIAGRAM_HEIGHT - 150) / 2 + 80
              }}>
                <CardGroup Icon={Icons.Audiotrack} />
              </Box>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 150) / 2 + 200,
                top: (DIAGRAM_HEIGHT - 150) / 2 + 200
              }}>
                <CardGroup Icon={Icons.Favorite} />
              </Box>
              <Box component='svg' sx={{
                display: 'block',
                position: 'absolute',
                width: 1.00,
                height: 1.00
              }}>
                {createLine(
                  DIAGRAM_WIDTH / 2, DIAGRAM_HEIGHT / 2, 135,
                  DIAGRAM_WIDTH / 2 - 200, DIAGRAM_HEIGHT / 2 - 200, 85
                )}
                {createLine(
                  DIAGRAM_WIDTH / 2, DIAGRAM_HEIGHT / 2, 135,
                  DIAGRAM_WIDTH / 2 - 310, DIAGRAM_HEIGHT / 2 - 80, 85
                )}
                {createLine(
                  DIAGRAM_WIDTH / 2, DIAGRAM_HEIGHT / 2, 135,
                  DIAGRAM_WIDTH / 2 - 310, DIAGRAM_HEIGHT / 2 + 80, 85
                )}
                {createLine(
                  DIAGRAM_WIDTH / 2, DIAGRAM_HEIGHT / 2, 135,
                  DIAGRAM_WIDTH / 2 - 200, DIAGRAM_HEIGHT / 2 + 200, 85
                )}
                {createLine(
                  DIAGRAM_WIDTH / 2, DIAGRAM_HEIGHT / 2, 135,
                  DIAGRAM_WIDTH / 2 + 200, DIAGRAM_HEIGHT / 2 - 200, 85
                )}
                {createLine(
                  DIAGRAM_WIDTH / 2, DIAGRAM_HEIGHT / 2, 135,
                  DIAGRAM_WIDTH / 2 + 310, DIAGRAM_HEIGHT / 2 - 80, 85
                )}
                {createLine(
                  DIAGRAM_WIDTH / 2, DIAGRAM_HEIGHT / 2, 135,
                  DIAGRAM_WIDTH / 2 + 310, DIAGRAM_HEIGHT / 2 + 80, 85
                )}
                {createLine(
                  DIAGRAM_WIDTH / 2, DIAGRAM_HEIGHT / 2, 135,
                  DIAGRAM_WIDTH / 2 + 200, DIAGRAM_HEIGHT / 2 + 200, 85
                )}
              </Box>
            </Box>
          </TableContainer>
        </Box>
        <Typography paragraph>Now how do the groups interact with each other? Pick one card from the <Icons.Star fontSize='inherit' /> group and compare it with some cards from the <Icons.AcUnit fontSize='inherit' /> group. The <Icons.Star fontSize='inherit' /> card must match with the <Icons.AcUnit fontSize='inherit' /> cards through <strong>different</strong> symbols. (Otherwise the <Icons.AcUnit fontSize='inherit' /> group breaks down).</Typography>
        <Box component='figure'>
          <TableContainer>
            <Box sx={{
              position: 'relative',
              width: DIAGRAM_WIDTH,
              height: DIAGRAM_HEIGHT,
              margin: '0 auto'
            }}>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 250) / 2 - 175,
                top: (DIAGRAM_HEIGHT - 250) / 2
              }}>
                <SpotItCard noMargin size={250} symbols={[
                  <Icons.Star fontSize='large' />,
                  <Icons.AttachMoney fontSize='large' style={{ color: 'green' }} />,
                  <Icons.ElectricBolt fontSize='large' style={{ color: 'royalblue' }} />,
                  <Icons.QuestionMark fontSize='large' style={{ color: 'lightgray' }} />,
                  <Icons.QuestionMark fontSize='large' style={{ color: 'lightgray' }} />,
                  <Icons.QuestionMark fontSize='large' style={{ color: 'lightgray' }} />,
                  <Icons.Gamepad fontSize='large' style={{ color: 'crimson' }} />,
                  <Icons.QuestionMark fontSize='large' style={{ color: 'lightgray' }} />
                ]} />
              </Box>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 150) / 2 + 200,
                top: (DIAGRAM_HEIGHT - 150) / 2 - 200
              }}>
                <SpotItCard noMargin symbols={[
                  <Icons.AcUnit fontSize='large' />,
                  <Icons.Gamepad fontSize='large' style={{ color: 'crimson' }} />,
                  <Icons.QuestionMark style={{ color: 'lightgray' }} />,
                  <Icons.QuestionMark style={{ color: 'lightgray' }} />,
                  <Icons.QuestionMark style={{ color: 'lightgray' }} />,
                  <Icons.QuestionMark style={{ color: 'lightgray' }} />,
                  <Icons.QuestionMark style={{ color: 'lightgray' }} />,
                  <Icons.QuestionMark style={{ color: 'lightgray' }} />
                ]} />
              </Box>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 150) / 2 + 275,
                top: (DIAGRAM_HEIGHT - 150) / 2
              }}>
                <SpotItCard noMargin symbols={[
                  <Icons.AcUnit fontSize='large' />,
                  <Icons.QuestionMark style={{ color: 'lightgray' }} />,
                  <Icons.QuestionMark style={{ color: 'lightgray' }} />,
                  <Icons.QuestionMark style={{ color: 'lightgray' }} />,
                  <Icons.QuestionMark style={{ color: 'lightgray' }} />,
                  <Icons.ElectricBolt fontSize='large' style={{ color: 'royalblue' }} />,
                  <Icons.QuestionMark style={{ color: 'lightgray' }} />,
                  <Icons.QuestionMark style={{ color: 'lightgray' }} />
                ]} />
              </Box>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 150) / 2 + 200,
                top: (DIAGRAM_HEIGHT - 150) / 2 + 200
              }}>
                <SpotItCard noMargin symbols={[
                  <Icons.AcUnit fontSize='large' />,
                  <Icons.QuestionMark style={{ color: 'lightgray' }} />,
                  <Icons.QuestionMark style={{ color: 'lightgray' }} />,
                  <Icons.AttachMoney fontSize='large' style={{ color: 'green' }} />,
                  <Icons.QuestionMark style={{ color: 'lightgray' }} />,
                  <Icons.QuestionMark style={{ color: 'lightgray' }} />,
                  <Icons.QuestionMark style={{ color: 'lightgray' }} />,
                  <Icons.QuestionMark style={{ color: 'lightgray' }} />
                ]} />
              </Box>
              <Box component='svg' sx={{
                display: 'block',
                position: 'absolute',
                width: 1.00,
                height: 1.00
              }}>
                {createLine(
                  DIAGRAM_WIDTH / 2 - 175, DIAGRAM_HEIGHT / 2, 135,
                  DIAGRAM_WIDTH / 2 + 200, DIAGRAM_HEIGHT / 2 - 200, 85
                )}
                {createLine(
                  DIAGRAM_WIDTH / 2 - 175, DIAGRAM_HEIGHT / 2, 135,
                  DIAGRAM_WIDTH / 2 + 275, DIAGRAM_HEIGHT / 2, 85
                )}
                {createLine(
                  DIAGRAM_WIDTH / 2 - 175, DIAGRAM_HEIGHT / 2, 135,
                  DIAGRAM_WIDTH / 2 + 200, DIAGRAM_HEIGHT / 2 + 200, 85
                )}
              </Box>
            </Box>
          </TableContainer>
        </Box>
        <Typography>This means that the size of the <Icons.AcUnit fontSize='inherit' /> group can’t be more than {$('7')}, and there are only two ways the 54 cards can be partitioned, based on the size of the groups:</Typography>
        {$$(`
          \\{ 7, 7, 7, 7, 7, 7, 6, 6 \\} \\quad\\text{and}\\quad \\{ 7, 7, 7, 7, 7, 7, 7, 5 \\}
        `)}
        <Typography paragraph>This argument assumes that there are 2 non-empty groups, so there is also the third possible partitioning {$('\\{ 54, 0, 0, 0, 0, 0, 0, 0 \\}')}, which is the trivial case already discussed.</Typography>
        <Typography paragraph>Pick three groups of size {$('7')}, and call them the <Icons.Star fontSize='inherit' />, <Icons.AcUnit fontSize='inherit' />, and <Icons.AirplanemodeActive fontSize='inherit' /> groups. The <Icons.Star fontSize='inherit' /> group contains 49 unique non-<Icons.Star fontSize='inherit' /> symbols. There are also 49 different ways to pair up a card from the <Icons.Star fontSize='inherit' /> group with a card from the <Icons.AcUnit fontSize='inherit' /> group. Each connection requires a unique symbol, so all 49 symbols are used to connect the <Icons.Star fontSize='inherit' /> and <Icons.AcUnit fontSize='inherit' /> groups. These same 49 symbols must also be used to connect the <Icons.Star fontSize='inherit' /> and <Icons.AirplanemodeActive fontSize='inherit' /> groups, and consequently the <Icons.AcUnit fontSize='inherit' /> and <Icons.AirplanemodeActive fontSize='inherit' /> groups. 49 symbols <strong>must</strong> be used to ensure the entire deck adheres to <i>Spot It!</i> rules.</Typography>
        <Box component='figure' textAlign='center'>
          <TableContainer>
            <Box sx={{
              position: 'relative',
              width: DIAGRAM_WIDTH,
              height: DIAGRAM_HEIGHT,
              margin: '0 auto'
            }}>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 150) / 2 - 140,
                top: (DIAGRAM_HEIGHT - 150) / 2 - 200
              }}>
                <CardGroup Icon={Icons.AirplanemodeActive} />
              </Box>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 150) / 2 - 300,
                top: (DIAGRAM_HEIGHT - 150) / 2 - 90
              }}>
                <CardGroup Icon={Icons.Extension} />
              </Box>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 150) / 2 - 300,
                top: (DIAGRAM_HEIGHT - 150) / 2 + 90
              }}>
                <CardGroup Icon={Icons.AssistantPhoto} />
              </Box>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 150) / 2 - 140,
                top: (DIAGRAM_HEIGHT - 150) / 2 + 200
              }}>
                <CardGroup Icon={Icons.AcUnit} />
              </Box>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 150) / 2 + 140,
                top: (DIAGRAM_HEIGHT - 150) / 2 - 200
              }}>
                <CardGroup Icon={Icons.Star} />
              </Box>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 150) / 2 + 300,
                top: (DIAGRAM_HEIGHT - 150) / 2 - 90
              }}>
                <CardGroup Icon={Icons.Anchor} />
              </Box>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 150) / 2 + 300,
                top: (DIAGRAM_HEIGHT - 150) / 2 + 90
              }}>
                <CardGroup Icon={Icons.Audiotrack} />
              </Box>
              <Box sx={{
                position: 'absolute',
                left: (DIAGRAM_WIDTH - 150) / 2 + 140,
                top: (DIAGRAM_HEIGHT - 150) / 2 + 200
              }}>
                <CardGroup Icon={Icons.Favorite} />
              </Box>
              <Box component='svg' sx={{
                display: 'block',
                position: 'absolute',
                width: 1.00,
                height: 1.00
              }}>
                {(() => {
                  const points = [
                    [-140, -200],
                    [-300, -90],
                    [-300, +90],
                    [-140, +200],
                    [+140, -200],
                    [+300, -90],
                    [+300, +90],
                    [+140, +200]
                  ]
                  const lines: React.ReactElement[] = []

                  for (let i = 0; i < 8; ++i) {
                    const pointA = points[i]
                    for (let j = i + 1; j < 8; ++j) {
                      const pointB = points[j]
                      lines.push(
                        <React.Fragment key={`${i},${j}`}>
                          {createLine(
                            DIAGRAM_WIDTH / 2 + pointA[0], DIAGRAM_HEIGHT / 2 + pointA[1], 80,
                            DIAGRAM_WIDTH / 2 + pointB[0], DIAGRAM_HEIGHT / 2 + pointB[1], 80
                          )}
                        </React.Fragment>
                      )
                    }
                  }

                  return lines
                })()}
              </Box>
            </Box>
          </TableContainer>
          <figcaption>
            <Typography variant='caption'>For any two groups, the same 49 symbols are used to ensure that every pair of cards between those two groups share a common symbol.</Typography>
          </figcaption>
        </Box>
        <Typography paragraph>Including the 8 symbols on the card originally chosen to partition the deck, <strong>57 symbols</strong> are used in the game of <i>Spot It!</i>.</Typography>
      </Section>

      <Section title={<Typography variant='h2' gutterBottom>The <i>Spot It!</i> Geometry</Typography>}>
        <Typography>There are striking similarities between the properties of <i>Spot It!</i> and the axioms of <Link href='https://en.wikipedia.org/wiki/Incidence_geometry'>incidence geometries</Link>:</Typography>
        <Box component={TableContainer} my={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Incidence geometry</TableCell>
                <TableCell align='center'><i>Spot It!</i></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align='center'>
                  <Typography>There are points and lines, and lines have points.</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>There are symbols and cards, and cards have symbols.</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'>
                  <Typography>Every line has at least two points.</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>Every card has at least two symbols.</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'>
                  <Typography>Two points determine at most one line.</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>Two cards cannot have two matching symbols.</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'>
                  <Typography>Every pair of distinct lines meet in exactly one point.</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>Every pair of cards has exactly one matching symbol.</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
        <Typography paragraph>The last property, which I call the <i>Spot It!</i> axiom, heavily suggests that <i>Spot It!</i> is some kind of <Link href='https://en.wikipedia.org/wiki/Projective_plane'>projective plane</Link>, although it is difficult to check if <i>Spot It!</i> satisfies some of the other axioms.</Typography>
        <Typography>A simple projective plane can be constructed, starting with an {$('n \\times n')} grid of points.</Typography>
        <Box component='figure' textAlign='center'>
          <svg width={250} height={250}>
            {createGrid(25, 25)}
          </svg>
        </Box>
        <Typography>Pick any point in this grid.</Typography>
        <Box component='figure' textAlign='center'>
          <svg width={250} height={250}>
            {createGrid(25, 25)}
            <circle cx={75} cy={75} r={8} stroke='black' strokeWidth={4} fill='royalblue' />
          </svg>
        </Box>
        <Typography>Pick some number of rows and columns to travel away from this point. For example, {$('1')} row down and {$('2')} columns to the right.</Typography>
        <Box component='figure' textAlign='center'>
          <svg width={250} height={250}>
            <marker id='arrow' viewBox='0 0 10 10' refX='5' refY='5' markerWidth='3' markerHeight='3' orient='auto-start-reverse'>
              <path d='M 0 0 L 10 5 L 0 10 z' fill='royalblue' />
            </marker>
            {createGrid(25, 25)}
            <polyline points='75,75 75,125 160,125' fill='none' stroke='royalblue' strokeWidth={4} markerEnd='url(#arrow)' />
            <circle cx={75} cy={75} r={8} stroke='black' strokeWidth={4} fill='royalblue' />
            <circle cx={175} cy={125} r={8} stroke='black' strokeWidth={4} fill='royalblue' />
          </svg>
        </Box>
        <Typography>Continue travelling in this direction, wrapping around the grid when necessary, until it’s back at the start.</Typography>
        <Box component='figure' textAlign='center'>
          <svg width={250} height={250}>
            <marker id='arrow' viewBox='0 0 10 10' refX='5' refY='5' markerWidth='3' markerHeight='3' orient='auto-start-reverse'>
              <path d='M 0 0 L 10 5 L 0 10 z' fill='royalblue' />
            </marker>
            {createGrid(25, 25)}
            <polyline points='75,75 75,125 160,125' fill='none' stroke='royalblue' strokeWidth={4} markerEnd='url(#arrow)' />
            <polyline points='175,125 175,175 250,175' fill='none' stroke='royalblue' strokeWidth={4} />
            <polyline points='0,175 10,175' fill='none' stroke='royalblue' strokeWidth={4} markerEnd='url(#arrow)' />
            <polyline points='25,175 25,225, 110,225' fill='none' stroke='royalblue' strokeWidth={4} markerEnd='url(#arrow)' />
            <polyline points='125,225 125,250' fill='none' stroke='royalblue' strokeWidth={4} />
            <polyline points='125,0 125,25 210,25' fill='none' stroke='royalblue' strokeWidth={4} markerEnd='url(#arrow)' />
            <polyline points='225,25 225,75 250,75' fill='none' stroke='royalblue' strokeWidth={4} />
            <polyline points='0,75 60,75' fill='none' stroke='royalblue' strokeWidth={4} markerEnd='url(#arrow)' />
            <circle cx={75} cy={75} r={8} stroke='black' strokeWidth={4} fill='royalblue' />
            <circle cx={175} cy={125} r={8} stroke='black' strokeWidth={4} fill='royalblue' />
            <circle cx={25} cy={175} r={8} stroke='black' strokeWidth={4} fill='royalblue' />
            <circle cx={125} cy={225} r={8} stroke='black' strokeWidth={4} fill='royalblue' />
            <circle cx={225} cy={25} r={8} stroke='black' strokeWidth={4} fill='royalblue' />
          </svg>
        </Box>
        <Typography paragraph>The 5 points visited determine a line, and changing the starting point and direction gives all other lines. Since {$('n = 5')} is a prime number, the following are true about this geometry:</Typography>
        <ol>
          <Typography component='li'>There are {$('n^2 = 25')} points and {$('n \\cdot (n + 1) = 30')} unique lines.</Typography>
          <Typography component='li'>Every line has exactly {$('n = 5')} points.</Typography>
          <Typography component='li'>For any two points, there is a unique line containing them.</Typography>
          <Typography component='li'>For every line {$('l')} and point {$('p')} not on {$('l')}, there exists a line containing {$('p')} that is <strong>parallel</strong> to {$('l')}.</Typography>
          <Typography component='li'>There are {$('n + 1 = 6')} groups of parallel lines, each group containing {$('n = 5')} lines.</Typography>
        </ol>
        <Typography>This is an <Link href='https://en.wikipedia.org/wiki/Affine_geometry'>affine geometry</Link>, but can be made into a projective geometry. Consider the following group of parallel lines.</Typography>
        <Box component='figure' textAlign='center'>
          <svg width={250} height={250}>
            <path d='M5,25 L245,25' fill='none' stroke='green' strokeWidth={4} />
            <path d='M5,75 L245,75' fill='none' stroke='green' strokeWidth={4} />
            <path d='M5,125 L245,125' fill='none' stroke='green' strokeWidth={4} />
            <path d='M5,175 L245,175' fill='none' stroke='green' strokeWidth={4} />
            <path d='M5,225 L245,225' fill='none' stroke='green' strokeWidth={4} />
            {createGrid(25, 25, 6)}
          </svg>
        </Box>
        <Typography>To make them all intersect, add another <strong>point at infinity</strong> that all these lines contain.</Typography>
        <Box component='figure' textAlign='center'>
            <svg width={350} height={250}>
              <path d='M5,25 L225,25 Q290,25 325,125' fill='none' stroke='green' strokeWidth={4} />
              <path d='M5,75 L225,75 Q275,75 325,125' fill='none' stroke='green' strokeWidth={4} />
              <path d='M5,125 L325,125' fill='none' stroke='green' strokeWidth={4} />
              <path d='M5,175 L225,175 Q275,175 325,125' fill='none' stroke='green' strokeWidth={4} />
              <path d='M5,225 L225,225 Q290,225 325,125' fill='none' stroke='green' strokeWidth={4} />
              {createGrid(25, 25, 6)}
              <circle cx={325} cy={125} r={8} stroke='black' strokeWidth={4} fill='green' />
          </svg>
        </Box>
        <Typography>Every group of parallel lines has their own point at infinity, and all the points at infinity are also connected by a line.</Typography>
        <Box component='figure' textAlign='center'>
          <TableContainer>
            <svg width={350} height={350}>
              <path d='M5,80 L225,300 Q275,350 325,300' fill='none' stroke='crimson' strokeWidth={4} />
              <path d='M135,80 L245,135' fill='none' stroke='royalblue' strokeWidth={4} />
              <path d='M5,265 L115,320' fill='none' stroke='royalblue' strokeWidth={4} />
              <path d='M5,140 L225,250 Q275,275 325,250' fill='none' stroke='royalblue' strokeWidth={4} />
              <path d='M5,200 L325,200' fill='none' stroke='green' strokeWidth={4} />
              <path d='M5,135 L115,80' fill='none' stroke='goldenrod' strokeWidth={4} />
              <path d='M135,320 L245,265' fill='none' stroke='goldenrod' strokeWidth={4} />
              <path d='M5,260 L225,150 Q275,125 325,150' fill='none' stroke='goldenrod' strokeWidth={4} />
              <path d='M5,320 L225,100 Q275,50 325,100' fill='none' stroke='purple' strokeWidth={4} />
              <path d='M125,320 L125,100 Q125,50 325,50' fill='none' stroke='gray' strokeWidth={4} />
              <path d='M325,320 L325,30' fill='none' stroke='black' strokeWidth={4} strokeDasharray='4' />
              {createGrid(25, 100, 6)}
              <circle cx={325} cy={300} r={8} stroke='black' strokeWidth={4} fill='crimson' />
              <circle cx={325} cy={250} r={8} stroke='black' strokeWidth={4} fill='royalblue' />
              <circle cx={325} cy={200} r={8} stroke='black' strokeWidth={4} fill='green' />
              <circle cx={325} cy={150} r={8} stroke='black' strokeWidth={4} fill='goldenrod' />
              <circle cx={325} cy={100} r={8} stroke='black' strokeWidth={4} fill='purple' />
              <circle cx={325} cy={50} r={8} stroke='black' strokeWidth={4} fill='gray' />
            </svg>
          </TableContainer>
          <figcaption>
            <Typography variant='caption'>Only one line from each parallel group is shown connected to its group’s point at infinity.</Typography>
          </figcaption>
        </Box>
        <Typography>This modified geometry has some new properties.</Typography>
        <ol>
          <Typography component='li'>There are {$('n^2 + n + 1 = 31')} points and {$('n^2 + n + 1 = 31')} unique lines.</Typography>
          <Typography component='li'>Every line has exactly {$('n + 1 = 6')} points.</Typography>
          <Typography component='li'>For any two points, there is a unique line containing them.</Typography>
          <Typography component='li'><strong>Every pair of lines intersects at exactly 1 point.</strong></Typography>
        </ol>
        <Typography paragraph>Introducing points at infinity makes it so that the last property holds, and this is now a <Link href='https://en.wikipedia.org/wiki/Projective_geometry'>projective geometry</Link>. By reinterpreting points as symbols and lines as card, we have a structure where <strong>every pair of cards shares exactly one common symbol</strong>.</Typography>
        <Typography paragraph>Setting {$('n = 7')} gives a way to construct a deck of 57 cards, each card having 8 symbols, and all cards satisfying the <i>Spot It!</i> axiom. But <i>Spot It!</i> comes with only 55 cards! If a deck satisfies the <i>Spot It!</i> axiom, then every subset also satisfies the <i>Spot It!</i> axiom, and for whatever reason, the game chooses to omit two possible cards.</Typography>
      </Section>
    </Blog>
  )
}

export default SpotIt
