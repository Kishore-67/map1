import {InteractionManager, Animated} from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'

class BottomSheet extends Component {
  currentAnimatedValue = 0
  animatedValue = new Animated.Value(0)

  componentDidMount() {
    this.listener = this.animatedValue.addListener(this.onAnimatedValueChange)
  }

  componentWillUnmount() {
    this.animatedValue.removeListener(this.listener)
  }

  onAnimatedValueChange({value}) {
    // Fired when the panel is moving
  }

  show() {
    this.panel.show()

    InteractionManager.runAfterInteractions(() => {
      // Here the `currentAnimatedValue` will be equal to the bottom value of draggbleRange
    })
  }

  hide() {
    this.panel.hide()

    InteractionManager.runAfterInteractions(() => {
      // Here the `currentAnimatedValue` will be equal to the top value of draggbleRange
    })
  }

  render() {
    return (
      <SlidingUpPanel
        ref={c => (this.panel = c)}
        animatedValue={this.animatedValue}
        // Other props...
      />
    )
  }
}