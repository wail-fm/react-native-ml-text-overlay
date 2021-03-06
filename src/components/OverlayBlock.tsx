import React, { ReactChild } from 'react'
import { TouchableOpacity, View, ViewStyle, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  blockDefault: {
    zIndex: 2,
    position: 'relative',
  },
})
import type { Element, MLTextOverlay, Line, BlockCalc } from '../'
import AnimatedView from './AnimatedView'
export interface AnimationProps {
  type?: string
  duration?: number
  delay?: number
  infinite?: boolean
}
export interface OverlayBlockProps {
  block: MLTextOverlay | Element
  index: number
  blockPadding?: number
  padding?: number
  onPress?: (x: { block: MLTextOverlay | Element | Line; index: number }) => void
  blockStyle?: ViewStyle
  done: boolean
  error: boolean
  animate: boolean
  blockIcon?: (x: { done: boolean; error: boolean }) => ReactChild
  size: BlockCalc
  animation?: AnimationProps
}
const OverlayBlock = ({
  block,
  index,
  onPress,
  blockPadding = 20,
  size,
  error,
  blockIcon,
  done,
  animate,
  blockStyle,
  animation,
}: OverlayBlockProps) => {
  const { xRatio, yRatio } = size
  if (!block?.bounding) {
    return <View></View>
  }
  const calHeight = block?.bounding?.height * xRatio + (blockPadding ? blockPadding / 2 : 0)
  const calWidth = block?.bounding?.width * yRatio + (blockPadding ? blockPadding / 2 : 0)
  const left = block?.bounding?.left * xRatio - (blockPadding ? blockPadding / 4 : 0)
  const top = block?.bounding?.top * yRatio - (blockPadding ? blockPadding / 4 : 0)

  const out = (
    <View
      style={[
        {
          height: calHeight,
          width: calWidth,
        },
        styles.blockDefault,
        blockStyle,
      ]}
    ></View>
  )

  return (
    <AnimatedView
      key={index}
      delay={animation?.delay}
      duration={animation?.duration}
      animationType={animate ? animation?.type : undefined}
      infinite={animation?.infinite}
      style={{
        position: 'absolute',
        left,
        top,
        height: calHeight,
        width: calWidth,
      }}
    >
      <>{blockIcon ? blockIcon({ done, error }) : null}</>

      {onPress ? (
        <TouchableOpacity onPress={() => onPress({ block, index })}>{out}</TouchableOpacity>
      ) : (
        <View>{out}</View>
      )}
    </AnimatedView>
  )
}

export default OverlayBlock
