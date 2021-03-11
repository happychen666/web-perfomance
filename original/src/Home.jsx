import React, { Suspense, lazy } from 'react'
import { withStyles } from '@material-ui/core/styles'
import model from './model.js'
//将Card组件改成懒加载的方式
// import Card from './Card.jsx';
const Card = lazy(() => import('./Card'))

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    marginTop: '2rem',
  },
})

class Home extends React.Component {
  render() {
    let cards = []
    cards.push(
      model.map((panel) => (
        <Suspense key={panel.name} fallback={<div>loading...</div>}>
          <Card
            image={panel.image}
            title={panel.name}
            route={panel.route}
            description={panel.body}
          />
        </Suspense>
      ))
    )
    return <main className={this.props.classes.root}>{cards}</main>
  }
}

export default withStyles(styles)(Home)
