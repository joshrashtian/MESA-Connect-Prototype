import React from 'react'

const NextButton = ({
  onPress,
  style,
  customStyle,
  text,
  textStyle,
  condition,
  conditionStyle,
  conditionStyleText
}) => {
  return (
    <div
      onClick={condition === true || condition === undefined ? onPress : null}
      className={
        condition === false && conditionStyle !== undefined
          ? `${conditionStyle} cursor-pointer hover:scale-105 duration-500 p-2
    rounded-3xl flex justify-center items-center w-1/5`
          : customStyle
            ? style
            : `${style} hover:scale-105 duration-500 p-2 cursor-pointer bg-orange-500 hover:bg-orange-600 rounded-3xl flex justify-center items-center w-1/5`
      }
    >
      <p
        className={
          condition === false && conditionStyleText !== undefined
            ? `${conditionStyleText}`
            : customStyle
              ? textStyle
              : `${textStyle} text-2xl font-eudoxusbold text-white`
        }
      >
        {!text ? 'Next Slide' : text}
      </p>
    </div>
  )
}

export default NextButton
