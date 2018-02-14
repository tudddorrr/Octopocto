import React from 'react'

export const monthName = (month) => {
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return months[month]
}

export const toEmoji = (emoji) => {
  return <span role="img" aria-label="Emoji">{emoji}</span>
}

export const getUsername = () => {
  let trimProtocol = window.location.href.split('//')[1]
  let url = trimProtocol.split('/')
  let user = url[url.length-1].split('?')[1]
  return user
}