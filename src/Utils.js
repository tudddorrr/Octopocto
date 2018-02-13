import React from 'react'

export const monthName = (month) => {
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return months[month]
}

export const toEmoji = (emoji) => {
  return <span role="img" aria-label="Emoji">{emoji}</span>
}

export const getUsername = () => {
  let url = new URL(window.location.href)
  let user = url.searchParams.get("user");

  return user;
}